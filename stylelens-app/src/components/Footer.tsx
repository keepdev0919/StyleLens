interface FooterProps {
    variant?: 'landing' | 'result';
}

export default function Footer({ variant = 'landing' }: FooterProps) {
    if (variant === 'result') {
        return (
            <footer className="mt-24 border-t border-pink-50 py-16 px-6 bg-slate-50">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2 grayscale opacity-60">
                        <div className="bg-slate-400/20 p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-slate-600 text-xl block">flare</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight text-slate-600">StyleLens © 2024</h2>
                    </div>
                    <div className="flex gap-12">
                        <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Ethics Policy</a>
                        <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Usage Terms</a>
                        <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Support Desk</a>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="px-6 lg:px-20 py-16 border-t border-black/5 bg-white">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-2">
                    <div className="logo-text text-xl tracking-tight">
                        <span className="font-extrabold text-black">Style</span>
                        <span className="font-normal text-primary">Lens</span>
                    </div>
                </div>
                <div className="flex gap-10 text-sm font-bold text-gray-500">
                    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                    <a className="hover:text-primary transition-colors" href="#">Contact</a>
                </div>
                <p className="text-sm font-medium text-gray-400">© 2024 StyleLens. All rights reserved.</p>
            </div>
        </footer>
    );
}
