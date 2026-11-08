import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import type { CardDimensions } from '../types/card';

interface ScaledCardProps {
  dims: CardDimensions;
  /** Upper bound for the rendered height in CSS px. */
  maxHeight?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Displays a full-resolution card scaled down to fit its container.
 * The card itself keeps its real pixel size (important for export).
 */
export const ScaledCard = ({ dims, maxHeight, className, children }: ScaledCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = width ? Math.min(width / dims.width, maxHeight ? maxHeight / dims.height : Infinity) : 0;
  const w = dims.width * scale;
  const h = dims.height * scale;

  return (
    <div ref={ref} className={className} style={{ width: '100%' }}>
      <div style={{ width: w, height: h, margin: '0 auto', position: 'relative', overflow: 'hidden', visibility: scale ? 'visible' : 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, transform: `scale(${scale || 0.0001})`, transformOrigin: 'top left' }}>{children}</div>
      </div>
    </div>
  );
};
