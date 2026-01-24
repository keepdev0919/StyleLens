import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header variant="landing" />

            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <section className="relative px-6 lg:px-20 py-16 lg:py-28">
                    <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
                        <div className="flex flex-col gap-10 max-w-4xl">
                            <h1 className="hero-title text-6xl lg:text-8xl font-black leading-tight text-black">
                                Discover Your Perfect Look with <span className="text-primary italic">StyleLens</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                                AI-powered fashion and grooming analysis tailored to your unique body and style.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                                <Link to="/input">
                                    <button className="bg-primary hover:opacity-90 text-white text-xl font-bold px-14 py-5 rounded-full transition-all shadow-xl shadow-primary/30">
                                        Start Your Style Journey
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="mt-20 w-full max-w-5xl">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl"></div>
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[2rem] bg-gray-100 border border-black/5">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA20KLVTgqU8RwMtomH8bqEYnnngeBGDA0p22HE7NYI3l1mkP21FA5YviC7iecmNokwiRLSupGYGvoI2TKsmnZO03sa1aJrumxzXRBWnezvavamgRqKItf7oGiwumjBnzCy8guRcerwSvfYcCmWz62AJqdZBqz1_Pyq8UIygUO2TPYJHj5dpGAcNZ282uT0r6mAlOcwElBi0Sk-4G6acNbnM6Mr9bCpY3wJ_CioTRWJkV2Hf1i3fxQ-_F4X50-Nld_JIV_Vl0H5zBb')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl glass-nav border border-black/5 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-gray-500">StyleLens Analysis</span>
                                            <span className="font-bold text-lg">Sophisticated Urban Elite</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 rounded-full border-2 border-white bg-primary flex items-center justify-center text-xs font-bold text-white shadow-lg">98%</div>
                                            <div className="w-12 h-12 rounded-full border-2 border-white bg-black flex items-center justify-center text-xs font-bold text-white shadow-lg">A+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* How It Works Section */}
                <section className="px-6 lg:px-20 py-32" id="how-it-works">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="flex flex-col gap-6 mb-20 text-center">
                            <h2 className="hero-title text-4xl lg:text-5xl font-bold">The StyleLens Method</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Three simple steps to redefine your look with state-of-the-art artificial intelligence.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="group relative p-10 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 transition-all duration-500">
                                <div className="absolute top-6 right-10 text-7xl font-black text-black/5 group-hover:text-primary/10 transition-colors">01</div>
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-8 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl">upload_file</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Upload Photos</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">Securely upload your photos and share your style goals with our intelligent assistant.</p>
                            </div>
                            <div className="group relative p-10 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 transition-all duration-500">
                                <div className="absolute top-6 right-10 text-7xl font-black text-black/5 group-hover:text-primary/10 transition-colors">02</div>
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-8 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl">psychology</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Neural Analysis</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">Our engine analyzes your features, color palette, and proportions against current fashion metrics.</p>
                            </div>
                            <div className="group relative p-10 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 transition-all duration-500">
                                <div className="absolute top-6 right-10 text-7xl font-black text-black/5 group-hover:text-primary/10 transition-colors">03</div>
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-8 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl">checkroom</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Curated Recommendations</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">Receive a personalized digital style book and grooming guide built specifically for you.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 lg:px-20 py-32 text-center relative overflow-hidden bg-gray-50">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="max-w-4xl mx-auto relative z-10">
                        <h2 className="hero-title text-5xl lg:text-7xl font-bold mb-10">Ready to Elevate <br />Your Aesthetic?</h2>
                        <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                            Discover your unique style with AI-powered fashion analysis tailored just for you.
                        </p>
                        <Link to="/input">
                            <button className="bg-primary hover:opacity-90 text-white text-xl font-bold px-16 py-6 rounded-full transition-all shadow-2xl shadow-primary/40">
                                Start Your Style Journey
                            </button>
                        </Link>
                        <p className="mt-8 text-sm font-bold text-gray-400 tracking-wide uppercase">Unlock your potential today.</p>
                    </div>
                </section>
            </main>

            <Footer variant="landing" />
        </div>
    );
}
