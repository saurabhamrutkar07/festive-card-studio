import { forwardRef, memo, type ComponentType } from 'react';
import { CARD_DIMENSIONS, getTemplateById } from '../../data/templates';
import type { CardContent, CardFormat, FireworksLevel, LogoOptions, TemplateId, TextStyleOptions } from '../../types/card';
import { LogoOverlay } from './LogoOverlay';
import { CardBackdropContext, CardLogoContext } from './parts';
import { Fireworks } from './decor/Fireworks';
import { DeepmalaCard, GendaCard, RajwadaCard, ShuddhCard } from './templates/classicTemplates';
import { NoirCard, OmkarCard, RangoliCard, UtsavCard } from './templates/festiveTemplates';
import { AmavasyaCard, AuroraCard, MadhubaniCard, ParivarCard } from './templates/artisticTemplates';
import {
  HeroMarigoldCard,
  HeroMidnightCard,
  LetterheadIvoryCard,
  LetterheadNavyCard,
  SignoffMaroonCard,
  SignoffMinimalCard,
} from './templates/businessTemplates';
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
  'biz-letterhead-ivory': LetterheadIvoryCard,
  'biz-letterhead-navy': LetterheadNavyCard,
  'biz-hero-marigold': HeroMarigoldCard,
  'biz-hero-midnight': HeroMidnightCard,
  'biz-signoff-maroon': SignoffMaroonCard,
  'biz-signoff-minimal': SignoffMinimalCard,
};

export interface CardRendererProps {
  templateId: TemplateId;
  format: CardFormat;
  content: CardContent;
  style: TextStyleOptions;
  /** Optional business logo, drawn above the template. */
  logo?: LogoOptions;
  /** Animated fireworks behind the artwork (frozen frame in the PNG). */
  fireworks?: FireworksLevel;
}

/**
 * Renders a card at its true export resolution. The ref points at the exact
 * node that is converted to PNG, so preview and download are identical.
 */
export const CardRenderer = memo(
  forwardRef<HTMLDivElement, CardRendererProps>(({ templateId, format, content, style, logo, fireworks = 'off' }, ref) => {
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
        <CardLogoContext.Provider value={logo ?? null}>
          <CardBackdropContext.Provider value={fireworks === 'off' ? null : <Fireworks dims={dims} level={fireworks} />}>
            <Template content={content} format={format} style={style} dims={dims} />
          </CardBackdropContext.Provider>
        </CardLogoContext.Provider>
        {/* Business designs place the logo themselves. */}
        {logo && logo.position !== 'signature' && getTemplateById(templateId).mode === 'personal' && <LogoOverlay logo={logo} dims={dims} />}
      </div>
    );
  }),
);
CardRenderer.displayName = 'CardRenderer';
