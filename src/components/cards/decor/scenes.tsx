import type { CSSProperties } from 'react';
import { useSvgId } from '../../../hooks/useSvgId';
import { MarigoldShape } from './florals';

/* ──────────────────────────────────────────────────────────────────────────
 * String lights hanging in a catenary curve across the card.
 * ────────────────────────────────────────────────────────────────────────── */
export const StringLights = ({
  width,
  sag,
  bulbs,
  colors = ['#ffd166', '#ff6b6b', '#4ecdc4', '#ffffff', '#ff9f1c'],
  style,
}: {
  width: number;
  sag: number;
  bulbs: number;
  colors?: string[];
  style?: CSSProperties;
}) => {
  const id = useSvgId('sl');
  const h = sag + 40;
  const y = (t: number) => 10 + 4 * sag * t * (1 - t);
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        {colors.map((c, i) => (
          <radialGradient key={c} id={`${id}-${i}`}>
            <stop offset="0%" stopColor={c} stopOpacity="0.85" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      <path d={`M0 10 Q ${width / 2} ${10 + sag * 2} ${width} 10`} stroke="#3b2a1a" strokeWidth="2.5" fill="none" />
      {Array.from({ length: bulbs }, (_, i) => {
        const t = (i + 0.5) / bulbs;
        const x = t * width;
        const cy = y(t) + 12;
        const ci = i % colors.length;
        return (
          <g key={i}>
            <circle cx={x} cy={cy} r="22" fill={`url(#${id}-${ci})`} />
            <rect x={x - 3.5} y={cy - 14} width="7" height="6" rx="1.5" fill="#2a2018" />
            <ellipse cx={x} cy={cy} rx="6.5" ry="9" fill={colors[ci]} />
            <ellipse cx={x - 2} cy={cy - 3} rx="2" ry="3" fill="#fff" opacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Family home lit up for Diwali — windows aglow, diyas on steps, toran.
 * ────────────────────────────────────────────────────────────────────────── */
export const LitHouse = ({ width, style }: { width: number; style?: CSSProperties }) => {
  const id = useSvgId('house');
  const flame = (x: number, y: number, s = 1) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-12" r="22" fill={`url(#${id}-halo)`} />
      <path d="M0 -26 C 6 -16, 8 -10, 4 -4 C 2 -1, -2 -1, -4 -4 C -8 -10, -6 -16, 0 -26 Z" fill="#ffd36b" />
      <path d="M-14 -2 Q 0 3 14 -2 Q 11 10 0 11 Q -11 10 -14 -2 Z" fill="#c2621f" />
    </g>
  );
  return (
    <svg width={width} height={width * 0.6} viewBox="0 0 800 480" style={{ display: 'block', ...style }}>
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0%" stopColor="#ffcf6b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="100%" stopColor="#ffab40" />
        </linearGradient>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a2340" />
          <stop offset="100%" stopColor="#3a1430" />
        </linearGradient>
        <radialGradient id={`${id}-door`} cx="50%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#ffe3a0" />
          <stop offset="100%" stopColor="#f08a24" />
        </radialGradient>
      </defs>
      {/* ground glow */}
      <ellipse cx="400" cy="470" rx="420" ry="40" fill="#ffb347" opacity="0.25" />
      {/* side wing */}
      <rect x="560" y="230" width="180" height="210" fill={`url(#${id}-wall)`} />
      <path d="M545 236 L650 170 L755 236 Z" fill="#7a2a3a" />
      <rect x="610" y="290" width="80" height="80" rx="6" fill={`url(#${id}-win)`} />
      <path d="M650 290 V370 M610 330 H690" stroke="#5a2340" strokeWidth="5" />
      {/* main house */}
      <rect x="120" y="190" width="440" height="250" fill={`url(#${id}-wall)`} />
      <path d="M90 200 L340 60 L590 200 Z" fill="#8a2f42" />
      <path d="M90 200 L340 60 L590 200" stroke="#d4a03a" strokeWidth="5" fill="none" />
      {/* roof window */}
      <circle cx="340" cy="140" r="30" fill={`url(#${id}-win)`} />
      <path d="M340 110 V170 M310 140 H370" stroke="#8a2f42" strokeWidth="4" />
      {/* windows */}
      {[170, 430].map((x) => (
        <g key={x}>
          <path d={`M${x} 330 V270 Q ${x + 40} 230 ${x + 80} 270 V330 Z`} fill={`url(#${id}-win)`} />
          <path d={`M${x + 40} 245 V330 M${x} 290 H${x + 80}`} stroke="#5a2340" strokeWidth="5" />
          <rect x={x - 8} y={330} width={96} height={10} rx="3" fill="#d4a03a" />
          {flame(x + 20, 328, 0.8)}
          {flame(x + 60, 328, 0.8)}
        </g>
      ))}
      {/* door */}
      <path d="M290 440 V300 Q 340 250 390 300 V440 Z" fill={`url(#${id}-door)`} />
      <path d="M340 278 V440" stroke="#c2621f" strokeWidth="4" />
      {/* toran over door */}
      <path d="M280 300 Q 340 320 400 300" stroke="#2e7d32" strokeWidth="6" fill="none" />
      {[292, 316, 340, 364, 388].map((x, i) => (
        <MarigoldShape key={x} cx={x} cy={308 + (i === 2 ? 12 : i % 2 ? 9 : 2)} r={9} tone={i % 2 ? 'yellow' : 'orange'} />
      ))}
      {/* steps */}
      <rect x="270" y="440" width="140" height="14" fill="#6e3a2a" />
      <rect x="250" y="454" width="180" height="14" fill="#5a2e22" />
      {/* rangoli at door */}
      <g transform="translate(340 474)">
        <ellipse rx="92" ry="12" fill="#ff4f81" opacity="0.9" />
        <ellipse rx="64" ry="8" fill="#ffd166" />
        <ellipse rx="34" ry="5" fill="#2ec4b6" />
      </g>
      {/* diyas along the front */}
      {[150, 200, 250, 430, 480, 530, 600, 660, 720].map((x) => flame(x, 452, 1.1))}
      {/* hanging kandil from roof edge */}
      <line x1="140" y1="186" x2="140" y2="226" stroke="#d9b36a" strokeWidth="2" />
      <g transform="translate(140 252)">
        <circle r="34" fill={`url(#${id}-halo)`} />
        <path d="M0 -26 L8 -8 L26 -8 L12 4 L18 24 L0 12 L-18 24 L-12 4 L-26 -8 L-8 -8 Z" fill="#ff5c5c" />
        <path d="M0 -14 L4 -4 L14 -4 L6 2 L9 12 L0 6 L-9 12 L-6 2 L-14 -4 L-4 -4 Z" fill="#ffe39a" />
        <path d="M-6 22 V44 M0 22 V50 M6 22 V44" stroke="#ffd166" strokeWidth="3" />
      </g>
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Temple arch frame (cusped, mughal/temple style) sized to the card.
 * ────────────────────────────────────────────────────────────────────────── */
export const TempleArch = ({
  width,
  height,
  inset,
  stroke,
  fill,
}: {
  width: number;
  height: number;
  inset: number;
  stroke: string;
  fill: string;
}) => {
  const l = inset;
  const r = width - inset;
  const b = height - inset;
  const cx = width / 2;
  const springY = inset + Math.min(height * 0.32, (r - l) * 0.55);
  const apexY = inset;
  const path = (o: number) =>
    `M${l + o} ${b - o} V${springY + o} C ${l + o} ${springY - (springY - apexY) * 0.55 + o}, ${cx - (r - l) * 0.18} ${apexY + (springY - apexY) * 0.25 + o}, ${cx} ${apexY + o} C ${cx + (r - l) * 0.18} ${apexY + (springY - apexY) * 0.25 + o}, ${r - o} ${springY - (springY - apexY) * 0.55 + o}, ${r - o} ${springY + o} V${b - o} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0 }}>
      <path d={path(0)} fill={fill} stroke={stroke} strokeWidth="6" />
      <path d={path(18)} fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
      <path d={path(30)} fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="1.5" />
      {/* finial */}
      <g transform={`translate(${cx} ${apexY})`}>
        <circle r="16" fill={stroke} />
        <path d="M0 -44 C 8 -30, 10 -22, 0 -14 C -10 -22, -8 -30, 0 -44 Z" fill={stroke} />
      </g>
      {/* pillars */}
      {[l, r].map((x) => (
        <g key={x}>
          <rect x={x - 14} y={b - 70} width="28" height="70" fill={stroke} opacity="0.9" />
          <rect x={x - 22} y={b - 80} width="44" height="12" rx="4" fill={stroke} />
        </g>
      ))}
    </svg>
  );
};
