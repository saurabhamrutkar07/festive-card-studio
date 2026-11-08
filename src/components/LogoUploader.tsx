import { memo, useRef, useState, type DragEvent } from 'react';
import { ImagePlus, Loader2, Trash2, Upload } from 'lucide-react';
import { LOGO_ACCEPT, prepareLogo } from '../utils/logo';
import type { CardMode, LogoOptions, LogoPosition, LogoShape, LogoSize } from '../types/card';

interface Props {
  logo: LogoOptions;
  onChange: <K extends keyof LogoOptions>(key: K, value: LogoOptions[K]) => void;
  onRemove: () => void;
  /** Business designs place the logo themselves, so placement controls are hidden. */
  mode: CardMode;
}

const CORNERS: { v: LogoPosition; label: string }[] = [
  { v: 'top-left', label: 'Top left' },
  { v: 'top-center', label: 'Top centre' },
  { v: 'top-right', label: 'Top right' },
  { v: 'bottom-left', label: 'Bottom left' },
  { v: 'bottom-center', label: 'Bottom centre' },
  { v: 'bottom-right', label: 'Bottom right' },
];

const SHAPES: { v: LogoShape; label: string; mark: string }[] = [
  { v: 'original', label: 'Original', mark: 'rounded-[1px] border-dashed' },
  { v: 'circle', label: 'Circle', mark: 'rounded-full' },
  { v: 'rounded', label: 'Rounded', mark: 'rounded-[5px]' },
  { v: 'square', label: 'Square', mark: 'rounded-none' },
];

const SIZES: { v: LogoSize; label: string }[] = [
  { v: 'sm', label: 'Small' },
  { v: 'md', label: 'Medium' },
  { v: 'lg', label: 'Large' },
];

const optionClass = (active: boolean) =>
  `h-9 rounded-md text-xs font-medium transition ${active ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'}`;

export const LogoUploader = memo(({ logo, onChange, onRemove, mode }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(undefined);
    setBusy(true);
    try {
      onChange('src', await prepareLogo(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'This image could not be used.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        id="logo-upload"
        type="file"
        accept={LOGO_ACCEPT}
        className="sr-only"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      {logo.src ? (
        <div className="flex items-center gap-4 rounded-xl border border-gold-400/20 bg-black/20 p-3">
          <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-[repeating-conic-gradient(rgba(255,255,255,0.08)_0%_25%,transparent_0%_50%)] bg-[length:12px_12px] p-1.5">
            <img
              src={logo.src}
              alt="Your logo"
              className={
                logo.shape === 'original'
                  ? 'max-h-full max-w-full object-contain'
                  : `aspect-square h-full object-cover ${logo.shape === 'circle' ? 'rounded-full' : logo.shape === 'rounded' ? 'rounded-lg' : ''}`
              }
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold-400/30 px-3 py-2 text-xs font-medium text-gold-200 hover:border-gold-400/60"
            >
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />} Replace
            </button>
            <button
              type="button"
              onClick={() => {
                setError(undefined);
                onRemove();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-cream-100/70 hover:border-red-400/50 hover:text-red-200"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="logo-upload"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition ${
            dragging ? 'border-gold-300 bg-gold-400/10' : 'border-gold-400/25 bg-black/20 hover:border-gold-400/50'
          }`}
        >
          {busy ? <Loader2 className="h-7 w-7 animate-spin text-gold-300" /> : <ImagePlus className="h-7 w-7 text-gold-300" />}
          <span className="text-sm font-medium text-cream-100/85">Upload your business logo</span>
          <span className="text-xs text-cream-100/45">PNG with transparent background works best · JPG, WEBP, SVG · up to 5 MB</span>
        </label>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-red-300">
          {error}
        </p>
      )}

      {mode === 'business' && (
        <p className="text-xs text-cream-100/45">
          {logo.src
            ? 'Each business design places and sizes your logo to suit its layout.'
            : 'No logo? The design shows a monogram of your business initials instead.'}
        </p>
      )}

      {logo.src && (
        <div>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">Logo shape</span>
          <div className="grid grid-cols-4 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
            {SHAPES.map(({ v, label, mark }) => (
              <button
                key={v}
                type="button"
                aria-pressed={logo.shape === v}
                onClick={() => onChange('shape', v)}
                className={`flex flex-col items-center gap-1 rounded-md py-2 text-xs font-medium transition ${
                  logo.shape === v ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'
                }`}
              >
                <span aria-hidden="true" className={`block h-4 w-4 border-2 border-current ${mark}`} />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-cream-100/45">Circle, Rounded and Square crop your logo to that shape — pick Circle for round logos.</p>
        </div>
      )}

      {logo.src && mode === 'personal' && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">Placement</span>
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
              {(
                [
                  { signature: true, label: 'With your name', hint: 'Recommended' },
                  { signature: false, label: 'On the card', hint: 'Pick a spot' },
                ] as const
              ).map(({ signature, label, hint }) => {
                const active = (logo.position === 'signature') === signature;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => !active && onChange('position', signature ? 'signature' : 'top-center')}
                    className={`rounded-md px-2 py-2 text-center transition ${active ? 'bg-gold-400 text-maroon-900' : 'text-cream-100/70 hover:text-cream-50'}`}
                  >
                    <span className="block text-sm font-medium">{label}</span>
                    <span className={`block text-[11px] ${active ? 'text-maroon-900/70' : 'text-cream-100/40'}`}>{hint}</span>
                  </button>
                );
              })}
            </div>
            {logo.position === 'signature' ? (
              <p className="mt-2 text-xs text-cream-100/45">Sits above your name, like a letterhead, and follows the sender alignment.</p>
            ) : (
            <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
              {CORNERS.map(({ v, label }) => (
                <button
                  key={v}
                  type="button"
                  title={label}
                  aria-label={label}
                  aria-pressed={logo.position === v}
                  onClick={() => onChange('position', v)}
                  className={`flex px-2.5 py-1.5 ${v.startsWith('top') ? 'items-start' : 'items-end'} ${
                    v.endsWith('left') ? 'justify-start' : v.endsWith('right') ? 'justify-end' : 'justify-center'
                  } ${optionClass(logo.position === v)}`}
                >
                  <span className="block h-2.5 w-3.5 rounded-sm bg-current" />
                </button>
              ))}
            </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">Size</span>
              <div className="grid grid-cols-3 gap-1 rounded-lg border border-gold-400/15 bg-black/25 p-1">
                {SIZES.map(({ v, label }) => (
                  <button key={v} type="button" aria-pressed={logo.size === v} onClick={() => onChange('size', v)} className={optionClass(logo.size === v)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-cream-100/85">
              <span>
                White badge behind logo
                <span className="block text-xs text-cream-100/45">Keeps dark logos visible on dark designs</span>
              </span>
              <input
                type="checkbox"
                checked={logo.backdrop}
                onChange={(e) => onChange('backdrop', e.target.checked)}
                className="h-5 w-5 shrink-0 cursor-pointer accent-[#e5b84b]"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
});
LogoUploader.displayName = 'LogoUploader';
