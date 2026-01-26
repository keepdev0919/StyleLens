import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

// Intefaces
interface ShoppingItem {
    name: string;
    description: string;
    category: string;
    price: string;
    query?: string; // Explicit search query
    imageUrl?: string;
}

// Shopping Item Card (Grid Style)
const ShoppingItemCard = ({ item }: { item: ShoppingItem }) => {
    const [fetchedImage, setFetchedImage] = useState<string | null>(item.imageUrl || null);
    const [loading, setLoading] = useState(!item.imageUrl);

    useEffect(() => {
        if (fetchedImage) return;

        const fetchImage = async () => {
            try {
                const query = item.query || item.name;
                const res = await fetch(`/api/search-products?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                if (data.products && data.products.length > 0) {
                    setFetchedImage(data.products[0].thumbnailUrl || data.products[0].imageUrl);
                } else {
                    setFetchedImage("https://placehold.co/400x400/png?text=No+Image");
                }
            } catch (err) {
                console.error("Failed to fetch image", err);
                setFetchedImage("https://placehold.co/400x400/png?text=Error");
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [item.name, item.query, fetchedImage]);

    return (
        <div className="bg-white p-6 rounded-2xl magazine-shadow group cursor-pointer border border-transparent hover:border-pink-200 transition-all">
            <div className="aspect-square bg-slate-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                {loading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-[10px] text-slate-400">Locating Item...</span>
                    </div>
                ) : (
                    <img
                        src={fetchedImage || ""}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    />
                )}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{item.category}</p>
            <h4 className="font-bold text-lg mb-2 font-serif">{item.name}</h4>
            <p className="text-xs text-zinc-400 mb-4">{item.description}</p>
            {/* Price and Cart removed as per user request */}
        </div>
    );
};

export default function ResultPage() {
    const location = useLocation();
    const { userImage, height, weight } = location.state || {};
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                // If no user data, fallback or error. 
                // For dev purposes, we allow loading even without state if likely testing, 
                // but usually this needs input. We will try to fetch if we have 'userImage' OR just proceed to handle empty gracefully.

                const payload = {
                    photo: userImage || "https://placehold.co/600x800", // Dev fallback
                    height: height || "170",
                    weight: weight || "60"
                };

                const res = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Analysis failed: ${res.status} ${errorText}`);
                }

                const data = await res.json();
                setAnalysis(data);
            } catch (err: any) {
                console.error("Analysis Fetch Error:", err);
                setError(err.message || "Failed to analyze style. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [userImage, height, weight]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-serif text-center px-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold italic mb-2">Designing Your Cover...</h2>
                <p className="text-zinc-500 text-sm font-sans tracking-widest uppercase mb-8">Analyzing Proportions & Vibe</p>
                <div className="text-xs text-zinc-400 max-w-md">
                    Creating personalized lookbooks may take up to 30 seconds.<br />
                    Please do not close this window.
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10 bg-slate-50">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg">
                    <span className="material-symbols-outlined text-red-500 text-4xl mb-4 block">error_outline</span>
                    <h2 className="text-xl font-bold text-zinc-800 mb-2">Analysis Error</h2>
                    <p className="text-zinc-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-zinc-800 transition-all"
                    >
                        Retry Analysis
                    </button>
                    <div className="mt-4">
                        <a href="/input" className="text-xs text-zinc-400 underline hover:text-primary">Return to Input Page</a>
                    </div>
                </div>
            </div>
        );
    }

    if (!analysis) return null;

    // Data Mapping for UI
    const { vibe_title, vibe_description, attributes, body_analysis, palette, grooming, lookbook, shopping_keywords } = analysis;

    return (
        <div className="bg-white min-h-screen font-display text-magazine-black selection:bg-accent-pink selection:text-primary">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-pink-50">
                <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold tracking-tighter uppercase font-serif italic">Style<span className="text-primary">Lens</span></h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#">Identity</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#">Lookbook</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#">Shopping</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#">Consultant</a>
                    </nav>
                    <button className="px-6 py-2 border border-zinc-200 rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                        Share Report
                    </button>
                </div>
            </header>

            <main className="max-w-[1280px] mx-auto px-8 py-12">
                {/* HERO SECTION */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="inline-block px-4 py-1.5 badge-gradient text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Top 3% Rare Identity</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold font-serif mb-8 leading-tight">
                            Your Vibe:<br />
                            <span className="text-primary italic">{vibe_title || "Unknown Vibe"}</span>
                        </h1>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-xl mb-10">
                            {vibe_description || "Preparing your detailed style profile..."}
                        </p>
                        <div className="flex gap-16 border-t border-pink-100 pt-8">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Primary Base</span>
                                <span className="text-xl font-serif font-bold">{attributes?.base || "-"}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Energy</span>
                                <span className="text-xl font-serif font-bold">{attributes?.energy || "-"}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Season</span>
                                <span className="text-xl font-serif font-bold">{attributes?.season || "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image (User Uploaded) */}
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden magazine-shadow">
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-1000"
                                style={{
                                    backgroundImage: `url("${userImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}")`
                                }}
                            ></div>
                        </div>
                    </div>
                </section>

                {/* ANALYSIS GRID */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {/* Card 1: Body Type */}
                    <div className="p-8 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent-pink rounded-xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined">hourglass_empty</span>
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Body Type</h3>
                        <p className="text-2xl font-bold font-serif mb-4">{body_analysis?.type || "Analyzing..."}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed border-t border-pink-50 pt-4">{body_analysis?.description || "Processing..."}</p>
                    </div>

                    {/* Card 2: Color Season */}
                    <div className="p-8 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent-pink rounded-xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined">palette</span>
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Color Season</h3>
                        <p className="text-2xl font-bold font-serif mb-4">{palette?.season || "Analyzing..."}</p>
                        <div className="flex gap-2 mt-2">
                            {(palette?.colors || []).slice(0, 3).map((c: any, i: number) => (
                                <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Best Silhouette */}
                    <div className="p-8 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent-pink rounded-xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Best Silhouette</h3>
                        <p className="text-xl font-bold font-serif mb-4">{body_analysis?.rec_silhouette || "Analyzing..."}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{body_analysis?.rec_silhouette_desc || "Processing..."}</p>
                    </div>

                    {/* Card 4: Signature Lip */}
                    <div className="p-8 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent-pink rounded-xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined">face</span>
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Signature Lip</h3>
                        <p className="text-2xl font-bold font-serif mb-4">{grooming?.makeup_lip || "Analyzing..."}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{grooming?.makeup_desc || "Processing..."}</p>
                    </div>
                </section>

                {/* LOOKBOOK SECTION */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold font-serif mb-2">Identity Lookbook</h2>
                            <p className="text-zinc-500 uppercase text-[11px] font-bold tracking-[0.3em]">AI-Generated Curated Concepts</p>
                        </div>
                        <div className="h-px flex-1 bg-pink-100 mx-12 hidden md:block mb-4"></div>
                        {/* View All Button Removed as per User Request */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {(lookbook || []).map((look: any, idx: number) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url("${look.imageUrl || 'https://placehold.co/600x800?text=Generating+Lookbook...'}")` }}
                                    ></div>
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full">Concept 0{idx + 1}</div>
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-2 italic">{look.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{look.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PREMIUM HAIR STUDIO SECTION */}
                <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <div className="aspect-square bg-white p-4 rounded-2xl magazine-shadow rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div
                                className="w-full h-full bg-cover bg-center rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                                style={{
                                    backgroundImage: `url("${analysis.hair_analysis?.imageUrl || 'https://placehold.co/1024x1024?text=Generating+Hairstyles...'}")`
                                }}
                            ></div>
                        </div>
                        <p className="text-center text-[10px] text-zinc-400 font-bold tracking-[0.3em] uppercase mt-4">AI Hair Consultant • 3x3 Grid</p>
                    </div>
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-primary"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Premium Hair Studio</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
                            The Perfect Cut<br />
                            <span className="text-zinc-300">for</span> <span className="text-black italic">{analysis.hair_analysis?.face_shape || "Your Face"}</span>
                        </h2>
                        <h3 className="text-xl font-medium text-zinc-800 mb-6 font-serif">
                            "{analysis.hair_analysis?.advice || "Analyzing your face shape..."}"
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 border border-zinc-200 rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-all cursor-pointer">#FaceFraming</span>
                            <span className="px-4 py-2 border border-zinc-200 rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-all cursor-pointer">#VolumeUp</span>
                            <span className="px-4 py-2 border border-zinc-200 rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-all cursor-pointer">#Texture</span>
                        </div>
                    </div>
                </section>

                {/* SHOPPING BOUTIQUE SECTION */}
                <section className="mb-24 bg-accent-pink/30 rounded-[2rem] p-12 md:p-20 border border-pink-100">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-serif mb-4">Must-Have Now</h2>
                        <p className="text-zinc-500 uppercase text-[11px] font-bold tracking-[0.3em]">The Boutique-Curated Essentials</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(shopping_keywords || []).map((item: any, idx: number) => (
                            <ShoppingItemCard key={idx} item={item} />
                        ))}
                    </div>
                </section>

                {/* COLOR STORY SECTION */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold font-serif mb-6">{palette?.season || "Season"}<br /><span className="text-primary italic">Color Story</span></h2>
                            <p className="text-zinc-500 leading-relaxed mb-8">
                                {palette?.description || "Analyzing your seasonal color palette..."}
                            </p>
                            <div className="space-y-4">
                                {(palette?.colors || []).slice(0, 3).map((c: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full ring-2 ring-pink-50" style={{ backgroundColor: c.hex }}></div>
                                        <div>
                                            <p className="text-sm font-bold font-serif">{c.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {(palette?.colors || []).map((c: any, idx: number) => (
                                <div key={idx} className="aspect-square rounded-2xl" style={{ backgroundColor: c.hex }} title={c.name}></div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                {/* CTA SECTION: Split Screen Visual Proof */}
                <section className="bg-zinc-900 rounded-[2rem] p-12 lg:p-20 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ff4db8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text & Action */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-5xl lg:text-7xl font-bold font-serif mb-8 leading-tight">
                                Ready to Own<br />
                                <span className="text-primary italic">Your Identity?</span>
                            </h2>
                            <button className="w-full lg:w-auto px-12 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 active:scale-95">
                                <span className="material-symbols-outlined">download</span>
                                Download Style Book
                            </button>
                        </div>

                        {/* Right: 3D Report Mockup */}
                        <div className="relative flex justify-center lg:justify-end perspective-1000">
                            {/* The Book/Magazine Mockup */}
                            <div className="relative w-64 aspect-[3/4] bg-white rounded-r-xl rounded-l-sm shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-700 ease-out cursor-pointer group">
                                {/* Spine */}
                                <div className="absolute top-0 bottom-0 left-0 w-2 bg-zinc-200 -translate-x-full origin-right transform rotate-y-[-90deg]"></div>

                                {/* Cover Image */}
                                <div className="absolute inset-0 bg-zinc-900 rounded-r-xl overflow-hidden flex flex-col">
                                    <div className="h-2/3 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url("${userImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}")` }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col justify-between border-t border-zinc-800">
                                        <div>
                                            <p className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mb-2">Style Data 2024</p>
                                            <h3 className="text-2xl font-serif font-bold leading-none">{vibe_title || "My Style"}</h3>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                                                <span className="text-[10px] font-bold">SL</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-500 font-mono">CONFIDENTIAL</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Gloss/Lighting Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-r-xl"></div>
                            </div>

                            {/* Decorative Elements behind */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-primary/20 blur-[60px] rounded-full"></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer variant="result" />
        </div>
    );
}
