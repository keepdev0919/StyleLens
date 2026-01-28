import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

export default function UnitToggle() {
    const { language, unitSystem, toggleUnitSystem } = useSettings();

    return (
        <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-gray-500">
                {unitSystem === 'metric' ? 'cm / kg' : 'ft·in / lbs'}
            </span>
            <button
                type="button"
                onClick={toggleUnitSystem}
                className="relative inline-flex h-8 w-[140px] items-center rounded-full border-2 border-gray-200 bg-gray-100 transition-all"
            >
                <span
                    className={`absolute h-7 w-[68px] rounded-full bg-primary shadow-md transition-transform duration-200 ${
                        unitSystem === 'imperial' ? 'translate-x-[68px]' : 'translate-x-0'
                    }`}
                />
                <span className={`relative z-10 flex-1 text-center text-xs font-bold transition-colors ${
                    unitSystem === 'metric' ? 'text-white' : 'text-gray-500'
                }`}>
                    {t(language, 'input.unitToggle.metric')}
                </span>
                <span className={`relative z-10 flex-1 text-center text-xs font-bold transition-colors ${
                    unitSystem === 'imperial' ? 'text-white' : 'text-gray-500'
                }`}>
                    {t(language, 'input.unitToggle.imperial')}
                </span>
            </button>
        </div>
    );
}
