import { Loader2, MessageCircle } from 'lucide-react';

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  loadingLabel?: string;
}

export const WhatsAppShareButton = ({ onClick, loading, disabled, loadingLabel }: Props) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    aria-busy={loading}
    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1fa855] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_30px_-10px_rgba(31,168,85,0.7)] transition hover:bg-[#23b85e] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
    {loading ? (loadingLabel ?? 'Preparing to share…') : 'Share on WhatsApp'}
  </button>
);
