'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import type { VideoMedia } from '@/data/types';
import { Placeholder } from './Media';

/**
 * Ambient, muted, looping video that fills its (relative) parent.
 * - Without a `src` it renders the generated placeholder poster (with a slow drift).
 * - Plays only while on screen; never autoplays under reduced motion.
 * - Muted ambient footage with no dialogue; captions track carries a description.
 */
export function VideoPlayer({
  media,
  src,
  className = '',
  label = true,
  drift = true,
}: {
  media: VideoMedia;
  src?: string;
  className?: string;
  label?: boolean;
  drift?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const url = src || media.video;

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, url]);

  return (
    <div ref={wrap} className={`absolute inset-0 overflow-hidden ${className}`}>
      {url ? (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt ?? media.subject}
        >
          <source src={url} type="video/mp4" />
          {media.captions && <track kind="captions" src={media.captions} srcLang="en" label="English" />}
        </video>
      ) : (
        <div
          role="img"
          aria-label={media.alt ?? media.subject}
          className={`absolute -inset-[4%] ${drift && !reduce ? 'animate-[drift_24s_ease-in-out_infinite_alternate]' : ''}`}
        >
          <Placeholder media={media} label={false} priority />
        </div>
      )}
      {!url && label && (
        <span className="pointer-events-none absolute right-[var(--gutter)] bottom-3 z-[1] hidden max-w-[60%] text-right md:block text-[10px] tracking-wide text-white/60 uppercase">
          Video placeholder · {media.subject}
        </span>
      )}
    </div>
  );
}
