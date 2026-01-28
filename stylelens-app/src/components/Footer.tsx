import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

interface FooterProps {
    variant?: 'landing' | 'result';
}

export default function Footer({ variant = 'landing' }: FooterProps) {
    const { language } = useSettings();

    if (variant === 'result') {
        return (
            <footer className="mt-24 border-t border-pink-50 py-16 px-6 bg-slate-50">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2 grayscale opacity-60">

                        <h2 className="text-lg font-bold tracking-tight text-slate-600">StyleLens &copy; {t(language, 'footer.copyright')}</h2>
                    </div>
                    <div className="flex gap-12">
                        <Link className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" to="/privacy">{t(language, 'footer.privacy')}</Link>
                        <Link className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" to="/terms">{t(language, 'footer.terms')}</Link>
                        <Link className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" to="/refund">{t(language, 'footer.refund')}</Link>
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
                    <Link className="hover:text-primary transition-colors" to="/privacy">{t(language, 'footer.privacy')}</Link>
                    <Link className="hover:text-primary transition-colors" to="/terms">{t(language, 'footer.terms')}</Link>
                    <Link className="hover:text-primary transition-colors" to="/refund">{t(language, 'footer.refund')}</Link>
                </div>
                <p className="text-sm font-medium text-gray-400">&copy; {t(language, 'footer.copyright')}</p>
            </div>
        </footer>
    );
}
