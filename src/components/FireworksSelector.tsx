import { memo } from 'react';
import { Flower2, Sparkles } from 'lucide-react';
import type { FireworksLevel } from '../types/card';

const OPTIONS: { v: FireworksLevel; label: string; hint: string }[] = [
  { v: 'off', label: 'Off', hint: 'Design only' },
  { v: 'subtle', label: 'Subtle', hint: 'A few bursts' },
  { v: 'grand', label: 'Grand', hint: 'Full sky show' },
];

interface Props {
  value: FireworksLevel;
  onChange: (v: FireworksLevel) => void;
  /** The occasion's own animation (Padwa / Bhaubij), when it has one. */
  occasionEffect?: { label: string; on: boolean; onToggle: (on: boolean) => void };
  /** True when any animation is showing, so the card exports as a GIF. */
  animated: boolean;
}

/** Card animations: the occasion's own effect (if any) plus optional fireworks. */
export const FireworksSelector = memo(({ value, onChange, occasionEffect, animated }: Props) => (
  <div className="space-y-4">
    {occasionEffect && (
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gold-400/15 bg-black/25 px-4 py-3">
        <span className="flex items-center gap-2.5 text-sm text-cream-100/85">
          <Flower2 className="h-4 w-4 shrink-0 text-gold-300" />
          <span>
            {occasionEffect.label}
            <span className="block text-xs text-cream-100/45">Animation made for this occasion</span>
          </span>
        </span>
        <input
          type="checkbox"
          checked={occasionEffect.on}
          onChange={(e) => occasionEffect.onToggle(e.target.checked)}
          className="h-5 w-5 shrink-0 cursor-pointer accent-[#e5b84b]"
        />
      </label>
    )}
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
            className={`rounded-md px-2 py-2 text-center transition ${value === v ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'}`}
          >
            <span className="block text-sm font-medium">{label}</span>
            <span className={`block text-[11px] ${value === v ? 'text-maroon-900/70' : 'text-cream-100/40'}`}>{hint}</span>
          </button>
        ))}
      </div>
    </div>
    {animated && <p className="text-xs text-cream-100/45">Your card downloads and shares as an animated GIF that plays by itself in WhatsApp.</p>}
  </div>
));
FireworksSelector.displayName = 'FireworksSelector';
