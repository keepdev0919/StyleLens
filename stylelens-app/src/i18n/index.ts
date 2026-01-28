import { en, type TranslationKey } from './en';
import { ko } from './ko';
import type { Language } from '../context/SettingsContext';

const translations: Record<Language, Record<TranslationKey, string>> = { en, ko };

export function t(language: Language, key: TranslationKey): string {
    return translations[language]?.[key] || translations.en[key] || key;
}

export type { TranslationKey };
