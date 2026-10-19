'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling, skipped entirely when the visitor prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: 0 } });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}

/** Lock / unlock page scroll (dialogs, mobile menu). */
export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : '';
  if (lock) window.__lenis?.stop();
  else window.__lenis?.start();
}
