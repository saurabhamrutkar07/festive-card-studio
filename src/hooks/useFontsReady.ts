import { useEffect, useState } from 'react';

/**
 * Returns a counter that increments whenever web fonts finish loading,
 * so text-fitting logic can re-measure with the real font metrics.
 */
export const useFontsReady = (): number => {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) return;
    let cancelled = false;
    const bump = () => !cancelled && setVersion((v) => v + 1);
    document.fonts.ready.then(bump);
    document.fonts.addEventListener('loadingdone', bump);
    return () => {
      cancelled = true;
      document.fonts.removeEventListener('loadingdone', bump);
    };
  }, []);
  return version;
};
