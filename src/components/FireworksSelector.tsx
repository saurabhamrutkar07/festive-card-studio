import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import type { FireworksLevel } from '../types/card';

const OPTIONS: { v: FireworksLevel; label: string; hint: string }[] = [
  { v: 'off', label: 'Off', hint: 'Design only' },
  { v: 'subtle', label: 'Subtle', hint: 'A few bursts' },
  { v: 'grand', label: 'Grand', hint: 'Full sky show' },
];

export const FireworksSelector = memo(({ value, onChange }: { value: FireworksLevel; onChange: (v: FireworksLevel) => void }) => (
  <div>
    <span className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-cream-100/50">
      <Sparkles className="h-3.5 w-3.5" /> Fireworks &amp; rockets
    </span>
    <div className="grid grid-cols-3 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
      {OPTIONS.map(({ v, label, hint }) => (
        <button
          key={v}
          type="button"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className={`rounded-md px-2 py-2 text-center transition ${
            value === v ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'
          }`}
        >
          <span className="block text-sm font-medium">{label}</span>
          <span className={`block text-[11px] ${value === v ? 'text-maroon-900/70' : 'text-cream-100/40'}`}>{hint}</span>
        </button>
      ))}
    </div>
    {value !== 'off' && (
      <p className="mt-2 text-xs text-cream-100/45">Your card downloads and shares as an animated GIF that plays by itself in WhatsApp.</p>
    )}
  </div>
));
FireworksSelector.displayName = 'FireworksSelector';
