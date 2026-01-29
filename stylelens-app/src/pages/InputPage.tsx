import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UnitToggle from '../components/UnitToggle';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';
import { cmToFtIn, ftInToCm, kgToLbs, lbsToKg } from '../utils/unitConversion';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function InputPage() {
    const navigate = useNavigate();
    const { language, unitSystem } = useSettings();
    useDocumentMeta('input');

    const [formData, setFormData] = useState({
        photo: null as File | null,
        gender: 'woman' as 'man' | 'woman' | 'other',
        customGender: '',
        heightCm: '',
        weightKg: '',
        heightFt: '',
        heightIn: '',
        weightLbs: '',
    });
    const [photoPreview, setPhotoPreview] = useState<string>('');

    const [searchParams] = useSearchParams();
    const hasEffectRun = useRef(false);
    const prevUnitSystem = useRef(unitSystem);

    const [isLoading] = useState(false);
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

    // Convert values when unit system toggles
    useEffect(() => {
        if (prevUnitSystem.current === unitSystem) return;
        prevUnitSystem.current = unitSystem;

        setFormData(prev => {
            if (unitSystem === 'imperial') {
                // Metric -> Imperial
                const cm = Number(prev.heightCm);
                const kg = Number(prev.weightKg);
                const converted = cm ? cmToFtIn(cm) : null;
                const lbs = kg ? kgToLbs(kg) : '';
                return {
                    ...prev,
                    heightFt: converted ? String(converted.ft) : '',
                    heightIn: converted ? String(converted.in) : '',
                    weightLbs: lbs !== '' ? String(lbs) : '',
                };
            } else {
                // Imperial -> Metric
                const ft = Number(prev.heightFt);
                const inches = Number(prev.heightIn);
                const lbs = Number(prev.weightLbs);
                const cm = (ft || inches) ? ftInToCm(ft || 0, inches || 0) : '';
                const kg = lbs ? lbsToKg(lbs) : '';
                return {
                    ...prev,
                    heightCm: cm !== '' ? String(cm) : '',
                    weightKg: kg !== '' ? String(kg) : '',
                };
            }
        });
    }, [unitSystem]);

    // Restore state and trigger analysis if returning from successful payment
    useEffect(() => {
        if (hasEffectRun.current) return;

        const paymentStatus = searchParams.get('payment');
        let sessionId = searchParams.get('session_id');

        console.log('[Payment Flow] URL params:', { paymentStatus, sessionId });
        console.log('[Payment Flow] sessionStorage checkout_session_id:', sessionStorage.getItem('checkout_session_id'));
        console.log('[Payment Flow] sessionStorage pending_style_analysis exists:', !!sessionStorage.getItem('pending_style_analysis'));

        // Fallback: if session_id not in URL, try sessionStorage
        if (!sessionId && paymentStatus === 'success') {
            sessionId = sessionStorage.getItem('checkout_session_id');
            console.log('[Payment Flow] Using fallback sessionId from sessionStorage:', sessionId);
        }

        if (paymentStatus === 'success' && sessionId) {
            hasEffectRun.current = true;
            sessionStorage.removeItem('checkout_session_id'); // Clean up
            verifyPaymentAndStartAnalysis(sessionId);
        }
    }, [searchParams]);

    const verifyPaymentAndStartAnalysis = async (sessionId: string) => {
        setIsVerifyingPayment(true);

        try {
            // Verify payment with backend
            console.log('[Payment Flow] Verifying payment with session_id:', sessionId);
            const verifyRes = await fetch(`/api/verify-payment?session_id=${sessionId}`);
            const verifyData = await verifyRes.json();
            console.log('[Payment Flow] Verify response:', verifyData);

            if (!verifyData.verified) {
                console.error('[Payment Flow] Verification failed:', verifyData);
                alert(t(language, 'alert.paymentFailed'));
                setIsVerifyingPayment(false);
                return;
            }

            // Get stored form data
            const savedData = sessionStorage.getItem('pending_style_analysis');
            console.log('[Payment Flow] pending_style_analysis exists:', !!savedData);
            if (!savedData) {
                console.error('[Payment Flow] No saved data in sessionStorage');
                alert(t(language, 'alert.sessionExpired'));
                setIsVerifyingPayment(false);
                return;
            }

            const parsed = JSON.parse(savedData);

            // Navigate to ResultPage with order ID and customer email
            navigate('/result', {
                state: {
                    userImage: parsed.photoPreview,
                    height: parsed.height,
                    weight: parsed.weight,
                    gender: parsed.formData.gender,
                    orderId: verifyData.orderId,
                    customerEmail: verifyData.customerEmail
                }
            });

            // Clean up
            sessionStorage.removeItem('pending_style_analysis');

        } catch (error) {
            console.error('Payment verification error:', error);
            alert(t(language, 'alert.paymentFailed'));
            setIsVerifyingPayment(false);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, photo: file });

            // Use Canvas to normalize to JPEG
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_DIM = 1024;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_DIM) {
                        height = height * (MAX_DIM / width);
                        width = MAX_DIM;
                    }
                } else {
                    if (height > MAX_DIM) {
                        width = width * (MAX_DIM / height);
                        height = MAX_DIM;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const jpegBase64 = canvas.toDataURL('image/jpeg', 0.8);
                    setPhotoPreview(jpegBase64);
                }
                URL.revokeObjectURL(url);
            };

            img.onerror = () => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
                URL.revokeObjectURL(url);
            };

            img.src = url;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!photoPreview) {
            alert(t(language, 'alert.photoRequired'));
            return;
        }

        // Always convert to metric for API
        const heightCm = unitSystem === 'imperial'
            ? String(ftInToCm(Number(formData.heightFt) || 0, Number(formData.heightIn) || 0))
            : formData.heightCm;
        const weightKg = unitSystem === 'imperial'
            ? String(lbsToKg(Number(formData.weightLbs)))
            : formData.weightKg;

        // Save form data for after payment redirect (always metric)
        sessionStorage.setItem('pending_style_analysis', JSON.stringify({
            formData: {
                gender: formData.gender,
                customGender: formData.customGender,
            },
            height: heightCm,
            weight: weightKg,
            photoPreview
        }));

        try {
            // Create Polar checkout session
            const res = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    successUrl: `${window.location.origin}/input?payment=success`
                })
            });

            const data = await res.json();

            if (data.url) {
                if (data.id) {
                    sessionStorage.setItem('checkout_session_id', data.id);
                }
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert(t(language, 'alert.checkoutFailed'));
            sessionStorage.removeItem('pending_style_analysis');
        }
    };

    // Show loading state during payment verification
    if (isVerifyingPayment) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-serif text-center px-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold italic mb-2">{t(language, 'input.verifying.title')}</h2>
                <p className="text-zinc-500 text-sm font-sans tracking-widest uppercase mb-8">{t(language, 'input.verifying.subtitle')}</p>
            </div>
        );
    }

    const genderOptions = [
        { id: 'woman', label: t(language, 'input.gender.female') },
        { id: 'man', label: t(language, 'input.gender.male') },
        { id: 'other', label: t(language, 'input.gender.other') }
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
            <Header variant="landing" />

            {isLoading && (
                <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t(language, 'input.loading.title')}</h3>
                    <p className="text-slate-500 font-medium animate-pulse">{t(language, 'input.loading.subtitle')}</p>
                </div>
            )}

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-[800px] mx-auto px-6">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="hero-title text-5xl lg:text-6xl font-bold mb-6 text-black">
                            {t(language, 'input.title1')} <span className="text-primary italic">{t(language, 'input.title2')}</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                            {t(language, 'input.subtitle')}
                        </p>
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="section-card rounded-2xl p-8 lg:p-12">
                        {/* Photo Upload */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                {t(language, 'input.photo.label')}
                            </label>
                            <div className="flex flex-col items-center">
                                {photoPreview ? (
                                    <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-primary/20 mb-4">
                                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, photo: null });
                                                setPhotoPreview('');
                                            }}
                                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-64 h-64 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-accent-pink/30">
                                        <span className="material-symbols-outlined text-6xl text-gray-400">upload_file</span>
                                        <span className="text-sm font-semibold text-gray-600">{t(language, 'input.photo.upload')}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 text-center mt-4">
                                {t(language, 'input.photo.hint')}
                            </p>
                        </div>

                        {/* Gender Selection */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                {t(language, 'input.gender.label')}
                            </label>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {genderOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: opt.id as any })}
                                        className={`py-4 rounded-xl font-bold transition-all border-2 ${formData.gender === opt.id
                                            ? 'border-primary bg-accent-pink/20 text-primary shadow-lg shadow-primary/10'
                                            : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {formData.gender === 'other' && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <input
                                        type="text"
                                        value={formData.customGender}
                                        onChange={(e) => setFormData({ ...formData, customGender: e.target.value })}
                                        placeholder={t(language, 'input.gender.placeholder')}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-primary focus:outline-none text-base font-medium transition-all"
                                        required={formData.gender === 'other'}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Unit Toggle */}
                        <UnitToggle />

                        {/* Height Input */}
                        <div className="mb-8">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                {t(language, 'input.height.label')} ({unitSystem === 'metric' ? t(language, 'input.height.cm') : `${t(language, 'input.height.ft')} / ${t(language, 'input.height.in')}`})
                            </label>
                            {unitSystem === 'metric' ? (
                                <input
                                    type="number"
                                    value={formData.heightCm}
                                    onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                                    placeholder={t(language, 'input.height.placeholder.cm')}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all"
                                    required
                                    min="100"
                                    max="250"
                                />
                            ) : (
                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="number"
                                            value={formData.heightFt}
                                            onChange={(e) => setFormData({ ...formData, heightFt: e.target.value })}
                                            placeholder={t(language, 'input.height.placeholder.ft')}
                                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all pr-12"
                                            required
                                            min="3"
                                            max="8"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">ft</span>
                                    </div>
                                    <div className="flex-1 relative">
                                        <input
                                            type="number"
                                            value={formData.heightIn}
                                            onChange={(e) => setFormData({ ...formData, heightIn: e.target.value })}
                                            placeholder={t(language, 'input.height.placeholder.in')}
                                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all pr-12"
                                            required
                                            min="0"
                                            max="11"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">in</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Weight Input */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                {t(language, 'input.weight.label')} ({unitSystem === 'metric' ? t(language, 'input.weight.kg') : t(language, 'input.weight.lbs')})
                            </label>
                            {unitSystem === 'metric' ? (
                                <input
                                    type="number"
                                    value={formData.weightKg}
                                    onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                                    placeholder={t(language, 'input.weight.placeholder.kg')}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all"
                                    required
                                    min="30"
                                    max="200"
                                />
                            ) : (
                                <input
                                    type="number"
                                    value={formData.weightLbs}
                                    onChange={(e) => setFormData({ ...formData, weightLbs: e.target.value })}
                                    placeholder={t(language, 'input.weight.placeholder.lbs')}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all"
                                    required
                                    min="66"
                                    max="440"
                                />
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl font-bold px-12 py-5 rounded-full transition-all shadow-xl shadow-primary/30"
                        >
                            {isLoading ? t(language, 'input.processing') : t(language, 'input.submit')}
                        </button>
                    </form>
                </div>
            </main>

            <Footer variant="landing" />
        </div>
    );
}
