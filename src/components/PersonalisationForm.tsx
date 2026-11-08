import { memo, useState } from 'react';
import { AlignCenter, AlignLeft, AlignRight, ChevronDown, Palette, RotateCcw, Wand2 } from 'lucide-react';
import { BUSINESS_LIMITS, LIMITS } from '../hooks/useCardGenerator';
import { USER_FONT_OPTIONS } from './cards/typography';
import type { BusinessDetails, CardMode, FontScale, FontStyle, SenderDetails, SenderTextField, SignAs, TextAlign, TextStyleOptions } from '../types/card';

const SIGN_AS_OPTIONS: { v: SignAs; label: string; example: string }[] = [
  { v: 'me', label: 'Just me', example: 'John Doe' },
  { v: 'withFamily', label: 'Me & family', example: 'John Doe & Family' },
  { v: 'family', label: 'Whole family', example: 'Doe Family' },
];

const COLOR_SWATCHES = [
  { value: 'template', label: 'Design default' },
  { value: '#fff8e7', label: 'Ivory' },
  { value: '#f3d27a', label: 'Gold' },
  { value: '#ffb36b', label: 'Saffron' },
  { value: '#7a1424', label: 'Maroon' },
  { value: '#1d2a5c', label: 'Navy' },
  { value: '#1f1a17', label: 'Charcoal' },
];

interface Props {
  mode: CardMode;
  business: BusinessDetails;
  onBusinessChange: (key: keyof BusinessDetails, value: string) => void;
  sender: SenderDetails;
  onSenderChange: (key: SenderTextField, value: string) => void;
  onSignAsChange: (value: SignAs) => void;
  textStyle: TextStyleOptions;
  onStyleChange: <K extends keyof TextStyleOptions>(key: K, value: TextStyleOptions[K]) => void;
  onResetStyle: () => void;
  senderPreview: string;
  senderIntroPreview: string;
  nameError?: string;
}

const Field = ({
  id,
  label,
  hint,
  required,
  value,
  max,
  placeholder,
  onChange,
  error,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  value: string;
  max: number;
  placeholder: string;
  onChange: (v: string) => void;
  error?: string;
}) => (
  <div>
    <label htmlFor={id} className="mb-1.5 flex items-center justify-between text-sm font-medium text-cream-100/85">
      <span>
        {label} {required ? <span className="text-saffron-400">*</span> : <span className="font-normal text-cream-100/40">(optional)</span>}
      </span>
      <span className="text-xs font-normal text-cream-100/35">
        {value.length}/{max}
      </span>
    </label>
    <input
      id={id}
      type="text"
      value={value}
      maxLength={max}
      placeholder={placeholder}
      autoComplete="off"
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className={`field-input ${error ? 'border-red-400/80 ring-2 ring-red-400/20' : ''}`}
    />
    {error ? (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-300">
        {error}
      </p>
    ) : (
      hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-cream-100/45">
          {hint}
        </p>
      )
    )}
  </div>
);

