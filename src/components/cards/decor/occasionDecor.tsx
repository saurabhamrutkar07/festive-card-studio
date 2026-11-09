import type { CSSProperties } from 'react';
import { useSvgId } from '../../../hooks/useSvgId';
import { MarigoldShape } from './florals';

/* ──────────────────────────────────────────────────────────────────────────
 * Art for Diwali Padwa and Bhaubij: the aukshan / aarti thali, gold coins,
 * a kalash with mango leaves, a gift box and river waves.
 * Drawn as SVG so it stays crisp at export size.
 * ────────────────────────────────────────────────────────────────────────── */

/** Aarti thali: brass plate with a lit diya, kumkum, rice and marigolds. Aspect 5:3. */
export const AartiThali = ({ width, style }: { width: number; style?: CSSProperties }) => {
  const id = useSvgId('thali');
  return (
    <svg width={width} height={width * 0.6} viewBox="0 0 500 300" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-plate`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff1bf" />
          <stop offset="45%" stopColor="#e9b44c" />
          <stop offset="100%" stopColor="#8a5a14" />
        </radialGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ff8a1c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-flame`} cx="50%" cy="72%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#fff2a8" />
          <stop offset="70%" stopColor="#ffb52e" />
          <stop offset="100%" stopColor="#f0560f" />
        </radialGradient>
      </defs>
      {/* halo */}
      <ellipse cx="250" cy="96" rx="150" ry="110" fill={`url(#${id}-halo)`} />
      {/* plate */}
      <ellipse cx="250" cy="214" rx="236" ry="74" fill="#6b4310" />
      <ellipse cx="250" cy="204" rx="236" ry="74" fill={`url(#${id}-plate)`} />
      <ellipse cx="250" cy="204" rx="206" ry="58" fill="none" stroke="#fff1bf" strokeWidth="3" opacity="0.7" />
      {Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return <circle key={i} cx={250 + Math.cos(a) * 220} cy={204 + Math.sin(a) * 66} r="3.4" fill="#fff6d6" opacity="0.8" />;
      })}
      {/* kumkum and rice bowls */}
      <ellipse cx="140" cy="200" rx="40" ry="16" fill="#7a1424" />
      <ellipse cx="140" cy="194" rx="34" ry="11" fill="#d1162b" />
      <ellipse cx="360" cy="200" rx="40" ry="16" fill="#8a6a2a" />
      <ellipse cx="360" cy="194" rx="34" ry="11" fill="#fff7e6" />
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={342 + (i % 5) * 9} cy={190 + Math.floor(i / 5) * 6} rx="3" ry="1.6" fill="#e9dcc0" />
      ))}
      {/* marigolds */}
      <MarigoldShape cx={92} cy={226} r={20} tone="orange" />
      <MarigoldShape cx={408} cy={226} r={20} tone="yellow" />
      <MarigoldShape cx={196} cy={244} r={16} tone="yellow" />
      <MarigoldShape cx={304} cy={244} r={16} tone="orange" />
      {/* diya */}
      <path d="M190 180 Q250 196 310 180 Q304 224 250 228 Q196 224 190 180 Z" fill="#b8541f" />
      <ellipse cx="250" cy="180" rx="60" ry="9" fill="#f6c779" />
      <path d="M250 70 C266 102 278 124 268 148 C262 162 238 162 232 148 C222 124 234 102 250 70 Z" fill={`url(#${id}-flame)`} />
      <path d="M250 108 C256 122 260 132 256 144 C254 150 246 150 244 144 C240 132 244 122 250 108 Z" fill="#fffbe6" opacity="0.9" />
      <rect x="248" y="152" width="4" height="22" rx="2" fill="#3b1d0c" />
    </svg>
  );
};

/** Gold coin with an embossed rim and lotus mark. */
export const GoldCoin = ({ size, style }: { size: number; style?: CSSProperties }) => {
  const id = useSvgId('coin');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', ...style }} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fff4c2" />
          <stop offset="50%" stopColor="#e9b44c" />
          <stop offset="100%" stopColor="#9a6a12" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="#8a5a10" />
      <circle cx="50" cy="48" r="46" fill={`url(#${id})`} />
      <circle cx="50" cy="48" r="37" fill="none" stroke="#fff1bf" strokeWidth="2" opacity="0.8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="50" cy="38" rx="6" ry="13" fill="#b8862e" opacity="0.85" transform={`rotate(${(i - 2) * 30} 50 54)`} />
      ))}
    </svg>
  );
};

