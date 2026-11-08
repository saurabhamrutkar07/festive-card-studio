import { useSyncExternalStore } from 'react';

/**
 * Drives the fireworks frame-by-frame during video export.
 * `null` = live mode (CSS animations play / PNG gets the frozen frame).
 * A number = render the exact moment `t` seconds into the loop.
 */
let frameTime: number | null = null;
const listeners = new Set<() => void>();

export const setFireworksFrameTime = (t: number | null) => {
  frameTime = t;
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useFireworksFrameTime = () => useSyncExternalStore(subscribe, () => frameTime);

/** Every animation duration divides this, so the exported clip loops seamlessly. */
export const FIREWORKS_LOOP_SECONDS = 4;
