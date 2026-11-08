import { RotateCcw } from 'lucide-react';
import { LIMITS } from '../hooks/useCardGenerator';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  onReset?: () => void;
  resetLabel?: string;
  error?: string;
}

export const CustomMessageEditor = ({ id, label, value, onChange, placeholder, rows = 5, onReset, resetLabel, error }: Props) => {
  const remaining = LIMITS.message - value.length;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-cream-100/85">
          {label}
        </label>
        {onReset && (
          <button type="button" onClick={onReset} className="inline-flex items-center gap-1 text-xs font-medium text-gold-300 hover:text-gold-200">
            <RotateCcw className="h-3.5 w-3.5" /> {resetLabel ?? 'Reset'}
          </button>
        )}
      </div>
      <textarea
        id={id}
        value={value}
        rows={rows}
        maxLength={LIMITS.message}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`field-input scrollbar-thin resize-y leading-relaxed ${error ? 'border-red-400/70' : ''}`}
      />
      <div className="mt-1.5 flex items-center justify-between text-xs">
        <span className={error ? 'text-red-300' : 'text-cream-100/45'}>{error ?? 'Long messages shrink automatically to fit the card.'}</span>
        <span className={remaining < 40 ? 'text-saffron-400' : 'text-cream-100/40'}>{remaining} left</span>
      </div>
    </div>
  );
};
