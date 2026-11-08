import type { CSSProperties } from 'react';
import { seededRandom } from '../../../utils/seededRandom';

/* ──────────────────────────────────────────────────────────────────────────
 * Marigold (genda phool) — rings of ruffled petals. Drawn in a local
 * coordinate space (radius 50) so it can be placed inside any <svg>.
 * ────────────────────────────────────────────────────────────────────────── */
type MarigoldTone = 'orange' | 'yellow' | 'red';

const MARIGOLD_TONES: Record<MarigoldTone, string[]> = {
  orange: ['#c4470a', '#e8650f', '#f58a1f', '#ffab3d', '#ffc95c'],
  yellow: ['#d18a00', '#eea500', '#ffc21a', '#ffd84d', '#ffe98a'],
  red: ['#8a1410', '#b42318', '#d6452a', '#ee6a3a', '#ff9a5a'],
};

export const MarigoldShape = ({ cx, cy, r, tone = 'orange' }: { cx: number; cy: number; r: number; tone?: MarigoldTone }) => {
  const colors = MARIGOLD_TONES[tone];
  const rings = [
    { rad: 0.78, n: 16, len: 0.36, w: 0.2 },
    { rad: 0.6, n: 14, len: 0.32, w: 0.19 },
    { rad: 0.42, n: 12, len: 0.28, w: 0.18 },
    { rad: 0.25, n: 9, len: 0.22, w: 0.16 },
  ];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${r / 50})`}>
      <circle r="50" fill={colors[0]} />
      {rings.map((ring, ri) =>
        Array.from({ length: ring.n }, (_, i) => {
          const a = (360 / ring.n) * i + ri * 11;
          return (
            <ellipse
              key={`${ri}-${i}`}
              cx="0"
              cy={-ring.rad * 50}
              rx={ring.w * 50}
              ry={ring.len * 50}
              fill={colors[ri + 1]}
              transform={`rotate(${a})`}
              stroke={colors[0]}
              strokeOpacity="0.35"
              strokeWidth="1.2"
            />
          );
        }),
      )}
      <circle r="9" fill={colors[1]} />
      <circle r="4" fill={colors[0]} opacity="0.6" />
    </g>
  );
};

export const Marigold = ({ size, tone = 'orange', style }: { size: number; tone?: MarigoldTone; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="-52 -52 104 104" style={{ display: 'block', ...style }}>
    <MarigoldShape cx={0} cy={0} r={50} tone={tone} />
  </svg>
);

/* Mango leaf, pointing down, origin at stem. */
export const LeafShape = ({ x, y, len, angle = 0, color = '#2f7d32' }: { x: number; y: number; len: number; angle?: number; color?: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path d={`M0 0 C ${len * 0.32} ${len * 0.3}, ${len * 0.22} ${len * 0.8}, 0 ${len} C ${-len * 0.22} ${len * 0.8}, ${-len * 0.32} ${len * 0.3}, 0 0 Z`} fill={color} />
    <path d={`M0 2 L0 ${len * 0.92}`} stroke="#bfe3a0" strokeOpacity="0.55" strokeWidth={len * 0.03} />
  </g>
);

/* ──────────────────────────────────────────────────────────────────────────
 * Toran — door garland of mango leaves with hanging marigold strings.
 * ────────────────────────────────────────────────────────────────────────── */
interface ToranProps {
  width: number;
  strings: number;
  maxLength?: number;
  style?: CSSProperties;
}

export const Toran = ({ width, strings, maxLength = 4, style }: ToranProps) => {
  const vbW = 1000;
  const step = vbW / strings;
  const flower = Math.min(step * 0.42, 34);
  const height = 40 + maxLength * flower * 1.75 + flower;
  return (
    <svg width={width} height={(width * height) / vbW} viewBox={`0 0 ${vbW} ${height}`} style={{ display: 'block', ...style }}>
      {/* rope */}
      <path d={`M0 18 Q ${vbW / 2} 34 ${vbW} 18`} stroke="#8a5a1c" strokeWidth="5" fill="none" />
      {/* leaves between strings */}
      {Array.from({ length: strings + 1 }, (_, i) => (
        <LeafShape key={`l${i}`} x={i * step} y={22 + Math.sin((i / strings) * Math.PI) * 14} len={flower * 2.6} color={i % 2 ? '#2e7d32' : '#3f9142'} />
      ))}
      {/* hanging strings */}
      {Array.from({ length: strings }, (_, i) => {
        const x = step * (i + 0.5);
        const top = 26 + Math.sin(((i + 0.5) / strings) * Math.PI) * 14;
        const count = i % 2 === 0 ? maxLength : Math.max(2, maxLength - 1);
        return (
          <g key={`s${i}`}>
            <line x1={x} y1={top} x2={x} y2={top + count * flower * 1.75} stroke="#c9a04a" strokeWidth="2" />
            {Array.from({ length: count }, (_, k) => (
              <MarigoldShape key={k} cx={x} cy={top + flower + k * flower * 1.75} r={flower} tone={k % 2 === 0 ? 'orange' : 'yellow'} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Floral cluster — marigolds, leaves and jasmine buds, for corners.
 * ────────────────────────────────────────────────────────────────────────── */
export const FloralCluster = ({ size, seed = 3, style }: { size: number; seed?: number; style?: CSSProperties }) => {
  const rnd = seededRandom(seed);
  const flowers = [
    { x: 70, y: 70, r: 62, tone: 'orange' as const },
    { x: 180, y: 46, r: 44, tone: 'yellow' as const },
    { x: 46, y: 180, r: 46, tone: 'yellow' as const },
    { x: 160, y: 150, r: 38, tone: 'red' as const },
    { x: 262, y: 34, r: 28, tone: 'orange' as const },
    { x: 34, y: 262, r: 30, tone: 'orange' as const },
  ];
  const jasmine = Array.from({ length: 12 }, () => ({ x: 20 + rnd() * 280, y: 20 + rnd() * 280, r: 5 + rnd() * 5 })).filter(
    (j) => j.x + j.y < 340,
  );
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" style={{ display: 'block', overflow: 'visible', ...style }}>
      <LeafShape x={120} y={110} len={120} angle={-60} color="#2e7d32" />
      <LeafShape x={110} y={120} len={120} angle={-30} color="#3f9142" />
      <LeafShape x={210} y={70} len={90} angle={-80} color="#3f9142" />
      <LeafShape x={70} y={210} len={90} angle={-10} color="#2e7d32" />
      <LeafShape x={200} y={160} len={70} angle={-50} color="#4c9a46" />
      {jasmine.map((j, i) => (
        <g key={i} transform={`translate(${j.x} ${j.y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy={-j.r} rx={j.r * 0.55} ry={j.r} fill="#fffdf5" transform={`rotate(${a})`} />
          ))}
          <circle r={j.r * 0.35} fill="#f4c64e" />
        </g>
      ))}
      {flowers.map((f, i) => (
        <MarigoldShape key={i} cx={f.x} cy={f.y} r={f.r} tone={f.tone} />
      ))}
    </svg>
  );
};

/* Single hanging string of marigolds (vertical). */
export const MarigoldString = ({ height, flowers, style }: { height: number; flowers: number; style?: CSSProperties }) => {
  const vbH = flowers * 70 + 20;
  return (
    <svg width={(height * 80) / vbH} height={height} viewBox={`0 0 80 ${vbH}`} style={{ display: 'block', ...style }}>
      <line x1="40" y1="0" x2="40" y2={vbH - 30} stroke="#c9a04a" strokeWidth="2" />
      {Array.from({ length: flowers }, (_, i) => (
        <MarigoldShape key={i} cx={40} cy={36 + i * 70} r={32} tone={i % 2 ? 'yellow' : 'orange'} />
      ))}
    </svg>
  );
};
