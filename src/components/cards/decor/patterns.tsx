import type { CSSProperties } from 'react';
import { useSvgId } from '../../../hooks/useSvgId';
import { seededRandom } from '../../../utils/seededRandom';

const ring = (n: number) => Array.from({ length: n }, (_, i) => (360 / n) * i);

/* ──────────────────────────────────────────────────────────────────────────
 * Rangoli — multi-layer radial floor art.
 * ────────────────────────────────────────────────────────────────────────── */
interface RangoliProps {
  size: number;
  palette?: string[];
  style?: CSSProperties;
}

export const Rangoli = ({
  size,
  palette = ['#ff4f81', '#ffb703', '#2ec4b6', '#8338ec', '#fb5607', '#ffffff'],
  style,
}: RangoliProps) => {
  const [a, b, c, d, e, w] = palette;
  return (
    <svg width={size} height={size} viewBox="-210 -210 420 420" style={{ display: 'block', ...style }}>
      {/* outer dot halo */}
      {ring(48).map((ang) => (
        <circle key={`o${ang}`} cx="0" cy="-200" r="5" fill={w} opacity="0.85" transform={`rotate(${ang})`} />
      ))}
      {/* outer petals */}
      {ring(16).map((ang) => (
        <path key={`p${ang}`} d="M0 -188 C 30 -160, 26 -120, 0 -100 C -26 -120, -30 -160, 0 -188 Z" fill={a} transform={`rotate(${ang})`} />
      ))}
      {ring(16).map((ang) => (
        <path
          key={`pi${ang}`}
          d="M0 -170 C 14 -152, 12 -128, 0 -116 C -12 -128, -14 -152, 0 -170 Z"
          fill={b}
          transform={`rotate(${ang})`}
        />
      ))}
      {/* scallop ring */}
      <circle r="112" fill={c} />
      {ring(24).map((ang) => (
        <circle key={`s${ang}`} cx="0" cy="-112" r="15" fill={c} transform={`rotate(${ang})`} />
      ))}
      <circle r="104" fill="none" stroke={w} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      {/* leaf star */}
      <circle r="92" fill={d} />
      {ring(8).map((ang) => (
        <path key={`l${ang}`} d="M0 -92 C 34 -60, 34 -30, 0 -12 C -34 -30, -34 -60, 0 -92 Z" fill={e} transform={`rotate(${ang})`} />
      ))}
      {ring(8).map((ang) => (
        <path key={`li${ang}`} d="M0 -78 C 14 -60, 14 -40, 0 -28 C -14 -40, -14 -60, 0 -78 Z" fill={b} transform={`rotate(${ang})`} />
      ))}
      {ring(8).map((ang) => (
        <circle key={`d${ang}`} cx="0" cy="-70" r="5" fill={w} transform={`rotate(${ang + 22.5})`} />
      ))}
      {/* core */}
      <circle r="30" fill={a} />
      {ring(12).map((ang) => (
        <ellipse key={`c${ang}`} cx="0" cy="-22" rx="6" ry="11" fill={b} transform={`rotate(${ang})`} />
      ))}
      <circle r="11" fill={w} />
      <circle r="5" fill={a} />
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Mandala — line art, single colour. Used as watermark or medallion.
 * ────────────────────────────────────────────────────────────────────────── */
export const Mandala = ({ size, color, strokeWidth = 1.6, style }: { size: number; color: string; strokeWidth?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="-210 -210 420 420" style={{ display: 'block', ...style }} fill="none" stroke={color} strokeWidth={strokeWidth}>
    <circle r="205" />
    <circle r="196" strokeDasharray="1 7" strokeLinecap="round" strokeWidth={strokeWidth * 2} />
    {ring(32).map((a) => (
      <path key={`a${a}`} d="M0 -190 Q 18 -170 0 -150 Q -18 -170 0 -190 Z" transform={`rotate(${a})`} />
    ))}
    <circle r="150" />
    {ring(16).map((a) => (
      <path key={`b${a}`} d="M0 -150 C 40 -120, 30 -80, 0 -70 C -30 -80, -40 -120, 0 -150 Z" transform={`rotate(${a})`} />
    ))}
    {ring(16).map((a) => (
      <path key={`bi${a}`} d="M0 -136 C 20 -116, 16 -92, 0 -84 C -16 -92, -20 -116, 0 -136 Z" transform={`rotate(${a})`} />
    ))}
    <circle r="70" />
    <circle r="62" strokeDasharray="2 6" />
    {ring(12).map((a) => (
      <path key={`c${a}`} d="M0 -62 C 18 -44, 14 -26, 0 -20 C -14 -26, -18 -44, 0 -62 Z" transform={`rotate(${a})`} />
    ))}
    <circle r="20" />
    <circle r="8" fill={color} />
  </svg>
);

/* ──────────────────────────────────────────────────────────────────────────
 * Firework burst.
 * ────────────────────────────────────────────────────────────────────────── */
export const Firework = ({ size, colors, rays = 22, style }: { size: number; colors: [string, string]; rays?: number; style?: CSSProperties }) => {
  const id = useSvgId('fw');
  return (
    <svg width={size} height={size} viewBox="-110 -110 220 220" style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        <radialGradient id={`${id}-c`}>
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="36" fill={`url(#${id}-c)`} />
      {ring(rays).map((a, i) => {
        const long = i % 2 === 0;
        const r1 = long ? 22 : 30;
        const r2 = long ? 96 : 70;
        return (
          <g key={a} transform={`rotate(${a})`}>
            <line x1="0" y1={-r1} x2="0" y2={-r2} stroke={long ? colors[0] : colors[1]} strokeWidth={long ? 3.2 : 2.4} strokeLinecap="round" />
            <circle cx="0" cy={-r2 - 7} r={long ? 3.6 : 2.6} fill={long ? colors[1] : colors[0]} />
          </g>
        );
      })}
      {ring(rays).map((a) => (
        <circle key={`d${a}`} cx="0" cy="-48" r="1.8" fill="#fff" opacity="0.9" transform={`rotate(${a + 360 / rays / 2})`} />
      ))}
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Scene-wide effects (sized to the card).
 * ────────────────────────────────────────────────────────────────────────── */
export const Sparkles = ({
  width,
  height,
  count,
  color,
  seed = 7,
  maxSize = 18,
  area,
}: {
  width: number;
  height: number;
  count: number;
  color: string;
  seed?: number;
  maxSize?: number;
  /** restrict to a vertical band (fractions of height) */
  area?: [number, number];
}) => {
  const rnd = seededRandom(seed);
  const [y0, y1] = area ?? [0, 1];
  const stars = Array.from({ length: count }, () => ({
    x: rnd() * width,
    y: (y0 + rnd() * (y1 - y0)) * height,
    s: 4 + rnd() * maxSize,
    o: 0.35 + rnd() * 0.65,
  }));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((st, i) =>
        i % 3 === 0 ? (
          <path
            key={i}
            d={`M${st.x} ${st.y - st.s} Q${st.x} ${st.y} ${st.x + st.s} ${st.y} Q${st.x} ${st.y} ${st.x} ${st.y + st.s} Q${st.x} ${st.y} ${st.x - st.s} ${st.y} Q${st.x} ${st.y} ${st.x} ${st.y - st.s} Z`}
            fill={color}
            opacity={st.o}
          />
        ) : (
          <circle key={i} cx={st.x} cy={st.y} r={st.s / 7} fill={color} opacity={st.o * 0.8} />
        ),
      )}
    </svg>
  );
};

export const Bokeh = ({
  width,
  height,
  count,
  colors,
  seed = 11,
}: {
  width: number;
  height: number;
  count: number;
  colors: string[];
  seed?: number;
}) => {
  const id = useSvgId('bk');
  const rnd = seededRandom(seed);
  const dots = Array.from({ length: count }, (_, i) => ({
    x: rnd() * width,
    y: rnd() * height,
    r: 14 + rnd() * 70,
    c: i % colors.length,
    o: 0.12 + rnd() * 0.35,
  }));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        {colors.map((c, i) => (
          <radialGradient key={c} id={`${id}-${i}`}>
            <stop offset="0%" stopColor={c} stopOpacity="1" />
            <stop offset="70%" stopColor={c} stopOpacity="0.5" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={`url(#${id}-${d.c})`} opacity={d.o} />
      ))}
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Ornate gold corner flourish (top-left orientation; mirror with CSS).
 * ────────────────────────────────────────────────────────────────────────── */
export const CornerFlourish = ({ size, color, style }: { size: number; color: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 220 220" style={{ display: 'block', ...style }} fill="none" stroke={color} strokeLinecap="round">
    <path d="M10 210 L10 40 Q10 10 40 10 L210 10" strokeWidth="4" />
    <path d="M24 210 L24 52 Q24 24 52 24 L210 24" strokeWidth="1.5" />
    <path d="M40 120 C 40 70, 70 40, 120 40" strokeWidth="2.5" />
    <path d="M52 52 C 80 40, 100 60, 86 80 C 76 94, 56 86, 62 72 C 66 64, 76 66, 76 72" strokeWidth="2.5" />
    <path d="M120 40 C 140 40, 150 54, 142 64 C 136 72, 124 68, 128 60" strokeWidth="2" />
    <path d="M40 120 C 40 140, 54 150, 64 142 C 72 136, 68 124, 60 128" strokeWidth="2" />
    <path d="M36 36 L 60 60" strokeWidth="2" />
    <circle cx="36" cy="36" r="7" fill={color} stroke="none" />
    <circle cx="160" cy="24" r="3.5" fill={color} stroke="none" />
    <circle cx="24" cy="160" r="3.5" fill={color} stroke="none" />
    <path d="M176 10 Q 186 0 196 10 Q 186 20 176 10 Z" fill={color} stroke="none" />
    <path d="M10 176 Q 0 186 10 196 Q 20 186 10 176 Z" fill={color} stroke="none" />
  </svg>
);

/* Art-deco sunburst fan. */
export const DecoFan = ({ size, color, style }: { size: number; color: string; style?: CSSProperties }) => (
  <svg width={size} height={size / 2} viewBox="-200 -200 400 200" style={{ display: 'block', ...style }} fill="none" stroke={color}>
    {[190, 160, 130].map((r, i) => (
      <path key={r} d={`M${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} strokeWidth={i === 0 ? 3 : 1.2} />
    ))}
    {Array.from({ length: 19 }, (_, i) => {
      const a = Math.PI + (Math.PI / 18) * i;
      return (
        <line key={i} x1={Math.cos(a) * 40} y1={Math.sin(a) * 40} x2={Math.cos(a) * 128} y2={Math.sin(a) * 128} strokeWidth={i % 3 === 0 ? 2.2 : 1} />
      );
    })}
    <path d="M-40 0 A 40 40 0 0 1 40 0 Z" fill={color} fillOpacity="0.9" stroke="none" />
  </svg>
);

/* Sunburst rays, centred. */
export const Rays = ({ size, color, count = 36, opacity = 0.35, style }: { size: number; color: string; count?: number; opacity?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="-100 -100 200 200" style={{ display: 'block', opacity, ...style }}>
    {ring(count).map((a) => (
      <path key={a} d="M-2.4 -100 L2.4 -100 L0 -20 Z" fill={color} transform={`rotate(${a})`} />
    ))}
  </svg>
);

/* ──────────────────────────────────────────────────────────────────────────
 * Madhubani folk-art frame: patterned border band with fish & leaf motifs.
 * ────────────────────────────────────────────────────────────────────────── */
export const MadhubaniFrame = ({ width, height, band }: { width: number; height: number; band: number }) => {
  const id = useSvgId('mdb');
  const ink = '#2b1408';
  const tile = band;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id={`${id}-tile`} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <rect width={tile} height={tile} fill="#b5452a" />
          <g transform={`scale(${tile / 100})`}>
            {/* fish */}
            <path d="M18 50 C 30 30, 62 30, 74 50 C 62 70, 30 70, 18 50 Z" fill="#f6c453" stroke={ink} strokeWidth="2.5" />
            <path d="M74 50 L 90 36 L 88 50 L 90 64 Z" fill="#2f7d5b" stroke={ink} strokeWidth="2.5" />
            <circle cx="30" cy="47" r="3.5" fill={ink} />
            <path d="M40 38 L 44 62 M 50 36 L 54 64 M 60 38 L 63 62" stroke={ink} strokeWidth="1.6" />
            {/* leaves */}
            <path d="M6 10 C 18 4, 28 10, 30 20 C 18 22, 8 18, 6 10 Z" fill="#2f7d5b" stroke={ink} strokeWidth="1.6" />
            <path d="M94 90 C 82 96, 72 90, 70 80 C 82 78, 92 82, 94 90 Z" fill="#2f7d5b" stroke={ink} strokeWidth="1.6" />
            <circle cx="88" cy="12" r="4" fill="#f6e3b4" stroke={ink} strokeWidth="1.4" />
            <circle cx="12" cy="88" r="4" fill="#f6e3b4" stroke={ink} strokeWidth="1.4" />
          </g>
        </pattern>
        <pattern id={`${id}-zig`} width="24" height="16" patternUnits="userSpaceOnUse">
          <rect width="24" height="16" fill="#f6e3b4" />
          <path d="M0 16 L12 2 L24 16 Z" fill="#8a1c0c" />
        </pattern>
      </defs>
      {/* band */}
      <path
        fillRule="evenodd"
        d={`M0 0 H${width} V${height} H0 Z M${band} ${band} V${height - band} H${width - band} V${band} Z`}
        fill={`url(#${id}-tile)`}
      />
      {/* zigzag trim inside band */}
      <path
        fillRule="evenodd"
        d={`M${band} ${band} H${width - band} V${height - band} H${band} Z M${band + 16} ${band + 16} V${height - band - 16} H${width - band - 16} V${band + 16} Z`}
        fill={`url(#${id}-zig)`}
      />
      <rect x={10} y={10} width={width - 20} height={height - 20} fill="none" stroke={ink} strokeWidth="5" />
      <rect x={band} y={band} width={width - band * 2} height={height - band * 2} fill="none" stroke={ink} strokeWidth="4" />
      <rect x={band + 16} y={band + 16} width={width - band * 2 - 32} height={height - band * 2 - 32} fill="none" stroke={ink} strokeWidth="3" />
      {/* corner lotuses */}
      {[
        [band / 2, band / 2],
        [width - band / 2, band / 2],
        [band / 2, height - band / 2],
        [width - band / 2, height - band / 2],
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <circle r={band * 0.46} fill="#f6e3b4" stroke={ink} strokeWidth="3" />
          {ring(8).map((a) => (
            <ellipse key={a} cx="0" cy={-band * 0.24} rx={band * 0.09} ry={band * 0.17} fill="#e2483d" stroke={ink} strokeWidth="2" transform={`rotate(${a})`} />
          ))}
          <circle r={band * 0.09} fill="#f6c453" stroke={ink} strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
};

/* Folk-art fish (matsya), facing right. */
export const FolkFish = ({ width, flip = false, style }: { width: number; flip?: boolean; style?: CSSProperties }) => {
  const ink = '#2b1408';
  return (
    <svg width={width} height={width * 0.55} viewBox="0 0 200 110" style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined, ...style }}>
      <path d="M10 55 C 40 5, 130 5, 160 55 C 130 105, 40 105, 10 55 Z" fill="#f6c453" stroke={ink} strokeWidth="4" />
      <path d="M160 55 L 196 22 L 186 55 L 196 88 Z" fill="#e2483d" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 55 C 60 40, 110 40, 140 55 C 110 70, 60 70, 40 55 Z" fill="#2f7d5b" stroke={ink} strokeWidth="3" />
      {[62, 82, 102, 122].map((x) => (
        <path key={x} d={`M${x} 30 Q ${x + 8} 55 ${x} 80`} stroke={ink} strokeWidth="2.2" fill="none" />
      ))}
      <circle cx="30" cy="48" r="9" fill="#fff" stroke={ink} strokeWidth="3" />
      <circle cx="30" cy="48" r="4" fill={ink} />
      <path d="M70 12 Q 90 0 110 12" stroke={ink} strokeWidth="3" fill="#e2483d" />
      <path d="M70 98 Q 90 110 110 98" stroke={ink} strokeWidth="3" fill="#e2483d" />
    </svg>
  );
};

/* Dotted border made of coloured dots (rangoli style). */
export const DotBorder = ({ width, height, inset, colors, gap = 26 }: { width: number; height: number; inset: number; colors: string[]; gap?: number }) => {
  const dots: { x: number; y: number }[] = [];
  const w = width - inset * 2;
  const h = height - inset * 2;
  const nx = Math.floor(w / gap);
  const ny = Math.floor(h / gap);
  for (let i = 0; i <= nx; i++) {
    dots.push({ x: inset + (w / nx) * i, y: inset });
    dots.push({ x: inset + (w / nx) * i, y: height - inset });
  }
  for (let j = 1; j < ny; j++) {
    dots.push({ x: inset, y: inset + (h / ny) * j });
    dots.push({ x: width - inset, y: inset + (h / ny) * j });
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0 }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={i % 4 === 0 ? 6 : 4} fill={colors[i % colors.length]} />
      ))}
    </svg>
  );
};
