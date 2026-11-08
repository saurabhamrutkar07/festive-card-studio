import { memo, useMemo, type CSSProperties } from 'react';
import { seededRandom } from '../../../utils/seededRandom';
import { useSvgId } from '../../../hooks/useSvgId';
import type { CardDimensions, FireworksLevel } from '../../../types/card';
import { FIREWORKS_LOOP_SECONDS as LOOP, useFireworksFrameTime } from './fireworksClock';

/**
 * Animated firecrackers and rockets behind the card artwork.
 *
 * Each element's *base* style is a designed "frozen" frame (bursts open,
 * rockets mid-flight). CSS animations play on top of that in the live preview;
 * during PNG export `[data-exporting]` switches animations off so the image
 * captures the frozen frame instead of a random mid-animation moment.
 * Animation CSS lives in index.css (.fx-burst / .fx-rocket / .fx-spark).
 */

const COLORS = ['#ffd166', '#ff8a3d', '#ff4d8d', '#7cf5ff', '#b28dff', '#fff1b8'];

const CONFIG = {
  subtle: { bursts: 3, rockets: 2, sparkles: 14, opacity: 0.6 },
  grand: { bursts: 6, rockets: 4, sparkles: 32, opacity: 0.95 },
} as const;

const anim = (duration: number, delay: number, extra?: Record<string, string>): CSSProperties =>
  ({ animationDuration: `${duration}s`, animationDelay: `${-delay}s`, ...extra }) as CSSProperties;

/* ── JS mirrors of the CSS keyframes, used for frame-exact video export ── */
const lerp = (a: number, b: number, k: number) => a + (b - a) * Math.min(1, Math.max(0, k));
const easeOut = (k: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, k)), 3);
/** Progress (0–1) of an animation with a negative delay, `t` seconds in. */
const progress = (t: number, duration: number, delay: number) => (((t + delay) % duration) + duration) % duration / duration;

const burstFrame = (p: number): CSSProperties => {
  if (p < 0.16) return { transform: 'scale(0.05)', opacity: 0 };
  if (p < 0.58) {
    const k = (p - 0.16) / 0.42;
    return { transform: `scale(${lerp(0.05, 1, easeOut(k))})`, opacity: p < 0.22 ? (p - 0.16) / 0.06 : lerp(1, 0.95, (p - 0.22) / 0.36) };
  }
  const k = (p - 0.58) / 0.42;
  return { transform: `scale(${lerp(1, 1.14, k)})`, opacity: lerp(0.95, 0, k) };
};

const rocketFrame = (p: number, rise: number): CSSProperties => ({
  transform: `translateY(${rise * (1 - Math.pow(p, 1.3))}px)`,
  opacity: p < 0.12 ? p / 0.12 : p > 0.82 ? (1 - p) / 0.18 : 1,
});

const sparkFrame = (p: number): CSSProperties => {
  const s = 0.5 - 0.5 * Math.cos(p * Math.PI * 2);
  return { transform: `scale(${0.55 + 0.45 * s})`, opacity: 0.25 + 0.75 * s };
};

