import { memo } from 'react';
import { LANGUAGES } from '../data/translations';
import type { Language } from '../types/card';

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
  compact?: boolean;
}

export const LanguageSelector = memo(({ value, onChange, compact = false }: LanguageSelectorProps) => (
  <div
    role="radiogroup"
    aria-label="Card language"
    className={`inline-flex rounded-xl border border-gold-400/20 bg-black/25 p-1 ${compact ? '' : 'w-full'}`}
  >
    {LANGUAGES.map((lang) => {
      const active = value === lang.code;
      return (
        <button
          key={lang.code}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(lang.code)}
          title={lang.label}
          className={`flex-1 rounded-lg font-medium transition ${compact ? 'px-2.5 py-1 text-xs sm:text-sm' : 'px-3 py-2.5 text-sm'} ${
            active ? 'bg-gold-400 text-maroon-900 shadow' : 'text-cream-100/70 hover:text-cream-50'
          }`}
        >
          {compact ? lang.nativeLabel : (
            <span className="flex flex-col items-center leading-tight sm:flex-row sm:gap-1.5">
              <span>{lang.nativeLabel}</span>
              {lang.code !== 'en' && <span className={`text-[11px] ${active ? 'text-maroon-900/70' : 'text-cream-100/40'}`}>{lang.label}</span>}
            </span>
          )}
        </button>
      );
    })}
  </div>
));
LanguageSelector.displayName = 'LanguageSelector';
