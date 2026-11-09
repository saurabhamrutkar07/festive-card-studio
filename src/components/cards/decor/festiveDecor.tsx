import type { CSSProperties } from 'react';
import { useSvgId } from '../../../hooks/useSvgId';

/* ──────────────────────────────────────────────────────────────────────────
 * More festival art: akash kandil, Lakshmi footprints, phuljhadi, coin stack,
 * bahi-khata (chopda), tilak and a sweets plate.
 * ────────────────────────────────────────────────────────────────────────── */

/** Akash kandil: Maharashtrian star lantern hanging from a cord, with tassels. */
export const StarKandil = ({ size, cord = 60, body = '#ff6b35', accent = '#ffd166', style }: { size: number; cord?: number; body?: string; accent?: string; style?: CSSProperties }) => {
  const id = useSvgId('kandil');
  const h = 260 + cord;
  const star = (R: number, r: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 ? r : R;
      return `${100 + Math.cos(a) * rad},${110 + Math.sin(a) * rad}`;
    }).join(' ');
  return (
    <svg width={size} height={(size * h) / 200} viewBox={`0 ${-cord} 200 ${h}`} style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.85" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="100" y1={-cord} x2="100" y2="30" stroke="#c9a04a" strokeWidth="2" />
      <circle cx="100" cy="110" r="98" fill={`url(#${id}-glow)`} />
      <polygon points={star(88, 40)} fill={body} stroke={accent} strokeWidth="4" strokeLinejoin="round" />
      <polygon points={star(56, 26)} fill={accent} opacity="0.85" />
      <circle cx="100" cy="110" r="14" fill="#fff8e1" />
      {[-1, 1].map((d) => {
        const a = Math.PI / 2 + d * ((2 * Math.PI) / 5);
        const x = 100 + Math.cos(a) * 88;
        const y = 110 + Math.sin(a) * 88;
        return (
          <g key={d}>
            {[-6, 0, 6].map((o) => (
              <line key={o} x1={x + o * 0.5} y1={y} x2={x + o} y2={y + 44} stroke={accent} strokeWidth="3" strokeLinecap="round" />
            ))}
          </g>
        );
      })}
      {[-8, -3, 3, 8].map((o) => (
        <line key={o} x1={100 + o * 0.4} y1="198" x2={100 + o} y2="252" stroke={body} strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
};

/** Pair of Lakshmi footprints in kumkum with white dot work. */
export const LakshmiFeet = ({ size, color = '#c81d25', style }: { size: number; color?: string; style?: CSSProperties }) => {
  const toes: [number, number, number][] = [
    [-12, 4, 6],
    [-3, -2, 5],
    [5, -2, 4.4],
    [12, 2, 4],
    [17, 8, 3.4],
  ];
  const foot = (dx: number, flip: number) => (
    <g transform={`translate(${dx} 0) scale(${flip} 1)`}>
      <path d="M0 70 C-22 70 -24 40 -16 22 C-10 8 10 8 16 22 C24 40 22 70 0 70 Z" fill={color} />
      {toes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} />
      ))}
      {[28, 42, 56].map((y) => (
        <circle key={y} cx="0" cy={y} r="2.6" fill="#fff6e6" />
      ))}
    </g>
  );
  return (
    <svg width={size} height={size * 0.77} viewBox="-60 -14 120 92" style={{ display: 'block', ...style }} aria-hidden="true">
      {foot(-24, -1)}
      {foot(24, 1)}
    </svg>
  );
};

