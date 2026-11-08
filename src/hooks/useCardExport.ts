import { useCallback, useState, type RefObject } from 'react';
import { CARD_DIMENSIONS } from '../data/templates';
import { exportCardToBlob } from '../utils/imageExport';
import { exportCardToGif } from '../utils/animationExport';
import type { CardFormat } from '../types/card';

export type ExportKind = 'png' | 'gif';
export type ExportPurpose = 'download' | 'share' | 'still';

const MIME: Record<ExportKind, string> = { png: 'image/png', gif: 'image/gif' };

/** Wraps PNG / GIF generation with loading, progress and error state. */
export const useCardExport = (cardRef: RefObject<HTMLDivElement>, format: CardFormat) => {
  const [busy, setBusy] = useState<false | ExportPurpose>(false);
  const [progress, setProgress] = useState(0);

  const generate = useCallback(
    async (purpose: ExportPurpose, kind: ExportKind): Promise<Blob> => {
      const node = cardRef.current;
      if (!node) throw new Error('Card preview is not ready yet.');
      const dims = CARD_DIMENSIONS[format];
      setBusy(purpose);
      setProgress(0);
      try {
        if (kind === 'gif') return await exportCardToGif(node, dims, setProgress);
        return await exportCardToBlob(node, dims);
      } finally {
        setBusy(false);
      }
    },
    [cardRef, format],
  );

  return { busy, progress, generate };
};

export const exportMime = (kind: ExportKind) => MIME[kind];
