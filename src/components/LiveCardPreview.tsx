import { forwardRef, useEffect, useState, type ReactNode } from 'react';
import { CARD_DIMENSIONS, getTemplateById } from '../data/templates';
import type { CardContent, CardFormat, FireworksLevel, LogoOptions, OccasionEffect, TemplateId, TextStyleOptions } from '../types/card';
import { CardRenderer } from './cards/CardRenderer';
import { ScaledCard } from './ScaledCard';

interface Props {
  templateId: TemplateId;
  format: CardFormat;
  content: CardContent;
  style: TextStyleOptions;
  logo?: LogoOptions;
  fireworks?: FireworksLevel;
  effect?: OccasionEffect | null;
  children?: ReactNode;
}

const useMaxPreviewHeight = () => {
  const get = () => (typeof window !== 'undefined' && window.innerWidth >= 1024 ? Math.max(420, window.innerHeight - 330) : undefined);
  const [h, setH] = useState(get);
  useEffect(() => {
    const onResize = () => setH(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return h;
};

export const LiveCardPreview = forwardRef<HTMLDivElement, Props>(({ templateId, format, content, style, logo, fireworks, effect, children }, ref) => {
  const maxHeight = useMaxPreviewHeight();
  const template = getTemplateById(templateId);
  const dims = CARD_DIMENSIONS[format];
  return (
    <div className="panel">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <h3 className="font-display text-lg font-semibold text-cream-50">Live preview</h3>
        </div>
        <span className="truncate text-xs text-cream-100/55">
          {template.name} · {dims.width}×{dims.height}
        </span>
      </div>
      <div className="rounded-xl bg-[repeating-conic-gradient(rgba(255,255,255,0.025)_0%_25%,transparent_0%_50%)] bg-[length:22px_22px] p-2 sm:p-3">
        <ScaledCard dims={dims} maxHeight={maxHeight} className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
          <CardRenderer ref={ref} templateId={templateId} format={format} content={content} style={style} logo={logo} fireworks={fireworks} effect={effect} />
        </ScaledCard>
      </div>
      {children}
    </div>
  );
});
LiveCardPreview.displayName = 'LiveCardPreview';
