import { memo } from 'react';
import { Check, PenLine, ScrollText } from 'lucide-react';
import { WISH_CATEGORIES } from '../data/wishes';
import { t } from '../data/translations';
import type { Language, MessageMode, Wish, WishCategory } from '../types/card';
import { RandomWishButton } from './RandomWishButton';
import { CustomMessageEditor } from './CustomMessageEditor';

interface Props {
  language: Language;
  mode: MessageMode;
  onModeChange: (m: MessageMode) => void;
  category: WishCategory | 'all';
  onCategoryChange: (c: WishCategory | 'all') => void;
  wishes: Wish[];
  selectedId: string;
  onSelect: (id: string) => void;
  onRandom: () => void;
  presetText: string;
  isPresetEdited: boolean;
  onEditPreset: (v: string) => void;
  onResetPreset: () => void;
  customMessage: string;
  onCustomChange: (v: string) => void;
  error?: string;
}

export const WishSelector = memo((p: Props) => {
  const labels = t(p.language).wishCategories;
  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Message type" className="grid grid-cols-2 gap-1 rounded-xl border border-gold-400/20 bg-black/25 p-1">
        {(
          [
            { v: 'preset', label: 'Predefined wishes', Icon: ScrollText },
            { v: 'custom', label: 'Write your own', Icon: PenLine },
          ] as const
        ).map(({ v, label, Icon }) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={p.mode === v}
            onClick={() => p.onModeChange(v)}
            className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2.5 text-[13px] font-medium transition sm:gap-2 sm:text-sm ${
              p.mode === v ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {p.mode === 'preset' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <RandomWishButton onClick={p.onRandom} />
            <span className="text-xs text-cream-100/45">{p.wishes.length} wishes{p.category !== 'all' ? ` in “${labels[p.category]}”` : ''}</span>
          </div>
          <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {(['all', ...WISH_CATEGORIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => p.onCategoryChange(c)}
                className={`chip ${p.category === c ? 'chip-active' : 'chip-idle'}`}
              >
                {c === 'all' ? (p.language === 'en' ? 'All' : p.language === 'hi' ? 'सभी' : 'सर्व') : labels[c]}
              </button>
            ))}
          </div>
          <ul className="scrollbar-thin max-h-80 space-y-2 overflow-y-auto pr-1" role="listbox" aria-label="Diwali wishes">
            {p.wishes.map((w) => {
              const active = w.id === p.selectedId;
              return (
                <li key={w.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => p.onSelect(w.id)}
                    className={`flex w-full gap-3 rounded-xl border p-3.5 text-left text-[14px] leading-relaxed transition ${
                      active ? 'border-gold-400/80 bg-gold-400/10 text-cream-50' : 'border-gold-400/10 bg-black/15 text-cream-100/75 hover:border-gold-400/35'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        active ? 'border-gold-400 bg-gold-400 text-maroon-900' : 'border-cream-100/30'
                      }`}
                    >
                      {active && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <span>
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gold-300/80">{labels[w.category]}</span>
                      {w.text[p.language]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <CustomMessageEditor
            id="preset-editor"
            label={p.isPresetEdited ? 'Selected wish (edited)' : 'Edit the selected wish (optional)'}
            value={p.presetText}
            onChange={p.onEditPreset}
            rows={4}
            onReset={p.isPresetEdited ? p.onResetPreset : undefined}
            resetLabel="Restore original"
            error={p.error}
          />
        </>
      ) : (
        <CustomMessageEditor
          id="custom-message"
          label="Your custom Diwali message"
          value={p.customMessage}
          onChange={p.onCustomChange}
          rows={6}
          placeholder={
            p.language === 'en'
              ? 'Write something from the heart… (Hindi and Marathi typing works too)'
              : p.language === 'hi'
                ? 'अपने दिल की बात लिखिए…'
                : 'तुमच्या मनातील शुभेच्छा लिहा…'
          }
          onReset={() => p.onCustomChange(p.customMessage ? '' : p.presetText)}
          resetLabel={p.customMessage ? 'Clear' : 'Start from selected wish'}
          error={p.error}
        />
      )}
    </div>
  );
});
WishSelector.displayName = 'WishSelector';
