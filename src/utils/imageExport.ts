import { getFontEmbedCSS, toBlob } from 'html-to-image';
import type { CardDimensions } from '../types/card';

const fontCssCache = new Map<string, Promise<string>>();

const isWebKit = () =>
  typeof navigator !== 'undefined' && /AppleWebKit/i.test(navigator.userAgent) && !/Chrome|Chromium|CriOS|Edg|Android/i.test(navigator.userAgent);

/** Collect the font families actually used inside the card (cache key). */
const fontKey = (node: HTMLElement): string => {
  const set = new Set<string>();
  node.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (el instanceof HTMLElement) set.add(getComputedStyle(el).fontFamily);
  });
  return [...set].sort().join('|');
};

export const getFontCss = (node: HTMLElement): Promise<string> => {
  const key = fontKey(node);
  let cached = fontCssCache.get(key);
  if (!cached) {
    cached = getFontEmbedCSS(node).catch((err) => {
      fontCssCache.delete(key);
      throw err;
    });
    fontCssCache.set(key, cached);
  }
  return cached;
};

/**
 * Renders the card node to a PNG blob at its exact pixel dimensions.
 * Fonts (including Devanagari) are embedded so Hindi/Marathi text is preserved.
 */
export const exportCardToBlob = async (node: HTMLElement, dims: CardDimensions): Promise<Blob> => {
  if (document.fonts?.ready) await document.fonts.ready;
  const fontEmbedCSS = await getFontCss(node);
  const options = {
    width: dims.width,
    height: dims.height,
    canvasWidth: dims.width,
    canvasHeight: dims.height,
    pixelRatio: 1,
    fontEmbedCSS,
    cacheBust: false,
    style: { transform: 'none', margin: '0', left: '0', top: '0' },
  };
  // Pause background animations so the PNG gets their designed frozen frame.
  node.setAttribute('data-exporting', '');
  let blob: Blob | null;
  try {
    // Safari sometimes paints fonts/SVG only on the second pass.
    if (isWebKit()) await toBlob(node, options);
    blob = await toBlob(node, options);
  } finally {
    node.removeAttribute('data-exporting');
  }
  if (!blob || blob.size < 1000) throw new Error('The image could not be generated.');
  return blob;
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};
