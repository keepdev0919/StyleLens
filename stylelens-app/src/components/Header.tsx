import { Link } from 'react-router-dom';

interface HeaderProps {
    variant?: 'landing' | 'result';
    userImageUrl?: string;
    onDownload?: () => void;
}

export default function Header({ variant = 'landing', userImageUrl, onDownload }: HeaderProps) {
    if (variant === 'result') {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-pink-50 bg-white/95 backdrop-blur-md">
                <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="header-logo-gradient p-2 rounded-xl shadow-sm">
                                <span className="material-symbols-outlined text-white text-xl block">flare</span>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                Style<span className="text-primary">Lens</span>
                            </h2>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-semibold hover:text-primary transition-colors text-slate-600" href="#">Analysis</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors text-slate-600" href="#">Virtual Wardrobe</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors text-slate-600" href="#">Collections</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors text-slate-600" href="#">Settings</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onDownload}
                            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                        >
                            <span className="material-symbols-outlined text-sm">download_2</span>
                            <span>Download Report</span>
                        </button>
                        {userImageUrl && (
                            <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5">
                                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${userImageUrl}")` }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="fixed top-0 z-50 w-full glass-nav border-b border-black/5 px-6 lg:px-20 py-4">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link
                        to="/"
                        className="logo-text text-2xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex items-center"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <span className="font-extrabold text-black">Style</span>
                        <span className="font-normal text-primary">Lens</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <a className="text-sm font-semibold hover:text-primary transition-colors" href="#testimonials">Reviews</a>
                    <a className="text-sm font-semibold hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
                    <a className="text-sm font-semibold hover:text-primary transition-colors" href="#start">Get Started</a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link to="/input">
                        <button className="bg-primary hover:opacity-90 text-white text-sm font-bold px-8 py-3 rounded-full transition-all shadow-lg shadow-primary/20">
                            Start Your Style Journey
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
