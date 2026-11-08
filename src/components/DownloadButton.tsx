import { Download, Loader2 } from 'lucide-react';

export const DownloadButton = ({ onClick, loading, disabled }: { onClick: () => void; loading: boolean; disabled?: boolean }) => (
  <button type="button" onClick={onClick} disabled={disabled || loading} className="btn-gold w-full text-base" aria-busy={loading}>
    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
    {loading ? 'Creating your card…' : 'Download Greeting Card'}
  </button>
);
