import { useCallback, useState, type RefObject } from 'react';
import { CARD_DIMENSIONS } from '../data/templates';
import { exportCardToBlob } from '../utils/imageExport';
import { exportCardToGif, exportCardToVideo } from '../utils/videoExport';
import type { CardFormat } from '../types/card';

export type ExportKind = 'png' | 'gif' | 'mp4';
export type ExportPurpose = 'download' | 'share' | 'video' | 'still';

const MIME: Record<ExportKind, string> = { png: 'image/png', gif: 'image/gif', mp4: 'video/mp4' };

/** Wraps PNG / GIF / MP4 generation with loading, progress and error state. */
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
        if (kind === 'mp4') return await exportCardToVideo(node, dims, setProgress);
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
