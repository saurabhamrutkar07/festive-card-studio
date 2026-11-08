import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export interface ToastMessage {
  id: number;
  kind: 'success' | 'error' | 'info';
  text: string;
}

export const Toast = ({ toast, onDismiss }: { toast: ToastMessage | null; onDismiss: () => void }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, toast.kind === 'error' ? 7000 : 4500);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);
  if (!toast) return null;
  const Icon = toast.kind === 'error' ? AlertCircle : CheckCircle2;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4" aria-live="polite">
      <div
        key={toast.id}
        role={toast.kind === 'error' ? 'alert' : 'status'}
        className={`pointer-events-auto flex max-w-md animate-fade-in items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-2xl ${
          toast.kind === 'error' ? 'border-red-400/40 bg-[#3a0d12] text-red-100' : 'border-gold-400/30 bg-maroon-900 text-cream-50'
        }`}
      >
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${toast.kind === 'error' ? 'text-red-300' : 'text-emerald-300'}`} />
        <span className="flex-1">{toast.text}</span>
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="text-cream-100/50 hover:text-cream-50">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
