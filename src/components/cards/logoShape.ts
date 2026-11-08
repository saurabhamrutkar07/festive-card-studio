import type { CSSProperties } from 'react';
import type { LogoShape } from '../../types/card';

/**
 * How the uploaded logo is drawn:
 *  original — as uploaded, transparent areas kept, any aspect ratio
 *  circle / rounded / square — cropped to a square, then masked to the shape
 */
export const logoImgStyle = (shape: LogoShape, height: number, maxWidth: number): CSSProperties =>
  shape === 'original'
    ? { display: 'block', height, width: 'auto', maxWidth, objectFit: 'contain' }
    : {
        display: 'block',
        height,
        width: height,
        objectFit: 'cover',
        borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? Math.round(height * 0.18) : 0,
      };

/** Corner radius for a frame/badge around the logo, so it follows the logo's shape. */
export const logoFrameRadius = (shape: LogoShape, fallback: number | string): number | string =>
  shape === 'circle' ? '50%' : shape === 'square' ? 0 : fallback;
