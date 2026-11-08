import { createContext, useContext, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useFontsReady } from '../../hooks/useFontsReady';
import type { CardDimensions, LogoOptions } from '../../types/card';
import { logoFrameRadius, logoImgStyle } from './logoShape';

/** Business logo for the current card; SenderBlock draws it when placed at the signature. */
export const CardLogoContext = createContext<LogoOptions | null>(null);

/** Logo height relative to the sender name size, so it suits every template. */
const SIGNATURE_LOGO_SCALE = { sm: 1.5, md: 2, lg: 2.6 } as const;

/* ──────────────────────────────────────────────────────────────────────────
 * CardRoot — the exportable canvas. Always rendered at its real pixel size.
 * ────────────────────────────────────────────────────────────────────────── */
interface CardRootProps {
  dims: CardDimensions;
  background: string;
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Optional layer drawn directly above every template's background and below
 * its artwork and text (used for background effects such as fireworks).
 */
export const CardBackdropContext = createContext<ReactNode>(null);

export const CardRoot = ({ dims, background, children, style }: CardRootProps) => {
  const backdrop = useContext(CardBackdropContext);
  return (
  <div
    style={{
      width: dims.width,
      height: dims.height,
      position: 'relative',
      overflow: 'hidden',
      background,
      boxSizing: 'border-box',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      ...style,
    }}
  >
    {backdrop}
    {children}
  </div>
  );
};

/** Absolutely positioned layer helper. */
export const Layer = ({ style, children }: { style?: CSSProperties; children?: ReactNode }) => (
  <div style={{ position: 'absolute', pointerEvents: 'none', ...style }}>{children}</div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * FitText — shrinks the font size until the text fits its box.
 * Guarantees that long messages never overflow outside the card.
 * ────────────────────────────────────────────────────────────────────────── */
interface FitTextProps {
  text: string;
  max: number;
  min: number;
  lineHeight?: number;
  /** Style applied to the text element (font, colour, alignment …). */
  style?: CSSProperties;
  /** Style applied to the bounding box (size / flex). Defaults to flex: 1. */
  boxStyle?: CSSProperties;
  /** Vertical alignment of the text inside the box. */
  valign?: 'start' | 'center' | 'end';
}

export const FitText = ({ text, max, min, lineHeight = 1.5, style, boxStyle, valign = 'center' }: FitTextProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fontsVersion = useFontsReady();
  const styleKey = JSON.stringify(style ?? {});

  useLayoutEffect(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;
    const fits = () => el.scrollHeight <= box.clientHeight + 1 && el.scrollWidth <= box.clientWidth + 1;
    // Search all the way down to 8px so text can never overflow the card;
    // `min` is the designed floor and is reached first for normal lengths.
    let lo = Math.min(8, Math.floor(min));
    let hi = Math.ceil(max);
    let best = lo;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      el.style.fontSize = `${mid}px`;
      if (fits()) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    el.style.fontSize = `${best}px`;
  }, [text, max, min, lineHeight, styleKey, fontsVersion]);

  return (
    <div
      ref={boxRef}
      style={{
        flex: '1 1 0',
        minHeight: 0,
        minWidth: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: valign === 'start' ? 'flex-start' : valign === 'end' ? 'flex-end' : 'center',
        overflow: 'hidden',
        ...boxStyle,
      }}
    >
      <div
        ref={textRef}
        style={{
          fontSize: max,
          lineHeight,
          whiteSpace: 'pre-line',
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
          width: '100%',
          // breathing room so swashes and Devanagari matras are never clipped
          padding: '0.1em 0.06em',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * SenderBlock — "Happy Diwali Wishes From / Name & Family"
 * ────────────────────────────────────────────────────────────────────────── */
interface SenderBlockProps {
  intro: string;
  name: string;
  align: 'left' | 'center' | 'right';
  introStyle?: CSSProperties;
  nameStyle?: CSSProperties;
  nameMax: number;
  nameMin?: number;
  width?: CSSProperties['width'];
  gap?: number;
  before?: ReactNode;
}

export const SenderBlock = ({
  intro,
  name,
  align,
  introStyle,
  nameStyle,
  nameMax,
  nameMin = 22,
  width = '100%',
  gap = 6,
  before,
}: SenderBlockProps) => {
  const logo = useContext(CardLogoContext);
  const showLogo = !!logo?.src && logo.position === 'signature';
  const logoH = showLogo ? Math.round(nameMax * SIGNATURE_LOGO_SCALE[logo.size]) : 0;
  const accent = (nameStyle?.color as string | undefined) ?? 'currentColor';
  return (
  <div style={{ width, display: 'flex', flexDirection: 'column', gap, textAlign: align, flexShrink: 0 }}>
    {showLogo && (
      <div
        data-card-logo
        style={{
          alignSelf: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
          marginBottom: Math.round(nameMax * 0.25),
          padding: logo.backdrop ? Math.round(logoH * 0.12) : 0,
          borderRadius: logoFrameRadius(logo.shape, Math.round(logoH * 0.16)),
          background: logo.backdrop ? 'rgba(255,255,255,0.94)' : 'transparent',
          // A hairline in the template's own name colour ties the badge to the design.
          boxShadow: logo.backdrop ? `0 0 0 2px color-mix(in srgb, ${accent} 45%, transparent), 0 8px 24px rgba(0,0,0,0.18)` : 'none',
          lineHeight: 0,
        }}
      >
        <img src={logo.src!} alt="" style={logoImgStyle(logo.shape, logoH, 420)} />
      </div>
    )}
    {before}
    {intro && (
      <div style={{ lineHeight: 1.4, overflowWrap: 'anywhere', ...introStyle }}>{intro}</div>
    )}
    <FitText
      text={name}
      max={nameMax}
      min={nameMin}
      lineHeight={1.3}
      boxStyle={{ flex: 'none', height: Math.round(nameMax * 1.4 * 2) }}
      style={{ textAlign: align, ...nameStyle }}
      valign="start"
    />
  </div>
  );
};

/* Small ornamental divider: line – diamond – line */
export const OrnamentDivider = ({ color, width = 260, opacity = 1 }: { color: string; width?: number; opacity?: number }) => (
  <svg width={width} height={24} viewBox="0 0 260 24" style={{ display: 'block', opacity, flexShrink: 0 }}>
    <line x1="0" y1="12" x2="104" y2="12" stroke={color} strokeWidth="1.5" />
    <line x1="156" y1="12" x2="260" y2="12" stroke={color} strokeWidth="1.5" />
    <path d="M130 2 L140 12 L130 22 L120 12 Z" fill={color} />
    <circle cx="112" cy="12" r="3" fill={color} />
    <circle cx="148" cy="12" r="3" fill={color} />
  </svg>
);
