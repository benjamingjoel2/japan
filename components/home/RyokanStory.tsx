'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { useRef } from 'react';
import { ryokanNight } from '@/data/ryokan-night';
import { videos } from '@/config/media';
import type { VideoMedia } from '@/data/types';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { Button } from '@/components/ui/Button';

/**
 * One full-screen layer. Each layer is 200vh with a sticky 100vh card; layers overlap by
 * 100vh so the next card slides up over the pinned one. The card is inset and rounded as it
 * travels, and settles full-bleed with square corners when it fills the screen.
 */
function Layer({
  media,
  src,
  index,
  last,
  children,
}: {
  media: VideoMedia;
  src?: string;
  index: number;
  last: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const inset = useTransform(scrollYProgress, [0, 1], ['inset(0% 2% 0% 2% round 1rem)', 'inset(0% 0% 0% 0% round 0rem)']);
  return (
    <div
      ref={ref}
      className={`relative ${last ? 'h-svh' : 'h-[200svh]'} ${index ? '-mt-[100svh]' : ''}`}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="sticky top-0 h-svh overflow-hidden bg-night"
        style={reduce || index === 0 ? undefined : { clipPath: inset }}
      >
        <VideoPlayer media={media} src={src} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/10" />
        <div className="absolute inset-x-0 bottom-0 px-gutter pb-[8vh] text-washi lg:pb-[6vw]">{children}</div>
      </motion.div>
    </div>
  );
}

export function RyokanStory() {
  const intro: VideoMedia = {
    subject: 'Lanterns lit along a ryokan entrance at dusk, rain on stone',
    tone: 'lantern',
    alt: 'Paper lanterns glowing at a ryokan entrance at dusk',
    captions: '/captions/ryokan-0.vtt',
  };
  return (
    <section id="a-night" aria-labelledby="a-night-h" className="relative bg-night">
      <Layer media={intro} src={videos.ryokan[0]} index={0} last={false}>
        <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-grid">
          <h2 id="a-night-h" className="text-h2">
            {ryokanNight.title}
          </h2>
          <p className="max-w-[30ch] text-lead">{ryokanNight.intro}</p>
        </div>
      </Layer>
      {ryokanNight.stages.map((s, i) => (
        <Layer
          key={s.title}
          media={s.media}
          src={videos.ryokan[i + 1]}
          index={i + 1}
          last={i === ryokanNight.stages.length - 1}
        >
          <p className="label text-washi/70">
            {String(i + 1).padStart(2, '0')} / {String(ryokanNight.stages.length).padStart(2, '0')}
            {s.ja && (
              <span lang="ja" className="ml-3 font-jp">
                {s.ja}
              </span>
            )}
          </p>
          <h3 className="mt-2 font-display text-[54px] leading-none md:text-[9vw] lg:text-[6vw]">{s.title}</h3>
          <p className="mt-4 max-w-[34ch] text-body lg:mt-[1vw]">{s.body}</p>
        </Layer>
      ))}

      {/* Sticky call to action, right-hand side, across the whole story. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[22rem] px-gutter md:block">
        <div className="pointer-events-auto sticky top-[calc(var(--header-h)+2rem)] flex flex-col items-end gap-3 text-right text-washi">
          <p className="max-w-[16rem] text-label">{ryokanNight.cta}</p>
          <Button href="/plan" variant="outline-light">
            Plan with us
          </Button>
        </div>
      </div>
      <div className="relative z-20 px-gutter py-8 text-washi md:hidden">
        <p className="mb-3 text-label">{ryokanNight.cta}</p>
        <Button href="/plan" variant="outline-light" className="w-full">
          Plan with us
        </Button>
      </div>
    </section>
  );
}
