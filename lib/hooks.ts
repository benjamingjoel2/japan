'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** False during SSR and hydration, true afterwards. For values that only exist in the browser. */
export function useIsClient() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Live media query; `fallback` is used on the server. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Current time, refreshed every `ms`. Null on the server. Snapshot is stable between ticks. */
const clocks = new Map<number, { now: number; subs: Set<() => void>; id?: ReturnType<typeof setInterval> }>();
export function useNow(ms = 15_000): Date | null {
  const t = useSyncExternalStore(
    (cb) => {
      let c = clocks.get(ms);
      if (!c) {
        c = { now: Date.now(), subs: new Set() };
        clocks.set(ms, c);
      }
      c.subs.add(cb);
      if (!c.id) {
        const clock = c;
        clock.id = setInterval(() => {
          clock.now = Date.now();
          clock.subs.forEach((s) => s());
        }, ms);
      }
      return () => {
        c!.subs.delete(cb);
        if (!c!.subs.size && c!.id) {
          clearInterval(c!.id);
          c!.id = undefined;
        }
      };
    },
    () => {
      let c = clocks.get(ms);
      if (!c) {
        c = { now: Date.now(), subs: new Set() };
        clocks.set(ms, c);
      }
      return c.now;
    },
    () => 0,
  );
  return t ? new Date(t) : null;
}
