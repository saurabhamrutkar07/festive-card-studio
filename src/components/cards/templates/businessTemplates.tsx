import { useContext, type CSSProperties, type ReactNode } from 'react';
import { CardLogoContext, CardRoot, FitText, Layer } from '../parts';
import { FONT_STACKS, resolveTypography } from '../typography';
import type { BusinessContent, CardContent, ContactKind } from '../../../types/card';
import type { TemplateProps } from './types';
import { logoFrameRadius, logoImgStyle } from '../logoShape';

/* ═════════════════════════════════════════════════════════════════════════
 * BUSINESS TEMPLATES — the brand leads. Every design lays out the company's
 * logo (or a monogram of its initials), name, tagline and contact line.
 * Sizes are authored for portrait (1080×1350) and scale with card height,
 * so square and landscape keep the same proportions.
 * ═════════════════════════════════════════════════════════════════════════ */

const EMPTY_BUSINESS: BusinessContent = { name: '', tagline: '', contacts: [] };
const biz = (content: CardContent) => content.business ?? EMPTY_BUSINESS;

/** "Sharma Sweets" → "SS"; "Acme" → "AC". */
const initials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 'B';
  const letters = words.length > 1 ? [words[0], words[1]].map((w) => [...w][0]) : [...words[0]].slice(0, 2);
  return letters.join('').toUpperCase();
};

/** The uploaded logo, or a monogram badge when none is set. */
const BizLogo = ({
  name,
  size,
  ring,
  fill,
  ink,
  maxWidthRatio = 2.4,
}: {
  name: string;
  size: number;
  ring: string;
  fill: string;
  ink: string;
  /** Caps wide logos (width ÷ height); tighter in side-by-side signature rows. */
  maxWidthRatio?: number;
}) => {
  const logo = useContext(CardLogoContext);
  if (logo?.src) return <img src={logo.src} alt="" style={{ ...logoImgStyle(logo.shape, size, size * maxWidthRatio), flexShrink: 0 }} />;
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
      <circle cx="48" cy="48" r="46" fill={fill} />
      <circle cx="48" cy="48" r="39" fill="none" stroke={ring} strokeWidth="2" />
      <text x="48" y="59" textAnchor="middle" fontFamily={FONT_STACKS.decorative} fontSize="30" fontWeight="700" fill={ink}>
        {initials(name)}
      </text>
    </svg>
  );
};

/**
 * Frame radius around the logo. With no logo the monogram is round, so the
 * frame is round; otherwise it follows the chosen logo shape.
 */
const useFrameRadius = (fallback: number) => {
  const logo = useContext(CardLogoContext);
  return logo?.src ? logoFrameRadius(logo.shape, fallback) : '50%';
};

const ICON_PATHS: Record<ContactKind, ReactNode> = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </>
  ),
  address: (
    <>
      <path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

/** "📞 phone   🌐 website   📍 address" with stroke icons; wraps if long. */
const ContactLine = ({
  contacts,
  color,
  iconColor,
  fontSize,
  justify = 'center',
  stacked = false,
}: {
  contacts: BusinessContent['contacts'];
  color: string;
  iconColor: string;
  fontSize: number;
  justify?: CSSProperties['justifyContent'];
  stacked?: boolean;
}) => {
  if (!contacts.length) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: stacked ? 'column' : 'row',
        flexWrap: 'wrap',
        justifyContent: justify,
        alignItems: stacked ? (justify === 'flex-end' ? 'flex-end' : 'flex-start') : 'center',
        gap: stacked ? fontSize * 0.35 : `${fontSize * 0.4}px ${fontSize * 1.6}px`,
        fontFamily: FONT_STACKS.sans,
        fontSize,
        color,
        lineHeight: 1.3,
      }}
    >
      {contacts.map((c) => (
        <span key={c.kind} style={{ display: 'inline-flex', alignItems: 'center', gap: fontSize * 0.5, overflowWrap: 'anywhere' }}>
          <svg
            width={fontSize * 1.15}
            height={fontSize * 1.15}
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            {ICON_PATHS[c.kind]}
          </svg>
          {c.text}
        </span>
      ))}
    </div>
  );
};

