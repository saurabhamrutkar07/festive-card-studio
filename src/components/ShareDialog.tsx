import { useEffect, useRef } from 'react';
import { CheckCircle2, ExternalLink, Paperclip, Share2, X } from 'lucide-react';

export type ShareDialogState =
  | { kind: 'manual'; filename: string; whatsappUrl: string; mobile: boolean }
  | { kind: 'retry'; onShare: () => void; filename: string; whatsappUrl: string; onFallback: () => void };

export const ShareDialog = ({ state, onClose }: { state: ShareDialogState | null; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!state) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state, onClose]);

  if (!state) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-fade-in rounded-2xl border border-gold-400/25 bg-maroon-900 p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="share-title" className="font-display text-xl font-semibold text-cream-50">
            {state.kind === 'manual' ? 'Almost there — attach your card' : 'Your card is ready to share'}
          </h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-cream-100/60 hover:bg-white/5 hover:text-cream-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        {state.kind === 'manual' ? (
          <>
            <p className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Your card was downloaded as <strong className="break-all">{state.filename}</strong>.
              </span>
            </p>
            <p className="mb-3 text-sm text-cream-100/75">
              This browser can’t attach images to WhatsApp automatically, so WhatsApp will open with your greeting text only:
            </p>
            <ol className="mb-5 space-y-2 text-sm text-cream-100/80">
              <li className="flex gap-2"><span className="font-semibold text-gold-300">1.</span> Tap “Open WhatsApp” and choose a chat.</li>
              <li className="flex gap-2">
                <span className="font-semibold text-gold-300">2.</span>
                <span>
                  Tap the <Paperclip className="inline h-3.5 w-3.5" /> attach button and pick the card from your {state.mobile ? 'Gallery / Files (Downloads)' : 'Downloads folder'}.
                </span>
              </li>
              <li className="flex gap-2"><span className="font-semibold text-gold-300">3.</span> Send and spread the Diwali joy!</li>
            </ol>
            <a href={state.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onClose} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1fa855] px-5 py-3 font-semibold text-white hover:bg-[#23b85e]">
              <ExternalLink className="h-4 w-4" /> Open WhatsApp
            </a>
          </>
        ) : (
          <>
            <p className="mb-5 text-sm text-cream-100/75">
              Tap below to open your phone’s share menu, then choose <strong>WhatsApp</strong> to send the card image.
            </p>
            <button
              type="button"
              onClick={() => {
                state.onShare();
              }}
              className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1fa855] px-5 py-3 font-semibold text-white hover:bg-[#23b85e]"
            >
              <Share2 className="h-4 w-4" /> Share card image
            </button>
            <button type="button" onClick={state.onFallback} className="w-full text-center text-sm text-gold-300 hover:text-gold-200">
              Download instead and open WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
};
