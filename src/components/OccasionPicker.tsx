import { memo } from 'react';
import { OCCASIONS, getOccasion } from '../data/occasions';
import type { Occasion, OccasionName } from '../types/card';

interface Props {
  occasion: Occasion;
  name: OccasionName;
  onOccasionChange: (o: Occasion) => void;
  onNameChange: (n: OccasionName) => void;
}

/** Diwali · Padwa · Bhaubij, plus the regional name choice for Padwa and Bhaubij. */
export const OccasionPicker = memo(({ occasion, name, onOccasionChange, onNameChange }: Props) => {
  const names = getOccasion(occasion).names;
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3">
      <div role="radiogroup" aria-label="Occasion" className="grid w-full grid-cols-3 gap-1.5 rounded-2xl border border-gold-400/20 bg-black/30 p-1.5">
        {OCCASIONS.map((o) => {
          const active = o.id === occasion;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onOccasionChange(o.id)}
              className={`rounded-xl px-2 py-2 text-center transition ${active ? 'bg-gold-400 text-maroon-900 shadow-lg' : 'text-cream-100/70 hover:text-cream-50'}`}
            >
              <span className="block text-sm font-semibold">{o.label}</span>
              <span className={`block text-[12px] ${active ? 'text-maroon-900/70' : 'text-cream-100/45'}`}>{o.native}</span>
            </button>
          );
        })}
      </div>
      {names && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-cream-100/60">
          <span>Call it:</span>
          {(['primary', 'alternate'] as const).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={name === n}
              onClick={() => onNameChange(n)}
              className={`chip ${name === n ? 'chip-active' : 'chip-idle'}`}
            >
              {names[n]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
OccasionPicker.displayName = 'OccasionPicker';