const Diamond = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 0L12 6L6 12L0 6Z" fill={color} />
  </svg>
);

const RuleWithDiamond = ({ color, size, width = '100%' }: { color: string; size: number; width?: number | string }) => (
  <div style={{ width, display: 'flex', alignItems: 'center', gap: size, flexShrink: 0 }}>
    <div style={{ flexGrow: 1, height: 2, background: color }} />
    <Diamond color={color} size={size} />
    <div style={{ flexGrow: 1, height: 2, background: color }} />
  </div>
);

const Lamp = ({ size, flame, bowl }: { size: number; flame: string; bowl: string }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 44 40" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M22 3c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" fill={flame} />
    <path d="M4 23h36c-2 8-9 13-18 13S6 31 4 23z" fill={bowl} />
  </svg>
);

/** Shared scale: authored at portrait height; landscape gets a centred column. */
const useLayout = ({ dims, format }: TemplateProps) => {
  const k = dims.height / 1350;
  const px = (n: number) => Math.round(n * k);
  const L = format === 'landscape';
  return { k, px, L, colW: L ? 1240 : undefined };
};

/* ─────────────────────────────────────────────────────────────────────────
 * 1 · LETTERHEAD (Ivory & Gold / Navy & Gold)
 * ───────────────────────────────────────────────────────────────────────── */
interface LetterheadPalette {
  background: string;
  band?: string;
  frame: string;
  frameSoft: string;
  brand: string;
  heading: string;
  text: string;
  muted: string;
  kicker: string;
  monoFill: string;
  monoInk: string;
  fontDefault: 'garamond';
}

const LETTERHEAD_IVORY: LetterheadPalette = {
  background: '#faf6ee',
  frame: '#c9a24a',
  frameSoft: 'rgba(201,162,74,0.5)',
  brand: '#7a1424',
  heading: '#7a1424',
  text: '#3a2a20',
  muted: '#6b5440',
  kicker: '#9a7a2e',
  monoFill: '#7a1424',
  monoInk: '#e9b44c',
  fontDefault: 'garamond',
};

const LETTERHEAD_NAVY: LetterheadPalette = {
  background: '#111a3a',
  band: '#0b1230',
  frame: '#d4af37',
  frameSoft: 'rgba(212,175,55,0.45)',
  brand: '#e9c46a',
  heading: '#f3d27a',
  text: '#e4e7f2',
  muted: '#c5cae0',
  kicker: '#d4af37',
  monoFill: '#7a1424',
  monoInk: '#e9b44c',
  fontDefault: 'garamond',
};

