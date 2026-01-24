import Header from '../components/Header';
import Footer from '../components/Footer';

const userImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuD4-thXrL2UP_5udNTXFiHyGPJ8XUuxqVhd9sMvhszgx3LMYv2pyoh5el7cGB_tQgOlCJ7lGbpwO4DESS2ZUCN-u9vFpGG13SizqNH2hE3B2vAth2a2CeMKguwlB9ven1XedBi34dHeZIjYc5ZZR8Wjj8eDdudOiKPHhBkyDLge5Fex2xbgKEOTD6d_RKjAiNjSIZpLijx85Bse_-GzMTuDWzQ9wAJrt4vG1gnmrVe2gdgw1Etkr3aTGDrmESheZpgVrz7cTS6w_SoQ";

export default function ResultPage() {
    return (
        <div className="bg-white text-slate-800 min-h-screen">
            <Header variant="result" userImageUrl={userImageUrl} />

            <main className="max-w-[1200px] mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-4 py-1.5 bg-accent-pink text-primary text-[11px] font-bold uppercase tracking-[0.2em] rounded-full border border-border-pink">Analysis Intelligence</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
                            Your <span className="text-primary lensa-title italic">StyleLens Report</span>
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-xl">A personalized breakdown of your unique aesthetic profile, based on high-fidelity facial geometry and body proportion analysis.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all">
                            <span className="material-symbols-outlined text-sm">ios_share</span> Share Results
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Recommended Outfits */}
                        <section className="section-card rounded-2xl overflow-hidden">
                            <div className="p-8 border-b border-pink-50 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 lensa-title">Recommended Outfits</h2>
                                    <p className="text-slate-400 text-sm mt-1">Curated looks based on your body analysis</p>
                                </div>
                                <div className="flex bg-slate-50 p-1 rounded-full border border-slate-100">
                                    <button className="px-6 py-1.5 bg-white text-primary text-xs font-bold rounded-full shadow-sm">All</button>
                                    <button className="px-6 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Office</button>
                                    <button className="px-6 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Evening</button>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0uUUVC1-OIC3hkeqRNYrTRtMEyf5VoXNaJYkSuD7SF-i5HV14-FBUj6WoZRWfy8ymKOvhZKv44_XH7VH8EWucLbd_WaUliM6TxT1wPWx5U8lKDQCHu7_J5ibm4-a8pOzeyevrR0NJJsjqedVMkyiLSs5trbTmzLCE2614c96OvUOSPyBTdRuIMtpsqV1k9cXxgE7G4mxJLPGJTVQ280Dw5m7WbXI-CN_Q3UNUJJCXK53RCYNd10atMFvXBo26PrjaIfO0BwQ7Qx2W")' }}></div>
                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase rounded-full text-white border border-white/30">Business Edge</span>
                                            </div>
                                            <h3 className="text-white text-2xl font-bold mb-2">Modern Executive</h3>
                                            <p className="text-white/80 text-sm leading-relaxed">Structural tailoring emphasizing your posture and shoulders.</p>
                                        </div>
                                    </div>
                                    <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyOAF-s6ww8n2Es7fFCoZphSiiMqISj79BGAONSBMrnhYi4esrtCbV5Uwre_FL8p1UFBNNUDWOa46Y2Mey-txraIK3Kzba_Iq7mnpXLH5ySQldyW5dCquivtp-8GtoEu7_rTgYZK6WYLSB4j8Y4HAetnpxWhAqs0iw83HZmt0bslnwesoBXj9wWhlwPlvNBjNlHJYE2r6w76nNlmGq1GrF2YPJHZr9uoNw88oZuy0NAMxWeNAepfWBTSVcFkTHWCU22YHQAavJ8PZT")' }}></div>
                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 bg-primary text-[10px] font-bold uppercase rounded-full text-white">Daily Pick</span>
                                            </div>
                                            <h3 className="text-white text-2xl font-bold mb-2">Urban Minimalist</h3>
                                            <p className="text-white/80 text-sm leading-relaxed">Fluid fabrics in earthy tones to balance your sharp jawline.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Color Palette */}
                        <section className="section-card rounded-2xl p-10">
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="md:w-1/3">
                                    <div className="inline-flex p-2 bg-accent-pink rounded-lg mb-4 text-primary">
                                        <span className="material-symbols-outlined">palette</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 text-slate-900 lensa-title">Color Palette</h2>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8">Your seasonal type is <span className="text-primary font-bold">Cool Summer</span>. These shades enhance your skin's natural luminance.</p>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-[16px]">check</span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">Imperial Navy</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-[16px]">check</span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">Deep Emerald</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-[16px]">check</span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">Soft Charcoal</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    {[
                                        { color: '#0F172A', code: '#0F172A' },
                                        { color: '#FF4DB8', code: '#FF4DB8' },
                                        { color: '#065F46', code: '#065F46' },
                                        { color: '#64748B', code: '#64748B' },
                                        { color: '#F8FAFC', code: '#F8FAFC' },
                                        { color: '#8B5CF6', code: '#8B5CF6' },
                                        { color: '#1E293B', code: '#1E293B' },
                                        { color: '#EC4899', code: '#EC4899' },
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col gap-3">
                                            <div className={`h-28 w-full rounded-2xl shadow-sm ring-1 ring-inset ring-black/5 ${item.color === '#F8FAFC' ? 'border border-slate-100' : ''}`} style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[11px] font-mono text-center text-slate-400">{item.code}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 flex flex-col gap-10">
                        {/* Grooming Tips */}
                        <section className="section-card rounded-2xl overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-accent-pink rounded-lg text-primary">
                                        <span className="material-symbols-outlined">face</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 lensa-title">Grooming Tips</h2>
                                </div>
                                <div className="bg-accent-pink rounded-2xl p-6 mb-8 border border-border-pink text-center">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2 block">Face Archetype</span>
                                    <div className="text-2xl font-bold text-slate-900">DIAMOND / STRONG</div>
                                </div>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-cover bg-center shadow-sm border-2 border-white group-hover:border-primary/30 transition-colors" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAo-jaf6coyED45VWZAF23C6K7aLeZNmzVsMB8lDPbB7JLbKbtTGpUyVfJuokrMNEV1Q_Bi4p3EZHAcUBW4dc9NQwUx97Jw1mRZhWLkURHZyYHY0-QWAbBpzgJvrYsg6J4g1ktH3jG134af0YbsCZY9ekQ1rjkjQS8olnt9okRjV5iW5iVa3qS8ZSeeNB7NSzBkjxDxX9jfYlXWQXJAhg6dSQ7N-qovxWPDJZ-nVlInTwUE6Dzsg07iA_7cFaC7nlT1f_uWLe5DPPWo")' }}></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-base">Classic Taper</h4>
                                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Soften your temple area with a gradual fade. Best for formal aesthetics.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-cover bg-center shadow-sm border-2 border-white group-hover:border-primary/30 transition-colors" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmuv14M5OZbgWO_8Ej8p6a2-vGzhJJ77y1vw3UfnZExNSK23N34vJ0cT2foJmaKI3oz9XeVTFWHz9dil5N5Mke_H_ONCcRAJTH24oMVS7V-SIIbk0J-N95wQT6HS6Mbp4j91pOKhN753IntJO_P3OWBAGN5Mvxej2cQWqwLEws-1WuhtEiDi9sf_08WJzg2YZrtw96tfLQ89RwoA3PRTPWp7ta2IJFu59wKZ8I_tPkZMnBQMWDv8XlSrOO0w3nATtJfGoDm5LszGgZ")' }}></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-base">Modern Pompadour</h4>
                                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Adds vertical height to elongate your profile. Recommended styling: Matte Wax.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary/5 p-5 border-t border-border-pink">
                                <p className="text-[11px] font-bold text-center text-primary uppercase tracking-[0.15em]">Refinement Level: Premium</p>
                            </div>
                        </section>

                        {/* Body Analysis */}
                        <section className="section-card rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-8 text-slate-900 lensa-title">Body Analysis</h2>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold mb-3 text-slate-400 tracking-wider">
                                        <span>UPPER BODY RATIO</span>
                                        <span className="text-primary">GOLDEN (1.61)</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold mb-3 text-slate-400 tracking-wider">
                                        <span>STANCE SYMMETRY</span>
                                        <span className="text-primary">94% EXCELLENT</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold mb-3 text-slate-400 tracking-wider">
                                        <span>COLOR ADAPTABILITY</span>
                                        <span className="text-primary">HIGH</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 pt-8 border-t border-pink-50">
                                <div className="flex items-start gap-4 p-5 rounded-2xl bg-accent-pink border border-border-pink">
                                    <span className="material-symbols-outlined text-primary text-2xl mt-0.5">auto_awesome</span>
                                    <p className="text-xs leading-relaxed text-slate-600 font-medium italic">"Based on your limb-to-torso ratio, mid-rise trousers with a slight taper will create the most elegant visual line."</p>
                                </div>
                            </div>
                        </section>

                        {/* Premium Upgrade CTA */}
                        <div className="rounded-2xl pink-gradient-bg p-8 text-white text-center shadow-xl shadow-primary/20">
                            <h3 className="text-2xl font-bold mb-3 lensa-title">The Complete Style Bible</h3>
                            <p className="text-sm text-white/90 mb-8 leading-relaxed">Unlock your 50+ page customized dossier with brand-specific shopping lists and fabric guides.</p>
                            <button className="w-full py-4 bg-white text-primary rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                Upgrade to Premium ($19)
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer variant="result" />
        </div>
    );
}
