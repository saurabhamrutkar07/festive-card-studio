import type { CSSProperties } from 'react';
import { CardRoot, FitText, Layer, OrnamentDivider, SenderBlock } from '../parts';
import { FONT_STACKS, resolveTypography, type ResolvedTypography } from '../typography';
import { Diya } from '../decor/lamps';
import { FloralCluster, MarigoldString, Toran } from '../decor/florals';
import { CornerFlourish, Mandala } from '../decor/patterns';
import { AartiThali, GiftBox, GoldCoin, Heart, Kalash, RiverWaves } from '../decor/occasionDecor';
import type { CardContent, TextStyleOptions } from '../../../types/card';
import type { TemplateProps } from './types';

/* ═════════════════════════════════════════════════════════════════════════
 * DIWALI PADWA & BHAUBIJ — personal templates.
 * Sizes are authored for portrait (1080×1350) and scaled by card height
 * (k = H / 1350) so square and landscape keep their proportions.
 * Each design = its own background + art, around a shared text column.
 * ═════════════════════════════════════════════════════════════════════════ */

export const useScale = ({ dims, format }: TemplateProps) => {
  const k = dims.height / 1350;
  const px = (n: number) => Math.round(n * k);
  return { px, L: format === 'landscape', sq: format === 'square' };
};

interface TextColumnProps {
  content: CardContent;
  style: TextStyleOptions;
  ty: ResolvedTypography;
  px: (n: number) => number;
  /** Insets of the text column inside the card (portrait px, scaled). */
  box: { top: number; bottom: number; left: number; right: number };
  heading: { font: string; color: string; max: number; height: number; weight?: number; italic?: boolean; shadow?: string };
  sub: { font: string; color: string; size: number; spacing?: number; upper?: boolean };
  divider?: string;
  messageMax: number;
  messageItalic?: boolean;
  sender: { introColor: string; introFont: string; introSize: number; nameFont: string; nameColor: string; nameMax: number; nameWeight?: number };
}