const Letterhead = (props: TemplateProps & { p: LetterheadPalette }) => {
  const { content, style, dims, p } = props;
  const { px, colW } = useLayout(props);
  const b = biz(content);
  const ty = resolveTypography(style, { font: p.fontDefault, color: p.text, align: 'center' });
  return (
    <CardRoot dims={dims} background={p.background}>
      {p.band && <Layer style={{ left: 0, right: 0, top: 0, height: px(392), background: p.band }} />}
      <Layer style={{ inset: px(28), border: `${Math.max(2, px(4))}px solid ${p.frame}` }} />
      <Layer style={{ inset: px(42), border: `2px solid ${p.frameSoft}` }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          margin: '0 auto',
          width: colW,
          boxSizing: 'border-box',
          padding: `${px(88)}px ${px(112)}px ${px(78)}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <BizLogo name={b.name} size={px(156)} ring={p.monoInk} fill={p.monoFill} ink={p.monoInk} />
        <div style={{ marginTop: px(20), fontFamily: FONT_STACKS.decorative, fontWeight: 700, fontSize: px(40), letterSpacing: px(8), color: p.brand, textTransform: 'uppercase', flexShrink: 0 }}>
          {b.name}
        </div>
        {b.tagline && <div style={{ marginTop: px(4), fontFamily: FONT_STACKS.garamond, fontStyle: 'italic', fontSize: px(30), color: p.muted, flexShrink: 0 }}>{b.tagline}</div>}
        <div style={{ marginTop: px(36), width: '100%' }}>
          <RuleWithDiamond color={p.frame} size={px(22)} />
        </div>
        <div style={{ marginTop: px(48), fontFamily: FONT_STACKS.decorative, fontSize: px(26), letterSpacing: px(10), color: p.kicker, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={px(124)}
          min={px(60)}
          lineHeight={1.15}
          boxStyle={{ flex: 'none', width: '100%', height: px(160), marginTop: px(8) }}
          style={{ fontFamily: FONT_STACKS.garamond, fontWeight: 600, color: p.heading, textAlign: 'center' }}
        />
        <FitText
          text={content.message}
          max={Math.round(px(40) * ty.scale)}
          min={px(20)}
          lineHeight={1.55}
          boxStyle={{ flex: 1, width: '100%', marginTop: px(24) }}
          style={{ fontFamily: ty.font, color: ty.color, textAlign: 'center' }}
        />
        <div style={{ marginTop: px(24), fontFamily: FONT_STACKS.garamond, fontStyle: 'italic', fontSize: px(32), color: p.muted, flexShrink: 0 }}>{content.senderIntro}</div>
        <div style={{ marginTop: px(4), fontFamily: FONT_STACKS.garamond, fontWeight: 600, fontSize: px(44), color: p.heading, flexShrink: 0, overflowWrap: 'anywhere' }}>{content.senderName}</div>
        {b.contacts.length > 0 && (
          <>
            <div style={{ marginTop: px(26), width: '100%', height: 2, background: p.frameSoft, flexShrink: 0 }} />
            <div style={{ marginTop: px(20), width: '100%' }}>
              <ContactLine contacts={b.contacts} color={p.muted} iconColor={p.kicker} fontSize={px(22)} />
            </div>
          </>
        )}
      </div>
    </CardRoot>
  );
};

export const LetterheadIvoryCard = (props: TemplateProps) => <Letterhead {...props} p={LETTERHEAD_IVORY} />;
export const LetterheadNavyCard = (props: TemplateProps) => <Letterhead {...props} p={LETTERHEAD_NAVY} />;

/* ─────────────────────────────────────────────────────────────────────────
 * 2A · LOGO HERO — Marigold (shops & showrooms)
 * ───────────────────────────────────────────────────────────────────────── */
export const HeroMarigoldCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, colW } = useLayout(props);
  const b = biz(content);
  const ty = resolveTypography(style, { font: 'sans', color: '#5a2a12', align: 'center' });
  const footerH = px(140);
  const frameRadius = useFrameRadius(px(48));
  return (
    <CardRoot dims={dims} background="#fff3dc">
      <Layer
        style={{
          left: 0,
          right: 0,
          top: 0,
          height: px(52),
          backgroundColor: '#f08a1c',
          backgroundImage: `radial-gradient(circle at ${px(26)}px ${px(52)}px, #fff3dc ${px(18)}px, transparent ${px(19)}px)`,
          backgroundSize: `${px(52)}px ${px(52)}px`,
        }}
      />
      <Layer style={{ top: px(80), left: px(44), right: px(44), bottom: footerH + px(44), border: `${Math.max(2, px(4))}px dashed rgba(224,112,20,0.45)`, borderRadius: px(36) }} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: footerH,
          margin: '0 auto',
          width: colW,
          boxSizing: 'border-box',
          padding: `${px(128)}px ${px(104)}px ${px(72)}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ padding: px(20), borderRadius: frameRadius, background: '#ffffff', boxShadow: `0 0 0 ${px(8)}px #f6b23c, 0 ${px(20)}px ${px(60)}px rgba(180,80,10,0.25)`, flexShrink: 0, lineHeight: 0 }}>
          <BizLogo name={b.name} size={px(210)} ring="#e9b44c" fill="#7a1424" ink="#e9b44c" />
        </div>
        <div style={{ marginTop: px(32), fontFamily: FONT_STACKS.decorative, fontWeight: 700, fontSize: px(48), letterSpacing: px(6), color: '#7a1424', textTransform: 'uppercase', flexShrink: 0 }}>
          {b.name}
        </div>
        {b.tagline && <div style={{ marginTop: px(4), fontFamily: FONT_STACKS.sans, fontSize: px(26), color: '#8a4a1c', flexShrink: 0 }}>{b.tagline}</div>}
        <FitText
          text={content.heading}
          max={px(132)}
          min={px(64)}
          lineHeight={1.12}
          boxStyle={{ flex: 'none', width: '100%', height: px(160), marginTop: px(36) }}
          style={{ fontFamily: FONT_STACKS.yatra, color: '#c2410c', textAlign: 'center' }}
        />
        <FitText
          text={content.message}
          max={Math.round(px(34) * ty.scale)}
          min={px(18)}
          lineHeight={1.6}
          boxStyle={{ flex: 1, width: '100%', marginTop: px(20) }}
          style={{ fontFamily: ty.font, color: ty.color, textAlign: 'center' }}
        />
        <div style={{ marginTop: px(20), display: 'flex', gap: px(52), alignItems: 'flex-end', flexShrink: 0 }}>
          <Lamp size={px(80)} flame="#f59e0b" bowl="#c2410c" />
          <Lamp size={px(104)} flame="#f59e0b" bowl="#9a3412" />
          <Lamp size={px(80)} flame="#f59e0b" bowl="#c2410c" />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: footerH,
          boxSizing: 'border-box',
          padding: `0 ${px(60)}px`,
          background: '#7a1424',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: px(6),
        }}
      >
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: px(22), color: '#ffd9a0' }}>
          {content.senderIntro} <span style={{ fontWeight: 600, color: '#fff3dc' }}>{content.senderName}</span>
        </div>
        <ContactLine contacts={b.contacts} color="#fff3dc" iconColor="#f6b23c" fontSize={px(24)} />
      </div>
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * 2B · LOGO HERO — Midnight Premium
 * ───────────────────────────────────────────────────────────────────────── */
