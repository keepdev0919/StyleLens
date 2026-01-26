import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function InputPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        photo: null as File | null,
        gender: 'woman' as 'man' | 'woman' | 'other',
        customGender: '',
        height: '',
        weight: '',
    });
    const [photoPreview, setPhotoPreview] = useState<string>('');

    const [searchParams] = useSearchParams();
    const hasEffectRun = useRef(false);

    const [isLoading] = useState(false);

    // Restore state and trigger analysis if returning from successful payment
    useEffect(() => {
        if (hasEffectRun.current) return;

        const paymentStatus = searchParams.get('payment');
        if (paymentStatus === 'success') {
            hasEffectRun.current = true;
            const savedData = sessionStorage.getItem('pending_style_analysis');
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    setFormData(parsed.formData);
                    setPhotoPreview(parsed.photoPreview);

                    // Trigger analysis with restored data
                    // We need to use the parsed data directly because state updates are async
                    performAnalysisWithData(parsed.formData, parsed.photoPreview);

                    // Optional: Clear storage after success (or keep it briefly if retrying needed)
                    sessionStorage.removeItem('pending_style_analysis');
                } catch (e) {
                    console.error("Failed to restore session data", e);
                }
            }
        }
    }, [searchParams]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate basic type availability or just try to convert everything
            // Note: iOS/Mac HEIC might be 'image/heic' or ''

            setFormData({ ...formData, photo: file });

            // Use Canvas to normalize to JPEG
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Limit max dimension to avoid huge payloads (OpenAI has limits/costs)
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
                    // Force JPEG format
                    const jpegBase64 = canvas.toDataURL('image/jpeg', 0.8);
                    setPhotoPreview(jpegBase64);
                }
                URL.revokeObjectURL(url);
            };

            img.onerror = () => {
                // Fallback to basic file reader if image loading fails (though unlikely for valid images)
                // This might happen if browser doesn't support the format (e.g. old Chrome with HEIC)
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

    const performAnalysisWithData = async (data: typeof formData, preview: string) => {
        // Navigate immediately to ResultPage to let it handle the analysis
        // This ensures the user sees the "Designing Your Cover" loading screen
        navigate('/result', {
            state: {
                userData: data,
                userImage: preview, // Pass base64 image
                height: data.height,
                weight: data.weight,
                gender: data.gender === 'other' ? data.customGender : data.gender
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!photoPreview) {
            alert("Please upload a photo first.");
            return;
        }

        // Save form data for after payment redirect
        sessionStorage.setItem('pending_style_analysis', JSON.stringify({
            formData,
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
                // Redirect to Polar checkout
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to start checkout. Please try again.');
            sessionStorage.removeItem('pending_style_analysis');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
            <Header variant="landing" />

            {isLoading && (
                <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Style</h3>
                    <p className="text-slate-500 font-medium animate-pulse">Consulting our AI stylists...</p>
                </div>
            )}

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-[800px] mx-auto px-6">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="hero-title text-5xl lg:text-6xl font-bold mb-6 text-black">
                            Tell Us About <span className="text-primary italic">Yourself</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                            Share your photo and measurements to receive personalized style recommendations.
                        </p>
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="section-card rounded-2xl p-8 lg:p-12">
                        {/* Photo Upload */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                Your Photo
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
                                        <span className="text-sm font-semibold text-gray-600">Click to upload photo</span>
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
                                Upload a clear, front-facing photo for best results
                            </p>
                        </div>

                        {/* Gender Selection */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                Gender / Identity
                            </label>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {[
                                    { id: 'woman', label: 'Female' },
                                    { id: 'man', label: 'Male' },
                                    { id: 'other', label: 'Other' }
                                ].map((opt) => (
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
                                        placeholder="How would you like to be described? (e.g. Non-binary, Masculine woman)"
                                        className="w-full px-6 py-4 rounded-xl border-2 border-primary focus:outline-none text-base font-medium transition-all"
                                        required={formData.gender === 'other'}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Height Input */}
                        <div className="mb-8">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                placeholder="e.g., 175"
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all"
                                required
                                min="100"
                                max="250"
                            />
                        </div>

                        {/* Weight Input */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-slate-900 mb-4">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="e.g., 70"
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg font-medium transition-all"
                                required
                                min="30"
                                max="200"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl font-bold px-12 py-5 rounded-full transition-all shadow-xl shadow-primary/30"
                        >
                            {isLoading ? 'Processing...' : 'Analyze My Style'}
                        </button>
                    </form>
                </div>
            </main>

            <Footer variant="landing" />
        </div>
    );
}