export const Fireworks = memo(({ dims, level }: { dims: CardDimensions; level: Exclude<FireworksLevel, 'off'> }) => {
  const { width: W, height: H } = dims;
  const short = Math.min(W, H);
  const glowId = useSvgId('fxglow');
  const trailId = useSvgId('fxtrail');
  const cfg = CONFIG[level];
  const trailLen = short * 0.16;

  const scene = useMemo(() => {
    const rand = seededRandom(W * 7 + H * 13 + (level === 'grand' ? 1 : 0));
    const pick = () => COLORS[Math.floor(rand() * COLORS.length)];
    const colW = W / cfg.bursts;

    const bursts = Array.from({ length: cfg.bursts }, (_, i) => {
      const r = short * (level === 'grand' ? 0.08 + rand() * 0.08 : 0.07 + rand() * 0.06);
      const x = Math.min(W - r, Math.max(r, colW * (i + 0.5) + (rand() - 0.5) * colW * 0.5));
      const y = H * (i % 2 ? 0.1 + rand() * 0.18 : 0.26 + rand() * 0.24);
      return {
        x,
        y,
        r,
        rays: 14 + Math.floor(rand() * 6),
        color: pick(),
        color2: pick(),
        rot: rand() * 30,
        duration: LOOP,
        // Every burst is open (40–68 % through its cycle) at t = 0, so the
        // first frame — used as the chat / gallery thumbnail — looks complete.
        delay: LOOP * (0.4 + rand() * 0.28),
      };
    });

    const rockets = Array.from({ length: cfg.rockets }, (_, i) => ({
      x: W * ((i + 0.5) / cfg.rockets) + (rand() - 0.5) * W * 0.12,
      y: H * (0.4 + rand() * 0.3),
      angle: (rand() - 0.5) * 18,
      color: pick(),
      rise: H * 0.55,
      duration: rand() > 0.5 ? LOOP / 2 : LOOP,
      delay: rand() * LOOP,
    }));

    const sparkles = Array.from({ length: cfg.sparkles }, () => ({
      x: rand() * W,
      y: rand() * H * 0.75,
      s: short * (0.006 + rand() * 0.008),
      color: rand() > 0.5 ? '#fff6d6' : pick(),
      duration: rand() > 0.5 ? LOOP / 2 : LOOP / 3,
      delay: rand() * LOOP,
    }));

    return { bursts, rockets, sparkles };
  }, [W, H, short, level, cfg]);

  // During video export, styles are computed per frame instead of by CSS.
  const t = useFireworksFrameTime();
  const at = (duration: number, delay: number, frame: (p: number) => CSSProperties, extra?: Record<string, string>) =>
    t === null ? anim(duration, delay, extra) : frame(progress(t, duration, delay));

  return (
    <svg
      data-fx
      aria-hidden="true"
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: cfg.opacity }}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#ffd166" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={trailId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={trailLen}>
          <stop offset="0%" stopColor="#fff1c4" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff9a3d" stopOpacity="0" />
        </linearGradient>
      </defs>

      {scene.sparkles.map((p, i) => (
        <g key={`s${i}`} transform={`translate(${p.x} ${p.y})`}>
          <path
            className="fx-spark"
            style={at(p.duration, p.delay, sparkFrame)}
            fill={p.color}
            d={`M0 ${-p.s}L${p.s * 0.22} ${-p.s * 0.22}L${p.s} 0L${p.s * 0.22} ${p.s * 0.22}L0 ${p.s}L${-p.s * 0.22} ${p.s * 0.22}L${-p.s} 0L${-p.s * 0.22} ${-p.s * 0.22}Z`}
          />
        </g>
      ))}

      {scene.rockets.map((rk, i) => (
        <g key={`r${i}`} transform={`translate(${rk.x} ${rk.y}) rotate(${rk.angle})`}>
          <g className="fx-rocket" style={at(rk.duration, rk.delay, (p) => rocketFrame(p, rk.rise), { '--fx-rise': `${rk.rise}px` })}>
            <line x1="0" y1="0" x2="0" y2={trailLen} stroke={`url(#${trailId})`} strokeWidth={short * 0.006} strokeLinecap="round" />
            <circle r={short * 0.017} fill={rk.color} opacity="0.35" />
            <circle r={short * 0.007} fill="#fffaf0" />
          </g>
        </g>
      ))}

      {scene.bursts.map((b, i) => (
        <g key={`b${i}`} transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
          <g className="fx-burst" style={at(b.duration, b.delay, burstFrame)}>
            <circle r={b.r * 0.4} fill={`url(#${glowId})`} />
            {Array.from({ length: b.rays }, (_, k) => {
              const a = (k / b.rays) * Math.PI * 2;
              const cos = Math.cos(a);
              const sin = Math.sin(a);
              const outer = b.r * (k % 2 ? 1 : 0.84);
              const col = k % 3 === 0 ? b.color2 : b.color;
              return (
                <g key={k}>
                  <line
                    x1={cos * b.r * 0.22}
                    y1={sin * b.r * 0.22}
                    x2={cos * outer}
                    y2={sin * outer}
                    stroke={col}
                    strokeWidth={b.r * 0.028}
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <circle cx={cos * outer * 1.08} cy={sin * outer * 1.08} r={b.r * 0.034} fill={col} />
                  <circle
                    cx={Math.cos(a + Math.PI / b.rays) * b.r * 0.58}
                    cy={Math.sin(a + Math.PI / b.rays) * b.r * 0.58}
                    r={b.r * 0.02}
                    fill={b.color2}
                    opacity="0.8"
                  />
                </g>
              );
            })}
          </g>
        </g>
      ))}
    </svg>
  );
});
Fireworks.displayName = 'Fireworks';
