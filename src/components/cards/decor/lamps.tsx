import type { CSSProperties } from 'react';
import { useSvgId } from '../../../hooks/useSvgId';

/* ──────────────────────────────────────────────────────────────────────────
 * Diya — clay oil lamp with a layered flame and soft halo.
 * ────────────────────────────────────────────────────────────────────────── */
type DiyaVariant = 'clay' | 'gold' | 'brass' | 'painted';

const DIYA_COLORS: Record<DiyaVariant, { top: string; mid: string; bottom: string; rim: string; dots: string }> = {
  clay: { top: '#e08a3c', mid: '#b8541f', bottom: '#6e2a0e', rim: '#f6c779', dots: '#fde7b0' },
  gold: { top: '#ffe08a', mid: '#d4a03a', bottom: '#7a5310', rim: '#fff1bf', dots: '#fff7da' },
  brass: { top: '#f2c46b', mid: '#b88324', bottom: '#5c3d0b', rim: '#ffe3a1', dots: '#7a1424' },
  painted: { top: '#e2483d', mid: '#a8202a', bottom: '#5e0c16', rim: '#ffd166', dots: '#ffd166' },
};

interface DiyaProps {
  size: number;
  variant?: DiyaVariant;
  glow?: number;
  style?: CSSProperties;
}

export const Diya = ({ size, variant = 'clay', glow = 0.6, style }: DiyaProps) => {
  const id = useSvgId('diya');
  const c = DIYA_COLORS[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity={glow} />
          <stop offset="45%" stopColor="#ff9a3c" stopOpacity={glow * 0.35} />
          <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-flame`} cx="50%" cy="72%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fff2a8" />
          <stop offset="65%" stopColor="#ffb52e" />
          <stop offset="100%" stopColor="#f0560f" />
        </radialGradient>
        <linearGradient id={`${id}-bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.top} />
          <stop offset="55%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.bottom} />
        </linearGradient>
      </defs>
      {glow > 0 && <circle cx="100" cy="70" r="92" fill={`url(#${id}-halo)`} />}
      {/* flame */}
      <path d="M100 14 C114 40 126 60 118 82 C113 95 87 95 82 82 C74 60 86 40 100 14 Z" fill={`url(#${id}-flame)`} />
      <path d="M100 46 C106 60 110 70 106 82 C104 88 96 88 94 82 C90 70 94 60 100 46 Z" fill="#fffbe6" opacity="0.9" />
      <rect x="98" y="86" width="4" height="12" rx="2" fill="#3b1d0c" />
      {/* bowl */}
      <path d="M22 100 Q100 116 178 100 Q170 158 100 164 Q30 158 22 100 Z" fill={`url(#${id}-bowl)`} />
      <ellipse cx="100" cy="100" rx="78" ry="11" fill={c.rim} />
      <ellipse cx="100" cy="101" rx="64" ry="6.5" fill={c.mid} opacity="0.75" />
      {/* decorative band */}
      <path d="M38 122 Q100 136 162 122" stroke={c.dots} strokeWidth="2.5" fill="none" opacity="0.85" />
      {[52, 70, 88, 106, 124, 142].map((x, i) => (
        <circle key={x} cx={x + 3} cy={130 + (i === 0 || i === 5 ? -3 : i === 1 || i === 4 ? 0 : 1.5)} r="3.2" fill={c.dots} opacity="0.9" />
      ))}
      <path d="M56 146 Q100 156 144 146" stroke={c.dots} strokeWidth="1.6" fill="none" opacity="0.55" />
      {/* base */}
      <ellipse cx="100" cy="166" rx="34" ry="7" fill={c.bottom} />
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * LineDiya — minimalist stroke-only diya for modern layouts.
 * ────────────────────────────────────────────────────────────────────────── */
export const LineDiya = ({ size, color, flame = '#e8942c', style }: { size: number; color: string; flame?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block', ...style }}>
    <path d="M100 22 C113 46 122 62 115 80 C111 90 89 90 85 80 C78 62 87 46 100 22 Z" fill={flame} />
    <path d="M100 52 C104 62 107 70 104 79 C102 83 98 83 96 79 C93 70 96 62 100 52 Z" fill="#fff6dc" />
    <path d="M24 104 Q100 120 176 104 Q166 160 100 164 Q34 160 24 104 Z" fill="none" stroke={color} strokeWidth="5" strokeLinejoin="round" />
    <path d="M24 104 Q100 92 176 104" fill="none" stroke={color} strokeWidth="5" />
    <path d="M66 176 L134 176" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────────────────
 * Lantern — star-shaped "Akash Kandil" with paper streamers.
 * ────────────────────────────────────────────────────────────────────────── */
interface LanternProps {
  size: number;
  /** Length of the hanging cord in viewBox units (0–400). */
  cord?: number;
  colors?: [string, string, string];
  style?: CSSProperties;
}

const starPoints = (cx: number, cy: number, outer: number, inner: number, n: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / n) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

export const Lantern = ({ size, cord = 60, colors = ['#ff5c5c', '#ffd166', '#ff9f1c'], style }: LanternProps) => {
  const id = useSvgId('lan');
  const h = 300 + cord;
  return (
    <svg width={size} height={(size * h) / 200} viewBox={`0 ${-cord} 200 ${h}`} style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8d6" />
          <stop offset="45%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[0]} />
        </radialGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors[1]} stopOpacity="0.55" />
          <stop offset="100%" stopColor={colors[1]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="100" y1={-cord} x2="100" y2="22" stroke="#d9b36a" strokeWidth="2.5" />
      <circle cx="100" cy="110" r="105" fill={`url(#${id}-halo)`} />
      <polygon points={starPoints(100, 110, 88, 46, 5)} fill={colors[0]} stroke="#7a2a10" strokeOpacity="0.35" strokeWidth="2" />
      <polygon points={starPoints(100, 110, 74, 38, 5)} fill={`url(#${id}-g)`} />
      <polygon points={starPoints(100, 110, 30, 16, 5)} fill="#fffbe8" opacity="0.85" />
      {/* streamers */}
      {[-36, -18, 0, 18, 36].map((dx, i) => (
        <path
          key={dx}
          d={`M${100 + dx * 0.6} 168 C ${100 + dx} 200, ${100 + dx * 1.4} 225, ${100 + dx * 1.1} ${250 + (i % 2) * 22}`}
          stroke={i % 2 === 0 ? colors[2] : colors[1]}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <circle cx="100" cy="168" r="7" fill="#d9b36a" />
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Glow — a soft radial light spot (pure CSS, export-safe).
 * ────────────────────────────────────────────────────────────────────────── */
export const Glow = ({ size, color, opacity = 0.6, style }: { size: number; color: string; opacity?: number; style?: CSSProperties }) => (
  <div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
      opacity,
      pointerEvents: 'none',
      ...style,
    }}
  />
);
