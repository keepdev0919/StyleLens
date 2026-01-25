import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header variant="landing" />

            <main className="flex-grow pt-24">
                {/* Hero Section */}
                {/* Hero Section - Option 1: Split Layout */}
                <section className="relative px-6 lg:px-20 py-12 lg:py-20 overflow-hidden">
                    <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left Content (Text) - Span 7 */}
                        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left z-10">
                            <h1 className="hero-title text-5xl lg:text-7xl font-black leading-[1.1] text-black tracking-tight">
                                Discover Your <br className="hidden lg:block" />
                                Perfect Look with <br className="hidden lg:block" />
                                <span className="text-primary italic relative inline-block">
                                    StyleLens
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                                AI-powered fashion and grooming analysis tailored to your unique body and style.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                                <Link to="/input">
                                    <button className="bg-primary hover:opacity-90 text-white text-lg font-bold px-10 py-4 rounded-full transition-all shadow-xl shadow-primary/30 flex items-center gap-2 mx-auto lg:mx-0">
                                        Start Your Style Journey
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 opacity-80">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                                    ))}
                                </div>
                                <div className="text-sm font-semibold text-gray-500">
                                    Join our Styling Community
                                </div>
                            </div>
                        </div>

                        {/* Right Content (Vertical Image) - Span 5 */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 border-[8px] border-white rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                                <img
                                    src="/hero_unsp.jpg"
                                    alt="Fashion Model"
                                    className="w-full h-auto object-cover aspect-[3/4]"
                                />

                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-nav border border-white/40 backdrop-blur-md shadow-lg flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">A+</div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Match Score</div>
                                        <div className="font-bold text-sm text-slate-800">Sophisticated Chic</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30 mix-blend-multiply"></div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section (Infinite Marquee) */}
                <section className="py-24 bg-white border-y border-black/5 overflow-hidden" id="testimonials">
                    <div className="text-center mb-16 px-6">
                        <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4">Success Stories</p>
                        <h2 className="hero-title text-4xl font-bold">User Transformations</h2>
                    </div>

                    <div className="relative w-full">
                        {/* Gradient Masks for smooth fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                        <div className="flex animate-marquee gap-8 px-8 w-max hover:pause">
                            {[
                                { name: "Sarah J.", style: "Modern Minimalist", text: "StyleLens completely redefined how I see my wardrobe. The AI analysis was scary accurate!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200" },
                                { name: "Elena M.", style: "Romantic Chic", text: "I finally found my signature style. The curated recommendations felt like I had a professional stylist.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200" },
                                { name: "Chloe W.", style: "Urban Edge", text: "The grooming guide alone is worth it. It suggested a haircut I never would have tried!", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=200&h=200" },
                                { name: "Michael R.", style: "Dandy Classic", text: "Perfect for optimizing my business casual look. Saved me hours of shopping time.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200" },
                                { name: "Jessica L.", style: "Soft Natural", text: "I love how it respects my messy hair preference but makes it look intentional.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=200&h=200" },
                                { name: "David K.", style: "Street Tech", text: "The color analysis was a game changer. I stopped buying clothes that wash me out.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=200&h=200" },
                                // Duplicate for Loop
                                { name: "Sarah J.", style: "Modern Minimalist", text: "StyleLens completely redefined how I see my wardrobe. The AI analysis was scary accurate!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200" },
                                { name: "Elena M.", style: "Romantic Chic", text: "I finally found my signature style. The curated recommendations felt like I had a professional stylist.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200" },
                                { name: "Chloe W.", style: "Urban Edge", text: "The grooming guide alone is worth it. It suggested a haircut I never would have tried!", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=200&h=200" },
                                { name: "Michael R.", style: "Dandy Classic", text: "Perfect for optimizing my business casual look. Saved me hours of shopping time.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200" },
                                { name: "Jessica L.", style: "Soft Natural", text: "I love how it respects my messy hair preference but makes it look intentional.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=200&h=200" },
                                { name: "David K.", style: "Street Tech", text: "The color analysis was a game changer. I stopped buying clothes that wash me out.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=200&h=200" },
                            ].map((user, idx) => (
                                <div key={idx} className="flex flex-col gap-6 p-8 rounded-3xl bg-gray-50 border border-black/5 min-w-[320px] max-w-[320px]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                                            <img alt={user.name} className="w-full h-full object-cover" src={user.img} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-tight">{user.name}</h4>
                                            <p className="text-sm text-gray-500">{user.style}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic leading-relaxed line-clamp-4">"{user.text}"</p>
                                </div>
                            ))}
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
                <section className="px-6 lg:px-20 py-32 text-center relative overflow-hidden bg-gray-50" id="start">
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
