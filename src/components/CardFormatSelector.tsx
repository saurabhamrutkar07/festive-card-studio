import { memo } from 'react';
import type { CardFormat } from '../types/card';
import { CARD_DIMENSIONS } from '../data/templates';

const FORMATS: { value: CardFormat; name: string; hint: string }[] = [
  { value: 'portrait', name: 'Portrait', hint: 'Best for WhatsApp & Stories' },
  { value: 'square', name: 'Square', hint: 'Best for Instagram posts' },
  { value: 'landscape', name: 'Landscape', hint: 'Best for email & desktop' },
];

interface Props {
  value: CardFormat;
  onChange: (f: CardFormat) => void;
}

export const CardFormatSelector = memo(({ value, onChange }: Props) => (
  <div role="radiogroup" aria-label="Card format" className="grid grid-cols-3 gap-2.5">
    {FORMATS.map((f) => {
      const d = CARD_DIMENSIONS[f.value];
      const active = value === f.value;
      const ratio = d.width / d.height;
      return (
        <button
          key={f.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(f.value)}
          title={f.hint}
          className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 transition ${
            active ? 'border-gold-400 bg-gold-400/10' : 'border-gold-400/15 bg-black/20 hover:border-gold-400/40'
          }`}
        >
          <span className="flex h-9 items-center">
            <span
              className={`block rounded-[3px] border-2 ${active ? 'border-gold-300 bg-gold-400/25' : 'border-cream-100/40'}`}
              style={{ height: ratio < 1 ? 34 : ratio === 1 ? 28 : 22, width: ratio < 1 ? 27 : ratio === 1 ? 28 : 39 }}
            />
          </span>
          <span className={`text-sm font-medium ${active ? 'text-gold-200' : 'text-cream-100/80'}`}>{f.name}</span>
          <span className="text-[11px] text-cream-100/45">
            {d.width} × {d.height}
          </span>
        </button>
      );
    })}
  </div>
));
CardFormatSelector.displayName = 'CardFormatSelector';
