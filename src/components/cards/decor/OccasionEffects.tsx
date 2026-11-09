import { memo, useMemo, type CSSProperties } from 'react';
import { seededRandom } from '../../../utils/seededRandom';
import { useSvgId } from '../../../hooks/useSvgId';
import type { CardDimensions, OccasionEffect } from '../../../types/card';
import { FIREWORKS_LOOP_SECONDS as LOOP, useFireworksFrameTime } from './fireworksClock';

/**
 * Occasion animations, drawn behind the card art like the fireworks:
 *   petals — Padwa: marigold petals and gold coins drifting down
 *   aarti  — Bhaubij: warm aarti glow pulsing at the bottom, embers and petals rising
 *
 * Same contract as Fireworks.tsx: the base style of every particle is a
 * designed frozen frame (PNG); CSS animates it in the live preview
 * (.fx-fall / .fx-pulse in index.css); during GIF export the shared clock
 * gives an exact time and the JS frame functions below draw that moment.
 * Every duration divides the 4 s loop, so the GIF loops seamlessly.
 */

const PETAL_COLORS = ['#ff9f1c', '#ffb703', '#f77f00', '#ffd166', '#e85d04'];
const EMBER_COLORS = ['#ffd27a', '#ffb347', '#fff1c4', '#ff8fab'];

type Kind = 'petal' | 'coin' | 'ember';

interface Particle {
  kind: Kind;
  x: number;
  y: number;
  size: number;
  color: string;
  from: number;
  to: number;
  sway: number;
  duration: number;
  delay: number;
  spin: number;
}

const progress = (t: number, duration: number, delay: number) => ((((t + delay) % duration) + duration) % duration) / duration;

/** JS mirror of the fx-fall keyframes (linear fall, sine sway, steady spin). */
const fallFrame = (p: number, q: Particle): CSSProperties => {
  const y = q.from + (q.to - q.from) * p;
  const x = q.sway * Math.sin(p * Math.PI * 2);
  return { transform: `translate(${x}px, ${y}px) rotate(${q.spin * p}deg)` };
};

/** JS mirror of fx-pulse. */
const pulseFrame = (p: number): CSSProperties => {
  const s = 0.5 - 0.5 * Math.cos(p * Math.PI * 2);
  return { transform: `scale(${0.92 + 0.12 * s})`, opacity: 0.55 + 0.4 * s };
};

const anim = (duration: number, delay: number, vars?: Record<string, string>): CSSProperties =>
  ({ animationDuration: `${duration}s`, animationDelay: `${-delay}s`, ...vars }) as CSSProperties;

const ParticleShape = ({ q }: { q: Particle }) => {
  if (q.kind === 'coin')
    return (
      <>
        <circle r={q.size} fill="#b8862e" />
        <circle r={q.size * 0.92} cy={-q.size * 0.06} fill="#f2c94c" />
        <circle r={q.size * 0.62} cy={-q.size * 0.06} fill="none" stroke="#fff4c2" strokeWidth={q.size * 0.12} />
      </>
    );
  if (q.kind === 'ember') return <circle r={q.size} fill={q.color} />;
  // marigold petal: a soft teardrop
  return <path d={`M0 ${-q.size} C${q.size * 0.7} ${-q.size * 0.4} ${q.size * 0.6} ${q.size * 0.7} 0 ${q.size} C${-q.size * 0.6} ${q.size * 0.7} ${-q.size * 0.7} ${-q.size * 0.4} 0 ${-q.size}Z`} fill={q.color} />;
};

export const OccasionEffects = memo(({ dims, kind }: { dims: CardDimensions; kind: OccasionEffect }) => {
  const { width: W, height: H } = dims;
  const short = Math.min(W, H);
  const glowId = useSvgId('fxaarti');
  const t = useFireworksFrameTime();

  const particles = useMemo<Particle[]>(() => {
    const rand = seededRandom(W * 3 + H * 11 + (kind === 'aarti' ? 7 : 0));
    const list: Particle[] = [];
    const count = kind === 'petals' ? 26 : 30;
    for (let i = 0; i < count; i++) {
      // Particles travel only in the side bands (outer 16% each side), so they
      // never drift behind the message in the centre of the card.
      const band = rand() * 0.16;
      const x = (i % 2 ? 1 - band : band) * W;
      const y = rand() * H;
      const margin = short * 0.06;
      if (kind === 'petals') {
        const coin = i % 4 === 0;
        list.push({
          kind: coin ? 'coin' : 'petal',
          x,
          y,
          size: short * (coin ? 0.014 + rand() * 0.008 : 0.012 + rand() * 0.01),
          color: PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)],
          // fall from above the card to below it, relative to the resting spot
          from: -y - margin,
          to: H - y + margin,
          sway: short * (0.02 + rand() * 0.03),
          duration: LOOP,
          delay: rand() * LOOP,
          spin: (rand() > 0.5 ? 1 : -1) * 360,
        });
      } else {
        const petal = i % 3 === 0;
        list.push({
          kind: petal ? 'petal' : 'ember',
          x,
          y,
          size: short * (petal ? 0.01 + rand() * 0.006 : 0.004 + rand() * 0.005),
          color: petal ? PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)] : EMBER_COLORS[Math.floor(rand() * EMBER_COLORS.length)],
          // rise from below the card to above it
          from: H - y + margin,
          to: -y - margin,
          sway: short * (0.01 + rand() * 0.02),
          duration: LOOP,
          delay: rand() * LOOP,
          spin: petal ? 180 : 0,
        });
      }
    }
    return list;
  }, [W, H, short, kind]);

  const style = (q: Particle) =>
    t === null
      ? anim(q.duration, q.delay, { '--fx-from': `${q.from}px`, '--fx-to': `${q.to}px`, '--fx-sway': `${q.sway}px`, '--fx-spin': `${q.spin}deg` })
      : fallFrame(progress(t, q.duration, q.delay), q);

  return (
    <svg
      data-fx
      aria-hidden="true"
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: kind === 'petals' ? 0.9 : 0.85 }}
    >
      {kind === 'aarti' && (
        <>
          <defs>
            <radialGradient id={glowId} cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="#ffcf6b" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#ff9a3c" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform={`translate(${W / 2} ${H})`}>
            <ellipse
              className="fx-pulse"
              cx="0"
              cy="0"
              rx={W * 0.7}
              ry={H * 0.42}
              fill={`url(#${glowId})`}
              style={t === null ? anim(LOOP / 2, 0) : pulseFrame(progress(t, LOOP / 2, 0))}
            />
          </g>
        </>
      )}
      {particles.map((q, i) => (
        <g key={i} transform={`translate(${q.x} ${q.y})`}>
          <g className="fx-fall" style={style(q)}>
            <ParticleShape q={q} />
          </g>
        </g>
      ))}
    </svg>
  );
});
OccasionEffects.displayName = 'OccasionEffects';
