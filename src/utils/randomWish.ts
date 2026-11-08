import type { Wish } from '../types/card';

/**
 * Picks a random wish that differs from the current one and, where possible,
 * from the recently shown ones (a simple "shuffle bag").
 */
export const pickRandomWish = (pool: Wish[], currentId: string | null, recent: string[]): Wish | null => {
  if (pool.length === 0) return null;
  if (pool.length === 1) return pool[0];
  const notCurrent = pool.filter((w) => w.id !== currentId);
  const fresh = notCurrent.filter((w) => !recent.includes(w.id));
  const candidates = fresh.length > 0 ? fresh : notCurrent;
  return candidates[Math.floor(Math.random() * candidates.length)];
};