/** Kalash (copper pot) with mango leaves and a coconut. Aspect 3:4. */
export const Kalash = ({ width, style }: { width: number; style?: CSSProperties }) => {
  const id = useSvgId('kalash');
  return (
    <svg width={width} height={width * 1.33} viewBox="0 0 300 400" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-pot`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a3b10" />
          <stop offset="40%" stopColor="#e39a4a" />
          <stop offset="60%" stopColor="#f6c27a" />
          <stop offset="100%" stopColor="#6b300c" />
        </linearGradient>
        <radialGradient id={`${id}-coco`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#c8954f" />
          <stop offset="100%" stopColor="#5e3a14" />
        </radialGradient>
      </defs>
      {/* mango leaves fan */}
      {[-60, -36, -12, 12, 36, 60].map((a, i) => (
        <path
          key={a}
          d="M150 150 C132 104 136 60 150 26 C164 60 168 104 150 150 Z"
          fill={i % 2 ? '#2e7d32' : '#43a047'}
          stroke="#1b5e20"
          strokeWidth="2"
          transform={`rotate(${a} 150 150)`}
        />
      ))}
      {/* coconut */}
      <ellipse cx="150" cy="118" rx="44" ry="50" fill={`url(#${id}-coco)`} />
      <path d="M150 70 C140 86 140 104 150 118" stroke="#3b230a" strokeWidth="3" fill="none" opacity="0.6" />
      {/* neck + pot */}
      <rect x="104" y="158" width="92" height="26" rx="8" fill="#b8661f" />
      <path d="M96 184 C40 220 40 340 150 360 C260 340 260 220 204 184 Z" fill={`url(#${id}-pot)`} />
      {/* band of dots and a kumkum mark */}
      <path d="M72 250 Q150 276 228 250" stroke="#fff1bf" strokeWidth="5" fill="none" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={84 + i * 16.5} cy={266 + Math.sin((i / 8) * Math.PI) * 7} r="4" fill="#fff1bf" />
      ))}
      <circle cx="150" cy="300" r="12" fill="#d1162b" />
      <ellipse cx="150" cy="364" rx="70" ry="10" fill="#4a2208" opacity="0.6" />
    </svg>
  );
};

/** Gift box with a ribbon bow. */
export const GiftBox = ({ size, box = '#0f766e', ribbon = '#f6c453', style }: { size: number; box?: string; ribbon?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true">
    <rect x="30" y="86" width="140" height="100" rx="8" fill={box} />
    <rect x="22" y="64" width="156" height="34" rx="8" fill={box} />
    <rect x="22" y="64" width="156" height="34" rx="8" fill="#ffffff" opacity="0.12" />
    <rect x="90" y="64" width="20" height="122" fill={ribbon} />
    <path d="M100 64 C70 20 30 40 60 62 Z" fill={ribbon} />
    <path d="M100 64 C130 20 170 40 140 62 Z" fill={ribbon} />
    <circle cx="100" cy="62" r="10" fill={ribbon} />
    <path d="M100 64 C64 24 40 44 62 60" stroke="#00000022" strokeWidth="3" fill="none" />
  </svg>
);

/** Gentle river waves (full width), for the Yamuna scene. */
export const RiverWaves = ({ width, height, colors, style }: { width: number; height: number; colors: [string, string, string]; style?: CSSProperties }) => (
  <svg width={width} height={height} viewBox="0 0 1000 300" preserveAspectRatio="none" style={{ display: 'block', ...style }} aria-hidden="true">
    <path d="M0 60 C120 30 240 90 360 60 C480 30 600 90 720 60 C840 30 920 80 1000 60 L1000 300 L0 300 Z" fill={colors[0]} />
    <path d="M0 130 C140 100 260 160 400 130 C540 100 660 160 800 130 C900 108 960 140 1000 130 L1000 300 L0 300 Z" fill={colors[1]} />
    <path d="M0 210 C160 180 300 240 460 210 C620 180 760 240 1000 205 L1000 300 L0 300 Z" fill={colors[2]} />
  </svg>
);

/** Small heart outline. */
export const Heart = ({ size, color, style }: { size: number; color: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', ...style }} aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.2 1.7-2 3.2-3.2 5.3-3.2 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z" fill={color} />
  </svg>
);
