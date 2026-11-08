import { memo } from 'react';
import { Briefcase, Heart } from 'lucide-react';
import type { CardMode } from '../types/card';

const OPTIONS: { v: CardMode; label: string; hint: string; Icon: typeof Heart }[] = [
  { v: 'personal', label: 'Personal', hint: 'For family & friends', Icon: Heart },
  { v: 'business', label: 'Business', hint: 'Branded with your logo', Icon: Briefcase },
];

/** Top-level choice: personal greetings or branded business greetings. */
export const ModeSwitch = memo(({ value, onChange }: { value: CardMode; onChange: (v: CardMode) => void }) => (
  <div role="radiogroup" aria-label="Card type" className="mx-auto grid max-w-md grid-cols-2 gap-1.5 rounded-2xl border border-gold-400/20 bg-black/30 p-1.5">
    {OPTIONS.map(({ v, label, hint, Icon }) => {
      const active = value === v;
      return (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(v)}
          className={`flex items-center justify-center gap-2.5 rounded-xl px-3 py-2.5 transition ${
            active ? 'bg-gold-400 text-maroon-900 shadow-lg' : 'text-cream-100/70 hover:text-cream-50'
          }`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="text-left">
            <span className="block text-sm font-semibold">{label}</span>
            <span className={`block text-[11px] ${active ? 'text-maroon-900/70' : 'text-cream-100/45'}`}>{hint}</span>
          </span>
        </button>
      );
    })}
  </div>
));
ModeSwitch.displayName = 'ModeSwitch';
