import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function InputPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        photo: null as File | null,
        height: '',
        weight: '',
    });
    const [photoPreview, setPhotoPreview] = useState<string>('');

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: 여기서 Cloudflare Pages Functions API 호출
        // TODO: ChatGPT API로 분석 요청
        // TODO: 분석 결과를 받아서 결과 페이지로 전달

        // 임시로 결과 페이지로 이동 (나중에 실제 데이터 전달)
        navigate('/result', {
            state: {
                userData: formData,
                // 나중에 API 응답 데이터 추가
            }
        });
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
            <Header variant="landing" />

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
                            className="w-full bg-primary hover:opacity-90 text-white text-xl font-bold px-12 py-5 rounded-full transition-all shadow-xl shadow-primary/30"
                        >
                            Analyze My Style
                        </button>
                    </form>
                </div>
            </main>

            <Footer variant="landing" />
        </div>
    );
}