/** Phuljhadi (sparkler): a stick with a starburst of sparks at its tip. */
export const Phuljhadi = ({ length, angle = 0, spark = '#ffd166', style }: { length: number; angle?: number; spark?: string; style?: CSSProperties }) => {
  const id = useSvgId('phul');
  return (
    <svg width={length} height={length} viewBox="-100 -100 200 200" style={{ display: 'block', overflow: 'visible', transform: `rotate(${angle}deg)`, ...style }} aria-hidden="true">
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor={spark} stopOpacity="0.5" />
          <stop offset="100%" stopColor={spark} stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="0" y1="-40" x2="0" y2="100" stroke="#8d8d8d" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="-48" r="46" fill={`url(#${id})`} />
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2;
        const r1 = 10 + (i % 3) * 4;
        const r2 = 44 + (i % 4) * 9;
        return (
          <line
            key={i}
            x1={Math.cos(a) * r1}
            y1={-48 + Math.sin(a) * r1}
            x2={Math.cos(a) * r2}
            y2={-48 + Math.sin(a) * r2}
            stroke={i % 2 ? spark : '#fff6d6'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

/** Stack of gold coins, seen slightly from the side. */
export const CoinStack = ({ size, coins = 6, style }: { size: number; coins?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
    {Array.from({ length: coins }, (_, i) => {
      const y = 104 - i * 10;
      return (
        <g key={i} transform={`translate(${(i % 2) * 2} 0)`}>
          <rect x="18" y={y - 6} width="84" height="10" fill="#b8862e" />
          <ellipse cx="60" cy={y + 4} rx="42" ry="9" fill="#9a6a12" />
          <ellipse cx="60" cy={y - 6} rx="42" ry="9" fill="#f2c94c" />
          <ellipse cx="60" cy={y - 6} rx="30" ry="6" fill="none" stroke="#fff1bf" strokeWidth="1.6" />
        </g>
      );
    })}
  </svg>
);

/** Bahi-khata (red account book) for chopda pujan, marked "शुभ लाभ". Aspect 4:3. */
export const BahiKhata = ({ width, style }: { width: number; style?: CSSProperties }) => (
  <svg width={width} height={width * 0.75} viewBox="0 0 320 240" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
    <rect x="30" y="40" width="260" height="180" rx="10" fill="#7a0f16" />
    <rect x="24" y="30" width="260" height="180" rx="10" fill="#c1121f" />
    <rect x="24" y="30" width="26" height="180" rx="8" fill="#8f0d16" />
    <path d="M150 30 L150 210" stroke="#f6c453" strokeWidth="6" />
    <path d="M150 210 C140 228 130 232 120 236 M150 210 C160 228 170 232 180 236" stroke="#f6c453" strokeWidth="5" fill="none" strokeLinecap="round" />
    <rect x="80" y="74" width="160" height="92" rx="10" fill="#fff6dc" stroke="#f6c453" strokeWidth="4" />
    <text x="160" y="134" textAnchor="middle" fontFamily="'Noto Serif Devanagari', 'Yatra One', serif" fontSize="38" fontWeight="700" fill="#c1121f">
      शुभ लाभ
    </text>
    {[52, 70, 250, 268].map((x) => (
      <circle key={x} cx={x + 6} cy="196" r="5" fill="#f6c453" />
    ))}
  </svg>
);

/** Kumkum tilak with a haldi dot and scattered akshata (rice). */
export const Tilak = ({ size, style }: { size: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="-100 -100 200 200" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
    <path d="M0 -78 C18 -40 24 -6 18 30 C14 56 -14 56 -18 30 C-24 -6 -18 -40 0 -78 Z" fill="#c81d25" />
    <path d="M0 -50 C8 -24 10 2 7 24 C5 36 -5 36 -7 24 C-10 2 -8 -24 0 -50 Z" fill="#e63946" />
    <circle cx="0" cy="70" r="11" fill="#f4a300" />
    {Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2 + 0.2;
      const r = 62 + (i % 3) * 12;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r * 0.9;
      return <ellipse key={i} cx={x} cy={y} rx="5" ry="2.6" fill="#fff4dc" stroke="#e9dcc0" strokeWidth="0.8" transform={`rotate(${i * 37} ${x} ${y})`} />;
    })}
  </svg>
);

/** Brass plate of laddoos and kaju katli. Aspect 5:3. */
export const SweetsPlate = ({ width, style }: { width: number; style?: CSSProperties }) => {
  const id = useSvgId('sweets');
  const laddoos: [number, number][] = [
    [190, 168],
    [250, 168],
    [310, 168],
    [220, 128],
    [280, 128],
    [250, 90],
  ];
  return (
    <svg width={width} height={width * 0.6} viewBox="0 0 500 300" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-plate`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff1bf" />
          <stop offset="45%" stopColor="#e9b44c" />
          <stop offset="100%" stopColor="#8a5a14" />
        </radialGradient>
        <radialGradient id={`${id}-laddoo`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffd27a" />
          <stop offset="60%" stopColor="#f4a01c" />
          <stop offset="100%" stopColor="#b8650a" />
        </radialGradient>
      </defs>
      <ellipse cx="250" cy="234" rx="236" ry="56" fill="#6b4310" />
      <ellipse cx="250" cy="224" rx="236" ry="56" fill={`url(#${id}-plate)`} />
      <ellipse cx="250" cy="224" rx="206" ry="44" fill="none" stroke="#fff1bf" strokeWidth="3" opacity="0.7" />
      {[70, 110, 390, 430].map((x, i) => (
        <g key={x} transform={`translate(${x} ${214 - (i % 2) * 8})`}>
          <path d="M0 -22 L30 0 L0 22 L-30 0 Z" fill="#f3ead8" stroke="#cdbf9f" strokeWidth="2" />
          <path d="M0 -22 L30 0 L0 4 L-30 0 Z" fill="#ffffff" opacity="0.5" />
        </g>
      ))}
      {laddoos.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="36" fill={`url(#${id}-laddoo)`} />
          {Array.from({ length: 8 }, (_, k) => (
            <circle key={k} cx={x - 18 + ((k * 13) % 36)} cy={y - 16 + ((k * 7) % 30)} r="2.2" fill="#fff1c4" opacity="0.8" />
          ))}
        </g>
      ))}
      <ellipse cx="250" cy="66" rx="10" ry="5" fill="#2e7d32" />
    </svg>
  );
};
