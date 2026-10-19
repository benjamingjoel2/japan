'use client';

import { useEffect, useRef } from 'react';

/** Small trailing dot on fine pointers only. Purely decorative. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!mq.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current!;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      el.dataset.hover = t.closest('a,button,[role=button],summary') ? '1' : '';
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    el.style.display = 'block';
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ display: 'none' }}
      className="pointer-events-none fixed top-0 left-0 z-[100] -mt-1 -ml-1 size-2 rounded-full bg-beni mix-blend-multiply transition-[width,height,margin] duration-300 data-[hover=1]:-mt-4 data-[hover=1]:-ml-4 data-[hover=1]:size-8 data-[hover=1]:bg-beni/30"
    />
  );
}
