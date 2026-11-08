export const buildWhatsAppUrl = (text: string): string => `https://wa.me/?text=${encodeURIComponent(text)}`;

export const isMobileDevice = (): boolean =>
  typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

/** True only if this browser can share actual image files via the Web Share API. */
export const canShareImageFile = (file: File): boolean => {
  try {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
};

export type ShareResult = 'shared' | 'cancelled' | 'needs-gesture' | 'unsupported';

/** Opens the native share sheet with the card image (user chooses WhatsApp). */
export const shareImageFile = async (file: File, text: string, title: string): Promise<ShareResult> => {
  if (!canShareImageFile(file)) return 'unsupported';
  try {
    await navigator.share({ files: [file], text, title });
    return 'shared';
  } catch (err) {
    const name = (err as DOMException)?.name;
    if (name === 'AbortError') return 'cancelled';
    // Transient user activation can expire while the image is being generated.
    if (name === 'NotAllowedError') return 'needs-gesture';
    return 'unsupported';
  }
};
