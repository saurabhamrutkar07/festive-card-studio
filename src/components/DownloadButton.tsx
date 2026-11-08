import { Download, Loader2 } from 'lucide-react';

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  /** 0–1; shows a fill bar while long exports (animations) run. */
  progress?: number;
}

export const DownloadButton = ({ onClick, loading, disabled, label, loadingLabel, progress }: Props) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className="btn-gold relative w-full overflow-hidden text-base"
    aria-busy={loading}
  >
    {loading && progress !== undefined && (
      <span aria-hidden="true" className="absolute inset-y-0 left-0 bg-white/30 transition-[width]" style={{ width: `${Math.round(progress * 100)}%` }} />
    )}
    <span className="relative inline-flex items-center gap-2">
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
      {loading ? (loadingLabel ?? 'Creating your card…') : (label ?? 'Download Greeting Card')}
    </span>
  </button>
);
