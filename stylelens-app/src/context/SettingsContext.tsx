import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'ko';
export type UnitSystem = 'metric' | 'imperial';

interface SettingsContextValue {
    language: Language;
    unitSystem: UnitSystem;
    setLanguage: (lang: Language) => void;
    setUnitSystem: (unit: UnitSystem) => void;
    toggleUnitSystem: () => void;
}

const STORAGE_KEY = 'stylelens_settings';

function detectDefaults(): { language: Language; unitSystem: UnitSystem } {
    const browserLang = navigator.language || 'en';
    const language: Language = browserLang.startsWith('ko') ? 'ko' : 'en';
    const unitSystem: UnitSystem = browserLang === 'en-US' ? 'imperial' : 'metric';
    return { language, unitSystem };
}

function loadSettings(): { language: Language; unitSystem: UnitSystem } {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                language: parsed.language || detectDefaults().language,
                unitSystem: parsed.unitSystem || detectDefaults().unitSystem,
            };
        }
    } catch {
        // ignore parse errors
    }
    return detectDefaults();
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState(loadSettings);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        document.documentElement.lang = settings.language;
    }, [settings]);

    const setLanguage = (language: Language) => setSettings(prev => ({ ...prev, language }));
    const setUnitSystem = (unitSystem: UnitSystem) => setSettings(prev => ({ ...prev, unitSystem }));
    const toggleUnitSystem = () => setSettings(prev => ({
        ...prev,
        unitSystem: prev.unitSystem === 'metric' ? 'imperial' : 'metric',
    }));

    return (
        <SettingsContext.Provider value={{ ...settings, setLanguage, setUnitSystem, toggleUnitSystem }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
    return ctx;
}
