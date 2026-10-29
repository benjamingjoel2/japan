'use client';

/** Lock / unlock page scroll (dialogs, mobile menu). Native scrolling only: no scroll hijacking. */
export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}
