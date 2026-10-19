'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Endless horizontal track. Auto-scrolls (speed px/frame), drag to scroll,
 * pauses on hover and keyboard focus, has a visible pause control, and stops entirely under
 * reduced motion (falls back to a native horizontal scroller). On small screens it is a
 * native swipe scroller, like the reference.
 */
export function Marquee({
  children,
  speed = 0.6,
  label,
  className = '',
  controlsClassName = '',
}: {
  children: ReactNode;
  speed?: number;
  label: string;
  className?: string;
  controlsClassName?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  const auto = wide && !reduce;
  const [paused, setPaused] = useState(false);
  const hover = useRef(false);
  const x = useRef(0);
  const drag = useRef<{ start: number; x: number; moved: boolean } | null>(null);

  useEffect(() => {
    if (!auto) return;
    const el = track.current!;
    let raf = 0;
    const loop = () => {
      const half = el.scrollWidth / 2;
      if (!paused && !hover.current && !drag.current) x.current -= speed;
      if (x.current <= -half) x.current += half;
      if (x.current > 0) x.current -= half;
      el.style.transform = `translate3d(${x.current}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [auto, paused, speed]);

  const onDown = (e: React.PointerEvent) => {
    if (!auto) return;
    drag.current = { start: e.clientX, x: x.current, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.start;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    x.current = drag.current.x + dx;
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <div className={className}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={auto ? 'cursor-grab overflow-hidden active:cursor-grabbing' : 'snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none]'}
        onPointerEnter={() => (hover.current = true)}
        onPointerLeave={() => (hover.current = false)}
        onFocusCapture={() => setPaused(true)}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div ref={track} className="flex w-max touch-pan-y will-change-transform">
          <div className="flex">{children}</div>
          {auto && (
            <div className="flex" aria-hidden="true" inert>
              {children}
            </div>
          )}
        </div>
      </div>
      {auto && (
        <div className={`mt-4 px-gutter ${controlsClassName}`}>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="text-label text-moss underline-offset-4 hover:underline"
            aria-pressed={paused}
          >
            {paused ? 'Play' : 'Pause'} motion
          </button>
        </div>
      )}
    </div>
  );
}