export const PersonalisationForm = memo(
  ({
    mode,
    sender,
    onSenderChange,
    onSignAsChange,
    business,
    onBusinessChange,
    textStyle,
    onStyleChange,
    onResetStyle,
    senderPreview,
    senderIntroPreview,
    nameError,
  }: Props) => {
    const [showStyle, setShowStyle] = useState(false);
    const styleChanged =
      textStyle.fontStyle !== 'template' || textStyle.senderAlign !== 'template' || textStyle.fontScale !== 'md' || textStyle.textColor !== 'template';

    return (
      <div className="space-y-4">
        {mode === 'business' ? (
          <>
            <Field
              id="business-name"
              label="Business Name"
              required
              value={business.name}
              max={BUSINESS_LIMITS.name}
              placeholder="e.g. Sharma Sweets"
              hint="No logo yet? Its initials are used as a monogram."
              onChange={(v) => onBusinessChange('name', v)}
              error={nameError}
            />
            <Field
              id="business-tagline"
              label="Tagline"
              value={business.tagline}
              max={BUSINESS_LIMITS.tagline}
              placeholder="e.g. Pure Ghee Mithai since 1985"
              onChange={(v) => onBusinessChange('tagline', v)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="business-phone"
                label="Phone"
                value={business.phone}
                max={BUSINESS_LIMITS.phone}
                placeholder="e.g. +91 98765 43210"
                onChange={(v) => onBusinessChange('phone', v)}
              />
              <Field
                id="business-website"
                label="Website"
                value={business.website}
                max={BUSINESS_LIMITS.website}
                placeholder="e.g. yourbusiness.in"
                onChange={(v) => onBusinessChange('website', v)}
              />
            </div>
            <Field
              id="business-address"
              label="Address"
              value={business.address}
              max={BUSINESS_LIMITS.address}
              placeholder="e.g. MG Road, Pune"
              hint="Phone, website and address appear as a contact line on the card."
              onChange={(v) => onBusinessChange('address', v)}
            />
          </>
        ) : (
        <>
        <Field
          id="sender-name"
          label="Your Name"
          required
          value={sender.name}
          max={LIMITS.name}
          placeholder="e.g. John Doe"
          hint={sender.signAs === 'family' ? 'The last word is used as your family name.' : undefined}
          onChange={(v) => onSenderChange('name', v)}
          error={nameError}
        />

        <div>
          <span className="mb-2 block text-sm font-medium text-cream-100/85">Sign as</span>
          <div role="radiogroup" aria-label="Sign as" className="grid grid-cols-3 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
            {SIGN_AS_OPTIONS.map(({ v, label, example }) => {
              const active = sender.signAs === v;
              return (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onSignAsChange(v)}
                  className={`rounded-md px-1.5 py-2 text-center transition ${active ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'}`}
                >
                  <span className="block text-sm font-medium">{label}</span>
                  <span className={`block truncate text-[11px] ${active ? 'text-maroon-900/70' : 'text-cream-100/40'}`}>{example}</span>
                </button>
              );
            })}
          </div>
        </div>
        </>
        )}
        <Field
          id="custom-sender"
          label={mode === 'business' ? 'Sign-off Line' : 'Custom Sender Text'}
          value={mode === 'business' ? business.signoff : sender.customSenderText}
          max={mode === 'business' ? BUSINESS_LIMITS.signoff : LIMITS.customSenderText}
          placeholder={mode === 'business' ? 'e.g. With warm regards from' : 'e.g. With love and light from'}
          hint="Replaces the default “Happy Diwali Wishes From” line."
          onChange={(v) => (mode === 'business' ? onBusinessChange('signoff', v) : onSenderChange('customSenderText', v))}
        />

        <div className="rounded-xl border border-dashed border-gold-400/25 bg-black/20 px-4 py-3 text-center">
          <p className="text-xs text-cream-100/50">{senderIntroPreview}</p>
          <p className="mt-0.5 font-display text-lg text-gold-200 [overflow-wrap:anywhere]">{senderPreview}</p>
        </div>

        <div className="rounded-xl border border-gold-400/15">
          <button
            type="button"
            onClick={() => setShowStyle((s) => !s)}
            aria-expanded={showStyle}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-cream-100/85"
          >
            <span className="inline-flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-gold-300" /> Text style
              {styleChanged && <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-[11px] text-gold-200">customised</span>}
            </span>
            <ChevronDown className={`h-4 w-4 transition ${showStyle ? 'rotate-180' : ''}`} />
          </button>
          {showStyle && (
            <div className="space-y-5 border-t border-gold-400/10 px-4 pb-5 pt-4">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Business designs have a fixed signature layout, so alignment only applies to personal cards. */}
                {mode === 'personal' && (
                <div>
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">Sender alignment</span>
                  <div className="grid grid-cols-4 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
                    {(
                      [
                        { v: 'template', label: 'Auto', Icon: null },
                        { v: 'left', label: 'Left', Icon: AlignLeft },
                        { v: 'center', label: 'Centre', Icon: AlignCenter },
                        { v: 'right', label: 'Right', Icon: AlignRight },
                      ] as { v: TextAlign; label: string; Icon: typeof AlignLeft | null }[]
                    ).map(({ v, label, Icon }) => (
                      <button
                        key={v}
                        type="button"
                        title={label}
                        aria-label={label}
                        aria-pressed={textStyle.senderAlign === v}
                        onClick={() => onStyleChange('senderAlign', v)}
                        className={`flex h-9 items-center justify-center rounded-md text-xs font-medium transition ${
                          textStyle.senderAlign === v ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'
                        }`}
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : label}
                      </button>
                    ))}
                  </div>
                </div>
                )}
                <div>
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">Text size</span>
                  <div className="grid grid-cols-3 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
                    {(['sm', 'md', 'lg'] as FontScale[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={textStyle.fontScale === s}
                        onClick={() => onStyleChange('fontScale', s)}
                        className={`h-9 rounded-md font-medium transition ${s === 'sm' ? 'text-xs' : s === 'md' ? 'text-sm' : 'text-base'} ${
                          textStyle.fontScale === s ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'
                        }`}
                      >
                        {s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="font-style" className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">
                  Message font
                </label>
                <select
                  id="font-style"
                  value={textStyle.fontStyle}
                  onChange={(e) => onStyleChange('fontStyle', e.target.value as FontStyle)}
                  className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%23e5b84b%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10"
                >
                  {USER_FONT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-maroon-900">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-cream-100/50">
                  <Palette className="h-3.5 w-3.5" /> Text colour
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {COLOR_SWATCHES.map((c) => {
                    const active = textStyle.textColor === c.value;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        title={c.label}
                        aria-label={c.label}
                        aria-pressed={active}
                        onClick={() => onStyleChange('textColor', c.value)}
                        className={`h-9 w-9 rounded-full border-2 transition ${active ? 'scale-110 border-gold-300' : 'border-white/15 hover:border-white/40'}`}
                        style={{
                          background:
                            c.value === 'template' ? 'conic-gradient(#f3d27a, #7a1424, #1d2a5c, #fff8e7, #f3d27a)' : c.value,
                        }}
                      />
                    );
                  })}
                  <label
                    title="Pick any colour"
                    className="relative flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-xs text-cream-100/70 hover:border-white/40"
                  >
                    Custom
                    <input
                      type="color"
                      value={textStyle.textColor.startsWith('#') ? textStyle.textColor : '#ffffff'}
                      onChange={(e) => onStyleChange('textColor', e.target.value)}
                      className="h-5 w-5 cursor-pointer rounded-full border-0 bg-transparent p-0"
                    />
                  </label>
                </div>
              </div>

              {styleChanged && (
                <button type="button" onClick={onResetStyle} className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-300 hover:text-gold-200">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset text style
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
PersonalisationForm.displayName = 'PersonalisationForm';
