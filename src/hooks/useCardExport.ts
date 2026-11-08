import { useCallback, useState, type RefObject } from 'react';
import { CARD_DIMENSIONS } from '../data/templates';
import { exportCardToBlob } from '../utils/imageExport';
import type { CardFormat } from '../types/card';

/** Wraps PNG generation with loading + error state. */
export const useCardExport = (cardRef: RefObject<HTMLDivElement>, format: CardFormat) => {
  const [busy, setBusy] = useState<false | 'download' | 'share'>(false);

  const generate = useCallback(
    async (purpose: 'download' | 'share'): Promise<Blob> => {
      const node = cardRef.current;
      if (!node) throw new Error('Card preview is not ready yet.');
      setBusy(purpose);
      try {
        return await exportCardToBlob(node, CARD_DIMENSIONS[format]);
      } finally {
        setBusy(false);
      }
    },
    [cardRef, format],
  );

  return { busy, generate };
};
