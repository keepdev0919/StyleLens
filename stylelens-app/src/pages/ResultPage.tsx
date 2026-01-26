import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Footer from '../components/Footer';

// Intefaces
interface ShoppingItem {
    name: string;
    description: string;
    category: string;
    imageUrl?: string;
}

// Color Role Card for Color Story Section
interface PaletteColor {
    hex: string;
    name: string;
    role?: string;
    application?: string;
}

const ColorRoleCard = ({ color }: { color: PaletteColor }) => (
    <div className="p-6 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform text-center">
        <div
            className="w-16 h-16 rounded-full mx-auto mb-4 ring-2 ring-pink-50"
            style={{ backgroundColor: color.hex }}
        />
        <p className="font-serif font-bold text-lg mb-1">{color.name}</p>
        {color.role && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{color.role}</p>
        )}
        {color.application && (
            <p className="text-xs text-zinc-500">{color.application}</p>
        )}
    </div>
);

// Shopping Item Card (Typography Style - with hover tooltip)
const ShoppingItemCard = ({ item }: { item: ShoppingItem }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="bg-white p-6 rounded-2xl magazine-shadow group cursor-pointer border border-transparent hover:border-black transition-all flex flex-col justify-between h-full min-h-[380px] relative overflow-hidden">
            {/* Top: Category & Name */}
            <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1 group-hover:text-primary transition-colors">
                    {item.category}
                </p>
                <h4 className="text-xl font-bold font-serif text-slate-900 leading-tight">
                    {item.name}
                </h4>
            </div>

            {/* Middle: Image */}
            <div className="flex-1 flex items-center justify-center my-4 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="text-[80px] font-serif opacity-10 text-gray-400 select-none">
                        {item.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Bottom: Description with hover tooltip */}
            <div
                className="border-t border-gray-100 pt-4 mt-2 relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 cursor-help">
                    {item.description}
                </p>

                {/* Tooltip - shows full description on hover */}
                {showTooltip && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-zinc-900 text-white text-xs leading-relaxed rounded-xl shadow-xl z-50 animate-fade-in">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-zinc-900"></div>
                        {item.description}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function ResultPage() {
    const location = useLocation();
    const { userImage, height, weight, gender } = location.state || {};
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const fetchCalled = useRef(false);

    const mainRef = useRef<HTMLElement>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    // PDF Download handler
    const handleDownloadPDF = async () => {
        if (!mainRef.current || isGeneratingPdf) return;

        setIsGeneratingPdf(true);
        setToastMessage('Generating PDF...');
        setShowToast(true);

        try {
            const element = mainRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = pdfWidth / imgWidth;
            const imgScaledHeight = imgHeight * ratio;

            // Calculate pages needed
            const pageHeight = pdfHeight;
            const totalPages = Math.ceil(imgScaledHeight / pageHeight);

            for (let page = 0; page < totalPages; page++) {
                if (page > 0) pdf.addPage();

                const srcY = page * (imgHeight / totalPages);
                const srcHeight = imgHeight / totalPages;

                // Create a temporary canvas for this page section
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgWidth;
                pageCanvas.height = srcHeight;
                const ctx = pageCanvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(canvas, 0, srcY, imgWidth, srcHeight, 0, 0, imgWidth, srcHeight);
                    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
                    pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                }
            }

            pdf.save(`StyleLens-Report-${new Date().toISOString().split('T')[0]}.pdf`);
            setToastMessage('PDF downloaded successfully!');
        } catch (err) {
            console.error('PDF generation error:', err);
            setToastMessage('Failed to generate PDF');
        } finally {
            setIsGeneratingPdf(false);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    // Share Report handler
    const handleShare = async () => {
        const shareData = {
            title: 'My StyleLens Report',
            text: 'Check out my personalized style analysis!',
            url: window.location.href
        };

        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setToastMessage('Link copied to clipboard!');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (err) {
            // User cancelled or error - fallback to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                setToastMessage('Link copied to clipboard!');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } catch {
                setToastMessage('Failed to copy link');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        }
    };

    useEffect(() => {
        if (fetchCalled.current) return;
        fetchCalled.current = true;

        const fetchAnalysis = async () => {
            try {
                // If no user data, fallback or error. 
                // For dev purposes, we allow loading even without state if likely testing, 
                // but usually this needs input. We will try to fetch if we have 'userImage' OR just proceed to handle empty gracefully.

                const payload = {
                    photo: userImage || "https://placehold.co/600x800", // Dev fallback
                    height: height || "170",
                    weight: weight || "60",
                    gender: gender || "woman"
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
    const { hero_section, analysis_grid, lookbook_section, hair_section, shopping_section, color_story_section } = analysis;

    return (
        <div className="bg-white min-h-screen font-display text-magazine-black selection:bg-accent-pink selection:text-primary">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-pink-50">
                <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold tracking-tighter uppercase font-serif italic">Style<span className="text-primary">Lens</span></h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#identity">Identity</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#lookbook">Lookbook</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#hair">Hair</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#shopping">Shopping</a>
                        <a className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors" href="#colors">Colors</a>
                    </nav>
                    <button
                        onClick={handleShare}
                        className="px-6 py-2 border border-zinc-200 rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                    >
                        Share Report
                    </button>
                </div>
            </header>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-zinc-900 text-white rounded-full text-sm font-medium shadow-xl animate-fade-in">
                    {toastMessage}
                </div>
            )}

            <main ref={mainRef} className="max-w-[1280px] mx-auto px-8 py-12">
                {/* HERO SECTION */}
                <section id="identity" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 scroll-mt-24">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="inline-block px-4 py-1.5 badge-gradient text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Top 3% Rare Identity</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold font-serif mb-12 leading-tight">
                            Your Vibe:<br />
                            <span className="text-primary italic">{hero_section?.vibe_title || "Unknown Vibe"}</span>
                        </h1>
                        <div className="flex gap-16 border-t border-pink-100 pt-8">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Primary Base</span>
                                <span className="text-xl font-serif font-bold">{hero_section?.attributes?.base || "-"}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Energy</span>
                                <span className="text-xl font-serif font-bold">{hero_section?.attributes?.energy || "-"}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Season</span>
                                <span className="text-xl font-serif font-bold">{hero_section?.attributes?.season || "-"}</span>
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
                        <p className="text-2xl font-bold font-serif mb-4">{analysis_grid?.body_type || "Analyzing..."}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed border-t border-pink-50 pt-4">{analysis_grid?.body_description || "Processing..."}</p>
                    </div>

                    {/* Card 2: Color Season */}
                    <div className="p-8 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent-pink rounded-xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined">palette</span>
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Color Season</h3>
                        <p className="text-2xl font-bold font-serif mb-4">{analysis_grid?.personal_color_season || "Analyzing..."}</p>
                        <div className="flex gap-2 mt-2">
                            {(color_story_section?.palette_colors || []).slice(0, 3).map((c: any, i: number) => (
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
                        <p className="text-xl font-bold font-serif mb-4">{analysis_grid?.rec_silhouette || "Analyzing..."}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{analysis_grid?.rec_silhouette_desc || "Processing..."}</p>
                    </div>

                    {/* Card 4: Signature Lip */}
                    <div className="p-8 rounded-2xl bg-white border border-pink-100 magazine-shadow hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent-pink rounded-xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined">face</span>
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Signature Lip</h3>
                        <p className="text-2xl font-bold font-serif mb-4">{analysis_grid?.makeup_lip || "Analyzing..."}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{analysis_grid?.makeup_desc || "Processing..."}</p>
                    </div>
                </section>

                {/* LOOKBOOK SECTION */}
                <section id="lookbook" className="mb-24 scroll-mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold font-serif mb-2">Identity Lookbook</h2>
                            <p className="text-zinc-500 uppercase text-[11px] font-bold tracking-[0.3em]">AI-Generated Curated Concepts</p>
                        </div>
                        <div className="h-px flex-1 bg-pink-100 mx-12 hidden md:block mb-4"></div>
                        {/* View All Button Removed as per User Request */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {(lookbook_section || []).map((look: any, idx: number) => (
                            <div key={idx} className="relative group border-l border-zinc-100 pl-10 py-6 hover:border-primary transition-colors duration-500">
                                {/* Concept Label */}
                                <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-6 block">Concept 0{idx + 1}</span>

                                <h3 className="text-3xl font-bold font-serif mb-6 leading-tight transition-all">
                                    {look.title}
                                </h3>

                                <p className="text-base text-zinc-600 leading-relaxed mb-12 font-serif">
                                    {look.description}
                                </p>

                                {/* Substantially Larger Mood Image */}
                                <div className="relative">
                                    <div className="aspect-square w-full max-w-[200px] md:max-w-none rounded-[2.5rem] overflow-hidden magazine-shadow-sm border border-white">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url("${look.imageUrl || 'https://placehold.co/600x600?text=Mood'}")` }}
                                        ></div>
                                    </div>
                                    {/* Vertical Tag */}
                                    <div className="absolute top-8 -right-4 bg-zinc-900 text-white text-[8px] font-bold uppercase tracking-[0.3em] py-1.5 px-4 rotate-90 rounded-sm shadow-xl">Vibe Story</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PREMIUM HAIR STUDIO SECTION */}
                <section id="hair" className="mb-32 scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                        {/* Left: AI Generation Grid */}
                        <div className="lg:col-span-6 order-2 lg:order-1">
                            <div className="aspect-square bg-white p-4 rounded-3xl magazine-shadow hover:scale-[1.02] transition-transform duration-500">
                                <div
                                    className="w-full h-full bg-cover bg-center rounded-2xl shadow-inner"
                                    style={{
                                        backgroundImage: `url("${hair_section?.imageUrl || 'https://placehold.co/1024x1024?text=Generating+Hairstyles...'}")`
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Right: Expert Analysis & Advice */}
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <div className="inline-block px-4 py-1.5 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">Premium Analysis</div>
                            <h2 className="text-5xl md:text-6xl font-bold font-serif mb-8 leading-tight">
                                Visualizing Your<br />
                                <span className="text-primary italic">Perfect Cut</span>
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">Face Shape Detection</h3>
                                    <p className="text-2xl font-serif font-bold italic text-black">{hair_section?.face_shape || "Analyzing..."}</p>
                                </div>

                                <div className="p-8 bg-pink-50/50 rounded-2xl border border-pink-100">
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-4">Master Stylist's Advice</h3>
                                    <p className="text-lg text-zinc-800 leading-relaxed font-serif">
                                        "{hair_section?.advice || "Preparing your personalized hair journey..."}"
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-10">
                                {(hair_section?.tags || ['FaceFraming', 'StyleBalance', 'VisualVolume']).map((tag: string, idx: number) => (
                                    <span key={idx} className="px-5 py-2.5 bg-white border border-pink-100 rounded-full text-xs font-bold uppercase text-primary magazine-shadow">
                                        #{tag.replace(/^#/, '')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SHOPPING BOUTIQUE SECTION */}
                <section id="shopping" className="mb-24 bg-accent-pink/30 rounded-[2rem] p-12 md:p-20 border border-pink-100 scroll-mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-serif mb-4">Must-Have Now</h2>
                        <p className="text-zinc-500 uppercase text-[11px] font-bold tracking-[0.3em]">The Boutique-Curated Essentials</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(shopping_section || []).map((item: any, idx: number) => (
                            <ShoppingItemCard key={idx} item={item} />
                        ))}
                    </div>
                </section>

                {/* COLOR STORY SECTION */}
                <section id="colors" className="mb-24 scroll-mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold font-serif mb-4">
                            {hero_section?.attributes?.season || "Your"} <span className="text-primary italic">Color Story</span>
                        </h2>
                        <p className="text-zinc-500 leading-relaxed max-w-2xl mx-auto">
                            {color_story_section?.vibe_description}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {(color_story_section?.palette_colors || []).map((c: PaletteColor, idx: number) => (
                            <ColorRoleCard key={idx} color={c} />
                        ))}
                    </div>
                </section>

                {/* CTA SECTION */}
                {/* CTA SECTION: Split Screen Visual Proof */}
                <section className="bg-zinc-900 rounded-[2rem] p-12 lg:p-20 text-white relative overflow-hidden">
                    {/* Animation Keyframes */}
                    <style>{`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotateY(-12deg) rotateX(5deg); }
                            50% { transform: translateY(-10px) rotateY(-12deg) rotateX(5deg); }
                        }
                        @keyframes shimmer {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        .animate-float { animation: float 3s ease-in-out infinite; }
                        .animate-shimmer { animation: shimmer 2s infinite; }
                    `}</style>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ff4db8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text & Action */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-5xl lg:text-7xl font-bold font-serif mb-8 leading-tight">
                                Ready to Own<br />
                                <span className="text-primary italic">Your Identity?</span>
                            </h2>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPdf}
                                className="w-full lg:w-auto px-12 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined">{isGeneratingPdf ? 'hourglass_empty' : 'download'}</span>
                                {isGeneratingPdf ? 'Generating...' : 'Download Style Book'}
                            </button>
                        </div>

                        {/* Right: 3D Report Mockup */}
                        <div className="relative flex justify-center lg:justify-end perspective-1000">
                            {/* The Book/Magazine Mockup */}
                            <div className="relative w-64 aspect-[3/4] bg-white rounded-r-xl rounded-l-sm shadow-[20px_20px_60px_rgba(0,0,0,0.5)] animate-float cursor-pointer group">
                                {/* Spine */}
                                <div className="absolute top-0 bottom-0 left-0 w-2 bg-zinc-200 -translate-x-full origin-right transform rotate-y-[-90deg]"></div>

                                {/* Cover Image */}
                                <div className="absolute inset-0 bg-zinc-900 rounded-r-xl overflow-hidden flex flex-col">
                                    <div className="h-2/3 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url("${userImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}")` }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col justify-between border-t border-zinc-800">
                                        <div>
                                            <p className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mb-2">Style Data 2024</p>
                                            <h3 className="text-2xl font-serif font-bold leading-none">{hero_section?.vibe_title || "My Style"}</h3>
                                        </div>
                                        <div className="flex justify-end items-end">
                                            {/* Confidential text removed */}
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