/** Heading → sub-heading → divider → message → signature, centred. */
export const TextColumn = ({ content, style, ty, px, box, heading, sub, divider, messageMax, messageItalic, sender }: TextColumnProps) => {
  const latin = content.language === 'en';
  const subStyle: CSSProperties = {
    fontFamily: sub.font,
    color: sub.color,
    fontSize: px(sub.size),
    letterSpacing: latin && sub.spacing ? px(sub.spacing) : 0,
    textTransform: latin && sub.upper ? 'uppercase' : 'none',
    flexShrink: 0,
    textAlign: 'center',
  };
  return (
    <div
      style={{
        position: 'absolute',
        top: px(box.top),
        bottom: px(box.bottom),
        left: px(box.left),
        right: px(box.right),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: px(14),
      }}
    >
      <div style={subStyle}>{content.subheading}</div>
      <FitText
        text={content.heading}
        max={px(heading.max)}
        min={px(heading.max * 0.45)}
        lineHeight={1.18}
        boxStyle={{ flex: 'none', height: px(heading.height) }}
        style={{
          fontFamily: heading.font,
          color: heading.color,
          fontWeight: heading.weight ?? 700,
          fontStyle: heading.italic ? 'italic' : 'normal',
          textShadow: heading.shadow,
          textAlign: 'center',
        }}
      />
      {divider && <OrnamentDivider color={divider} width={px(240)} />}
      <FitText
        text={content.message}
        max={Math.round(px(messageMax) * ty.scale)}
        min={px(20)}
        lineHeight={1.55}
        style={{ fontFamily: ty.font, color: ty.color, fontStyle: messageItalic && style.fontStyle === 'template' ? 'italic' : 'normal' }}
      />
      <SenderBlock
        intro={content.senderIntro}
        name={content.senderName}
        align={ty.senderAlign}
        nameMax={Math.round(px(sender.nameMax) * ty.scale)}
        introStyle={{ fontFamily: sender.introFont, fontSize: px(sender.introSize), color: style.textColor === 'template' ? sender.introColor : ty.color }}
        nameStyle={{ fontFamily: style.fontStyle === 'template' ? sender.nameFont : ty.font, color: style.textColor === 'template' ? sender.nameColor : ty.color, fontWeight: sender.nameWeight ?? 600 }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * PADWA 1 · SUVARNA — maroon & gold, aukshan thali, gold coins
 * ───────────────────────────────────────────────────────────────────────── */
export const SuvarnaPadwaCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W } = dims;
  const gold = '#e9b44c';
  const ty = resolveTypography(style, { font: 'garamond', color: '#fbe9c6', align: 'center' });
  const thaliW = px(L ? 300 : 380);
  const coinRow = L ? 15 : 9;
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 40%, #8a1a2b 0%, #5e0c1a 55%, #33050d 100%)">
      <Layer style={{ inset: 0, backgroundImage: 'radial-gradient(rgba(233,180,76,0.12) 1.6px, transparent 1.8px)', backgroundSize: `${px(32)}px ${px(32)}px` }} />
      <Layer style={{ inset: px(26), border: `${Math.max(2, px(4))}px solid ${gold}` }} />
      <Layer style={{ inset: px(40), border: `1px solid ${gold}88` }} />
      {/* scattered coins in the upper corners */}
      {[
        [90, 90, 70],
        [170, 150, 46],
        [W / (dims.height / 1350) - 160, 90, 70],
        [W / (dims.height / 1350) - 230, 150, 46],
      ].map(([x, y, s], i) => (
        <Layer key={i} style={{ left: px(x) - px(s) / 2, top: px(y) - px(s) / 2 }}>
          <GoldCoin size={px(s)} />
        </Layer>
      ))}
      <Layer style={{ top: px(64), left: (W - thaliW) / 2 }}>
        <AartiThali width={thaliW} />
      </Layer>
      {/* row of coins along the bottom */}
      <Layer style={{ left: px(70), right: px(70), bottom: px(56), display: 'flex', justifyContent: 'space-between' }}>
        {Array.from({ length: coinRow }, (_, i) => (
          <GoldCoin key={i} size={px(i % 2 ? 46 : 58)} />
        ))}
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: L ? 270 : 330, bottom: 150, left: L ? 380 : 110, right: L ? 380 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: gold, size: 26, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.decorative, color: '#f6cf6a', max: 104, height: 170, shadow: '0 3px 0 #5a2a06, 0 0 36px rgba(246,207,106,0.35)' }}
        divider={gold}
        messageMax={46}
        messageItalic
        sender={{ introColor: gold, introFont: FONT_STACKS.decorative, introSize: 24, nameFont: FONT_STACKS.script, nameColor: '#f6cf6a', nameMax: 56 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * PADWA 2 · OVALNI — blush pink, two diyas glowing towards each other
 * ───────────────────────────────────────────────────────────────────────── */
export const OvalniPadwaCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const rose = '#c2185b';
  const ty = resolveTypography(style, { font: 'serif', color: '#5a1a26', align: 'center' });
  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #fff3f1 0%, #fde1dd 55%, #f8c9c3 100%)">
      <Layer style={{ inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Mandala size={px(980)} color="rgba(194,24,91,0.08)" />
      </Layer>
      <Layer style={{ inset: px(30), border: `2px solid ${rose}55`, borderRadius: px(40) }} />
      <Layer style={{ top: px(-40), left: px(-40), transform: 'rotate(10deg)' }}>
        <FloralCluster size={px(320)} seed={4} />
      </Layer>
      <Layer style={{ top: px(-40), right: px(-40), transform: 'scaleX(-1) rotate(10deg)' }}>
        <FloralCluster size={px(320)} seed={9} />
      </Layer>
      {/* two diyas facing each other with a heart between */}
      <Layer style={{ left: 0, right: 0, bottom: px(60), display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: px(L ? 120 : 70) }}>
        <Diya size={px(150)} variant="painted" glow={0.75} style={{ transform: 'rotate(8deg)' }} />
        <Heart size={px(64)} color={rose} style={{ marginBottom: px(60) }} />
        <Diya size={px(150)} variant="painted" glow={0.75} style={{ transform: 'rotate(-8deg) scaleX(-1)' }} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 190, bottom: 260, left: L ? 360 : 120, right: L ? 360 : 120 }}
        sub={{ font: FONT_STACKS.serif, color: rose, size: 28, spacing: 3, upper: true }}
        heading={{ font: FONT_STACKS.script, color: '#8e1240', max: 118, height: 190, weight: 400 }}
        divider={`${rose}aa`}
        messageMax={44}
        sender={{ introColor: rose, introFont: FONT_STACKS.serif, introSize: 24, nameFont: FONT_STACKS.serif, nameColor: '#5a1a26', nameMax: 50 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * PADWA 3 · NAV VARSH — deep green & gold, kalash with mango leaves
 * ───────────────────────────────────────────────────────────────────────── */
export const NavVarshPadwaCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L, sq } = useScale(props);
  const { width: W } = dims;
  const gold = '#d4af37';
  const ty = resolveTypography(style, { font: 'garamond', color: '#f3ead2', align: 'center' });
  const toranW = W - px(80);
  const kalashW = px(L ? 170 : 200);
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 45%, #165c43 0%, #0f3d2e 55%, #072318 100%)">
      <Layer style={{ inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.12) 1.6px, transparent 1.8px)', backgroundSize: `${px(30)}px ${px(30)}px` }} />
      <Layer style={{ inset: px(24), border: `${Math.max(2, px(3))}px solid ${gold}` }} />
      <Layer style={{ top: px(28), left: px(40), width: toranW, overflow: 'hidden' }}>
        <Toran width={toranW} strings={L ? 30 : 11} maxLength={L || sq ? 2 : 3} />
      </Layer>
      <Layer style={{ left: px(36), bottom: px(36) }}>
        <CornerFlourish size={px(150)} color={gold} style={{ transform: 'rotate(270deg)' }} />
      </Layer>
      <Layer style={{ right: px(36), bottom: px(36) }}>
        <CornerFlourish size={px(150)} color={gold} style={{ transform: 'rotate(180deg)' }} />
      </Layer>
      <Layer style={{ bottom: px(44), left: (W - kalashW) / 2 }}>
        <Kalash width={kalashW} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: L ? 300 : sq ? 290 : 320, bottom: L ? 290 : 330, left: L ? 360 : 110, right: L ? 360 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: gold, size: 26, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.garamond, color: '#f6dd8e', max: 110, height: 160 }}
        divider={gold}
        messageMax={44}
        sender={{ introColor: gold, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.garamond, nameColor: '#f6dd8e', nameMax: 50 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * BHAUBIJ 1 · AUKSHAN — vermilion, marigold toran, aarti thali
 * ───────────────────────────────────────────────────────────────────────── */
export const AukshanBhaubijCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L, sq } = useScale(props);
  const { width: W } = dims;
  const gold = '#f6c453';
  const ty = resolveTypography(style, { font: 'garamond', color: '#fff1dc', align: 'center' });
  const toranW = W - px(60);
  const thaliW = px(L ? 340 : 420);
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 40%, #c0222d 0%, #8f1119 55%, #520a10 100%)">
      <Layer style={{ inset: px(22), border: `${Math.max(2, px(3))}px solid ${gold}aa`, borderRadius: px(18) }} />
      <Layer style={{ top: px(24), left: px(30), width: toranW, overflow: 'hidden' }}>
        <Toran width={toranW} strings={L ? 28 : 10} maxLength={L || sq ? 2 : 3} />
      </Layer>
      <Layer style={{ left: px(30), bottom: px(30) }}>
        <CornerFlourish size={px(140)} color={gold} style={{ transform: 'rotate(270deg)' }} />
      </Layer>
      <Layer style={{ right: px(30), bottom: px(30) }}>
        <CornerFlourish size={px(140)} color={gold} style={{ transform: 'rotate(180deg)' }} />
      </Layer>
      <Layer style={{ bottom: px(36), left: (W - thaliW) / 2 }}>
        <AartiThali width={thaliW} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: L ? 300 : sq ? 290 : 310, bottom: L ? 250 : 300, left: L ? 360 : 110, right: L ? 360 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: gold, size: 24, spacing: 5, upper: true }}
        heading={{ font: FONT_STACKS.yatra, color: '#ffd76a', max: 108, height: 170, weight: 400, shadow: '0 3px 0 #5e0c16' }}
        divider={gold}
        messageMax={44}
        sender={{ introColor: gold, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.script, nameColor: '#ffd76a', nameMax: 54 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * BHAUBIJ 2 · BHAU-BAHIN — peach & teal, marigold strings, gift box
 * ───────────────────────────────────────────────────────────────────────── */
export const BandhanBhaubijCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const teal = '#0f766e';
  const ty = resolveTypography(style, { font: 'sans', color: '#24414a', align: 'center' });
  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #fff6ee 0%, #ffe8d6 100%)">
      <Layer style={{ inset: 0, backgroundImage: 'radial-gradient(rgba(15,118,110,0.09) 2px, transparent 2.4px)', backgroundSize: `${px(36)}px ${px(36)}px` }} />
      <Layer style={{ inset: px(28), border: `${Math.max(2, px(3))}px dashed ${teal}66`, borderRadius: px(36) }} />
      {[0.04, 0.12].map((x, i) => (
        <Layer key={`l${i}`} style={{ top: 0, left: `${x * 100}%` }}>
          <MarigoldString height={px(i ? 360 : 520)} flowers={i ? 5 : 7} />
        </Layer>
      ))}
      {[0.04, 0.12].map((x, i) => (
        <Layer key={`r${i}`} style={{ top: 0, right: `${x * 100}%` }}>
          <MarigoldString height={px(i ? 360 : 520)} flowers={i ? 5 : 7} />
        </Layer>
      ))}
      <Layer style={{ left: px(70), bottom: px(56), display: 'flex', gap: px(14), alignItems: 'flex-end' }}>
        <Diya size={px(110)} variant="clay" glow={0.6} />
        <Diya size={px(84)} variant="gold" glow={0.6} />
      </Layer>
      <Layer style={{ right: px(70), bottom: px(56) }}>
        <GiftBox size={px(170)} box={teal} ribbon="#f6a313" />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 170, bottom: 250, left: L ? 420 : 200, right: L ? 420 : 200 }}
        sub={{ font: FONT_STACKS.sans, color: teal, size: 24, spacing: 4, upper: true }}
        heading={{ font: FONT_STACKS.yatra, color: '#c2410c', max: 104, height: 170, weight: 400 }}
        divider={`${teal}99`}
        messageMax={40}
        sender={{ introColor: teal, introFont: FONT_STACKS.sans, introSize: 22, nameFont: FONT_STACKS.yatra, nameColor: '#c2410c', nameMax: 50, nameWeight: 400 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * BHAUBIJ 3 · YAMUNA DEEP — twilight river with floating diyas
 * ───────────────────────────────────────────────────────────────────────── */
export const YamunaBhaubijCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W, height: H } = dims;
  const gold = '#f3c86b';
  const ty = resolveTypography(style, { font: 'garamond', color: '#f2ecff', align: 'center' });
  const riverH = Math.round(H * 0.3);
  // floating diyas: [x as share of width, y offset within river, size]
  const floats: [number, number, number][] = L
    ? [[0.12, 0.3, 90], [0.3, 0.55, 70], [0.5, 0.32, 100], [0.7, 0.58, 72], [0.88, 0.34, 88]]
    : [[0.16, 0.36, 96], [0.42, 0.62, 76], [0.66, 0.34, 104], [0.86, 0.6, 72]];
  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #120d33 0%, #2b1f5e 50%, #6b3f7a 78%, #a0577a 100%)">
      {/* stars */}
      {Array.from({ length: 40 }, (_, i) => {
        const x = ((i * 97) % 100) / 100;
        const y = ((i * 53) % 60) / 100;
        return <Layer key={i} style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: px(i % 3 ? 4 : 6), height: px(i % 3 ? 4 : 6), borderRadius: '50%', background: '#fff6d6', opacity: i % 2 ? 0.5 : 0.85 }} />;
      })}
      {/* moon glow */}
      <Layer style={{ right: px(L ? 160 : 60), top: px(34), width: px(120), height: px(120), borderRadius: '50%', background: 'radial-gradient(circle, #fff3c4 0%, #f3c86b 45%, rgba(243,200,107,0) 72%)' }} />
      <Layer style={{ left: 0, right: 0, bottom: 0, height: riverH }}>
        <RiverWaves width={W} height={riverH} colors={['#2d2670', '#221d58', '#16123f']} />
      </Layer>
      {floats.map(([x, y, s], i) => (
        <Layer key={i} style={{ left: x * W - px(s) / 2, bottom: riverH * (1 - y) - px(s) * 0.55 }}>
          <Diya size={px(s)} variant={i % 2 ? 'gold' : 'clay'} glow={0.8} />
        </Layer>
      ))}
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 170, bottom: Math.round((riverH / (H / 1350)) + 30), left: L ? 360 : 120, right: L ? 360 : 120 }}
        sub={{ font: FONT_STACKS.decorative, color: gold, size: 24, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.decorative, color: gold, max: 104, height: 170, shadow: '0 0 30px rgba(243,200,107,0.35)' }}
        divider={`${gold}cc`}
        messageMax={42}
        messageItalic
        sender={{ introColor: gold, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.script, nameColor: '#fff3c4', nameMax: 54 }}
      />
    </CardRoot>
  );
};