export const HeroMidnightCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, colW } = useLayout(props);
  const b = biz(content);
  const ty = resolveTypography(style, { font: 'garamond', color: '#ddd5c0', align: 'center' });
  const frameRadius = useFrameRadius(px(60));
  return (
    <CardRoot dims={dims} background="#0a0d1c">
      <Layer
        style={{
          left: '50%',
          top: px(300),
          width: px(760),
          height: px(760),
          marginLeft: -px(380),
          marginTop: -px(380),
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243,190,90,0.22) 0%, rgba(243,190,90,0) 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          margin: '0 auto',
          width: colW,
          boxSizing: 'border-box',
          padding: `${px(100)}px ${px(104)}px ${px(60)}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ padding: px(16), borderRadius: frameRadius, border: `2px solid rgba(243,210,122,0.55)`, flexShrink: 0, lineHeight: 0 }}>
          <BizLogo name={b.name} size={px(210)} ring="#e9b44c" fill="#7a1424" ink="#e9b44c" />
        </div>
        <div style={{ marginTop: px(28), fontFamily: FONT_STACKS.decorative, fontWeight: 700, fontSize: px(44), letterSpacing: px(10), color: '#f3d27a', textTransform: 'uppercase', flexShrink: 0 }}>
          {b.name}
        </div>
        {b.tagline && <div style={{ marginTop: px(6), fontFamily: FONT_STACKS.garamond, fontStyle: 'italic', fontSize: px(30), color: '#cfc6ae', flexShrink: 0 }}>{b.tagline}</div>}
        <div style={{ marginTop: px(36), fontFamily: FONT_STACKS.decorative, fontSize: px(24), letterSpacing: px(12), color: '#c9a24a', textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={px(128)}
          min={px(60)}
          lineHeight={1.12}
          boxStyle={{ flex: 'none', width: '100%', height: px(136), marginTop: px(8) }}
          style={{ fontFamily: FONT_STACKS.garamond, fontWeight: 600, fontStyle: 'italic', color: '#f8e3a8', textAlign: 'center' }}
        />
        <FitText
          text={content.message}
          max={Math.round(px(38) * ty.scale)}
          min={px(20)}
          lineHeight={1.55}
          boxStyle={{ flex: 1, width: '100%', marginTop: px(20) }}
          style={{ fontFamily: ty.font, color: ty.color, textAlign: 'center' }}
        />
        <div style={{ marginTop: px(16), fontFamily: FONT_STACKS.garamond, fontSize: px(30), color: '#cfc6ae', flexShrink: 0 }}>
          {content.senderIntro} <span style={{ fontWeight: 600, color: '#f3d27a' }}>{content.senderName}</span>
        </div>
        <div style={{ marginTop: px(18), display: 'flex', gap: px(36), alignItems: 'flex-end', flexShrink: 0 }}>
          {[46, 56, 68, 56, 46].map((s, i) => (
            <Lamp key={i} size={px(s)} flame="#ffc94a" bowl={['#b8862e', '#d4a03a', '#e9b44c', '#d4a03a', '#b8862e'][i]} />
          ))}
        </div>
        {b.contacts.length > 0 && (
          <>
            <div style={{ marginTop: px(22), width: '100%', height: 2, background: 'rgba(201,162,74,0.45)', flexShrink: 0 }} />
            <div style={{ marginTop: px(16), width: '100%' }}>
              <ContactLine contacts={b.contacts} color="#cfc6ae" iconColor="#c9a24a" fontSize={px(22)} />
            </div>
          </>
        )}
      </div>
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * 3A · SIGN-OFF — Royal Maroon
 * ───────────────────────────────────────────────────────────────────────── */
export const SignoffMaroonCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, colW } = useLayout(props);
  const b = biz(content);
  const ty = resolveTypography(style, { font: 'garamond', color: '#fbe9c6', align: 'center' });
  const gold = '#e9b44c';
  return (
    <CardRoot dims={dims} background="#4f0a16">
      <Layer style={{ inset: 0, backgroundImage: 'radial-gradient(rgba(233,180,76,0.10) 2.8px, transparent 3.2px)', backgroundSize: `${px(44)}px ${px(44)}px` }} />
      <Layer style={{ inset: px(32), border: `${Math.max(2, px(4))}px solid ${gold}` }} />
      <Layer style={{ inset: px(48), border: '2px solid rgba(233,180,76,0.45)' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          margin: '0 auto',
          width: colW,
          boxSizing: 'border-box',
          padding: `${px(116)}px ${px(112)}px ${px(88)}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Lamp size={px(128)} flame="#ffc94a" bowl="#d4a03a" />
        <div style={{ marginTop: px(36), fontFamily: FONT_STACKS.decorative, fontSize: px(26), letterSpacing: px(12), color: gold, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={px(104)}
          min={px(52)}
          lineHeight={1.12}
          boxStyle={{ flex: 'none', width: '100%', height: px(132), marginTop: px(14) }}
          style={{ fontFamily: FONT_STACKS.decorative, fontWeight: 700, color: '#f3d27a', textAlign: 'center' }}
        />
        <div style={{ marginTop: px(24) }}>
          <RuleWithDiamond color={gold} size={px(20)} width={px(440)} />
        </div>
        <FitText
          text={content.message}
          max={Math.round(px(42) * ty.scale)}
          min={px(20)}
          lineHeight={1.55}
          boxStyle={{ flex: 1, width: '100%', marginTop: px(36) }}
          style={{ fontFamily: ty.font, color: ty.color, fontStyle: style.fontStyle === 'template' ? 'italic' : 'normal', textAlign: 'center' }}
        />
        <div style={{ marginTop: px(32), width: '100%', height: 2, background: 'rgba(233,180,76,0.5)', flexShrink: 0 }} />
        <div style={{ marginTop: px(36), width: '100%', display: 'flex', alignItems: 'center', gap: px(36), textAlign: 'left', flexShrink: 0 }}>
          <BizLogo name={b.name} size={px(148)} ring="#7a1424" fill="#fbe9c6" ink="#7a1424" maxWidthRatio={1.6} />
          <div style={{ width: 2, alignSelf: 'stretch', background: 'rgba(233,180,76,0.5)', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: px(6), minWidth: 0 }}>
            <div style={{ fontFamily: FONT_STACKS.garamond, fontStyle: 'italic', fontSize: px(26), color: '#e8cfa0' }}>{content.senderIntro}</div>
            <div style={{ fontFamily: FONT_STACKS.decorative, fontSize: px(38), fontWeight: 700, letterSpacing: px(4), color: '#f3d27a', textTransform: 'uppercase', overflowWrap: 'anywhere' }}>
              {content.senderName}
            </div>
            {b.tagline && <div style={{ fontFamily: FONT_STACKS.garamond, fontStyle: 'italic', fontSize: px(28), color: '#e8cfa0' }}>{b.tagline}</div>}
            <div style={{ marginTop: px(8) }}>
              <ContactLine contacts={b.contacts} color="#f0dcb4" iconColor={gold} fontSize={px(21)} justify="flex-start" />
            </div>
          </div>
        </div>
      </div>
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * 3B · SIGN-OFF — Corporate Minimal
 * ───────────────────────────────────────────────────────────────────────── */
export const SignoffMinimalCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useLayout(props);
  const b = biz(content);
  const ty = resolveTypography(style, { font: 'sans', color: '#3d4452', align: 'left' });
  const accent = '#c8862a';
  return (
    <CardRoot dims={dims} background="#ffffff">
      <Layer style={{ left: 0, top: 0, bottom: 0, width: px(20), background: accent }} />
      <Layer style={{ right: px(88), top: px(96) }}>
        <svg width={px(240)} height={px(220)} viewBox="0 0 44 40" fill="none" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 4c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" />
          <path d="M4 24h36c-2 8-9 12-18 12S6 32 4 24z" />
          <path d="M8 24c1-2 2-3 4-3h20c2 0 3 1 4 3" />
        </svg>
      </Layer>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxSizing: 'border-box',
          padding: `${px(128)}px ${L ? px(200) : px(112)}px ${px(88)}px ${L ? px(160) : px(124)}px`,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}
      >
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: px(24), fontWeight: 600, letterSpacing: px(8), color: '#9a5b12', textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={px(116)}
          min={px(56)}
          lineHeight={1.05}
          valign="start"
          boxStyle={{ flex: 'none', width: L ? '60%' : '72%', height: px(260), marginTop: px(24) }}
          style={{ fontFamily: FONT_STACKS.serif, fontWeight: 600, color: '#1f2430', textAlign: 'left' }}
        />
        <div style={{ marginTop: px(20), width: px(112), height: px(6), background: accent, flexShrink: 0 }} />
        <FitText
          text={content.message}
          max={Math.round(px(32) * ty.scale)}
          min={px(18)}
          lineHeight={1.75}
          valign="start"
          boxStyle={{ flex: 1, width: L ? '70%' : '82%', marginTop: px(44) }}
          style={{ fontFamily: ty.font, color: ty.color, textAlign: 'left' }}
        />
        <div style={{ marginTop: px(32), width: '100%', height: 2, background: '#e6e2da', flexShrink: 0 }} />
        {/* Logo | name block, with the contact line under the name (a third column squeezed long names). */}
        <div style={{ marginTop: px(40), display: 'flex', alignItems: 'center', gap: px(32), flexShrink: 0 }}>
          <BizLogo name={b.name} size={px(128)} ring="#e9b44c" fill="#7a1424" ink="#e9b44c" maxWidthRatio={1.8} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: px(4), minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: FONT_STACKS.sans, fontSize: px(22), color: '#5c6372' }}>{content.senderIntro}</div>
            <div style={{ fontFamily: FONT_STACKS.sans, fontSize: px(36), fontWeight: 600, color: '#1f2430', overflowWrap: 'anywhere' }}>{content.senderName}</div>
            {b.tagline && <div style={{ fontFamily: FONT_STACKS.sans, fontSize: px(24), color: '#5c6372' }}>{b.tagline}</div>}
            {b.contacts.length > 0 && (
              <div style={{ marginTop: px(10) }}>
                <ContactLine contacts={b.contacts} color="#5c6372" iconColor={accent} fontSize={px(21)} justify="flex-start" />
              </div>
            )}
          </div>
        </div>
      </div>
    </CardRoot>
  );
};
