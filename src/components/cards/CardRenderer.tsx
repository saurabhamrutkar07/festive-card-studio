import { forwardRef, memo, type ComponentType } from 'react';
import { CARD_DIMENSIONS, getTemplateById } from '../../data/templates';
import type { CardContent, CardFormat, FireworksLevel, LogoOptions, OccasionEffect, TemplateId, TextStyleOptions } from '../../types/card';
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
import {
  AukshanBhaubijCard,
  BandhanBhaubijCard,
  NavVarshPadwaCard,
  OvalniPadwaCard,
  SuvarnaPadwaCard,
  YamunaBhaubijCard,
} from './templates/occasionTemplates';
import {
  BhetBhaubijCard,
  ChopdaPadwaCard,
  KanchanPadwaCard,
  KandilCard,
  LakshmiPujanCard,
  MithaiBhaubijCard,
  PahatPadwaCard,
  PhuljhadiCard,
  TilakBhaubijCard,
} from './templates/moreOccasionTemplates';
import { OccasionEffects } from './decor/OccasionEffects';
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
  'padwa-suvarna': SuvarnaPadwaCard,
  'padwa-ovalni': OvalniPadwaCard,
  'padwa-navvarsh': NavVarshPadwaCard,
  'bhaubij-aukshan': AukshanBhaubijCard,
  'bhaubij-bandhan': BandhanBhaubijCard,
  'bhaubij-yamuna': YamunaBhaubijCard,
  'diwali-kandil': KandilCard,
  'diwali-lakshmi': LakshmiPujanCard,
  'diwali-phuljhadi': PhuljhadiCard,
  'padwa-kanchan': KanchanPadwaCard,
  'padwa-chopda': ChopdaPadwaCard,
  'padwa-pahat': PahatPadwaCard,
  'bhaubij-tilak': TilakBhaubijCard,
  'bhaubij-bhet': BhetBhaubijCard,
  'bhaubij-mithai': MithaiBhaubijCard,
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
  /** Occasion animation (Padwa petals, Bhaubij aarti glow), drawn with the fireworks. */
  effect?: OccasionEffect | null;
}

/**
 * Renders a card at its true export resolution. The ref points at the exact
 * node that is converted to PNG, so preview and download are identical.
 */
export const CardRenderer = memo(
  forwardRef<HTMLDivElement, CardRendererProps>(({ templateId, format, content, style, logo, fireworks = 'off', effect = null }, ref) => {
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
          <CardBackdropContext.Provider
            value={
              fireworks === 'off' && !effect ? null : (
                <>
                  {effect && <OccasionEffects dims={dims} kind={effect} />}
                  {fireworks !== 'off' && <Fireworks dims={dims} level={fireworks} />}
                </>
              )
            }
          >
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
