import { useSettings } from '../context/SettingsContext';
import type { Language } from '../context/SettingsContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useSettings();

    const toggle = () => {
        const next: Language = language === 'en' ? 'ko' : 'en';
        setLanguage(next);
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary text-sm font-semibold text-gray-600 hover:text-primary transition-all"
        >
            <span className="material-symbols-outlined text-base">language</span>
            <span>{language === 'en' ? 'KO' : 'EN'}</span>
        </button>
    );
}
