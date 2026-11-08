import { forwardRef, memo, type ComponentType } from 'react';
import { CARD_DIMENSIONS } from '../../data/templates';
import type { CardContent, CardFormat, TemplateId, TextStyleOptions } from '../../types/card';
import { DeepmalaCard, GendaCard, RajwadaCard, ShuddhCard } from './templates/classicTemplates';
import { NoirCard, OmkarCard, RangoliCard, UtsavCard } from './templates/festiveTemplates';
import { AmavasyaCard, AuroraCard, MadhubaniCard, ParivarCard } from './templates/artisticTemplates';
import type { TemplateProps } from './templates/types';

const TEMPLATE_COMPONENTS: Record<TemplateId, ComponentType<TemplateProps>> = {
  deepmala: DeepmalaCard,
  rajwada: RajwadaCard,
  shuddh: ShuddhCard,
  genda: GendaCard,
  rangoli: RangoliCard,
  omkar: OmkarCard,
  noir: NoirCard,
  utsav: UtsavCard,
  madhubani: MadhubaniCard,
  aurora: AuroraCard,
  parivar: ParivarCard,
  amavasya: AmavasyaCard,
};

export interface CardRendererProps {
  templateId: TemplateId;
  format: CardFormat;
  content: CardContent;
  style: TextStyleOptions;
}

/**
 * Renders a card at its true export resolution. The ref points at the exact
 * node that is converted to PNG, so preview and download are identical.
 */
export const CardRenderer = memo(
  forwardRef<HTMLDivElement, CardRendererProps>(({ templateId, format, content, style }, ref) => {
    const dims = CARD_DIMENSIONS[format];
    const Template = TEMPLATE_COMPONENTS[templateId];
    return (
      <div
        ref={ref}
        data-card-root
        // Marathi is shaped with the Hindi language system: some display fonts
        // (e.g. Yatra One) lack conjunct rules under the Marathi tag.
        lang={content.language === 'mr' ? 'hi' : content.language}
        data-language={content.language}
        style={{ width: dims.width, height: dims.height, position: 'relative', overflow: 'hidden' }}
      >
        <Template content={content} format={format} style={style} dims={dims} />
      </div>
    );
  }),
);
CardRenderer.displayName = 'CardRenderer';
