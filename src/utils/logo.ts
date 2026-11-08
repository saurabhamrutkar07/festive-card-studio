const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
export const LOGO_ACCEPT = ACCEPTED.join(',');
const MAX_FILE_BYTES = 5 * 1024 * 1024;
/** Longest side of the stored logo. Enough for crisp output on a 1920px card. */
const MAX_SIDE = 600;

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('This image could not be read. Try a PNG or JPG file.'));
    img.src = url;
  });

/**
 * Validates an uploaded logo and re-encodes it as a downscaled PNG data URL.
 * Re-encoding keeps transparency, strips metadata, keeps storage small and
 * gives html-to-image a plain raster it can embed reliably.
 */
export const prepareLogo = async (file: File): Promise<string> => {
  if (!ACCEPTED.includes(file.type)) throw new Error('Please upload a PNG, JPG, WEBP or SVG image.');
  if (file.size > MAX_FILE_BYTES) throw new Error('That file is larger than 5 MB. Please choose a smaller logo.');

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    // SVGs without width/height report 0 — fall back to a square canvas.
    const w0 = img.naturalWidth || MAX_SIDE;
    const h0 = img.naturalHeight || MAX_SIDE;
    const scale = Math.min(1, MAX_SIDE / Math.max(w0, h0));
    const w = Math.max(1, Math.round(w0 * scale));
    const h = Math.max(1, Math.round(h0 * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Your browser could not process this image.');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
};
