'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/config/site';
import { videos } from '@/config/media';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen sticky video. The wrapper is 200vh and the next section pulls itself up by
 * 100vh, so the page slides over the hero rather than the hero scrolling away.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { y: '100%' },
          animate: { y: 0 },
          transition: { duration: 1.4, ease, delay: 0.25 + i * 0.12 },
        };
  const fade = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: '1rem', filter: 'blur(5px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 1, ease, delay: 0.9 + i * 0.1 },
        };

  return (
    <div id="top" className="relative h-[200svh]">
      <section aria-label="Komorebi" className="sticky top-0 flex h-svh flex-col overflow-hidden bg-night">
        <VideoPlayer
          media={{
            subject: 'Light through maple leaves, Kyoto, 7am',
            tone: 'leaf',
            alt: 'Morning light filtering through maple leaves',
            captions: '/captions/hero.vtt',
          }}
          src={videos.hero}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/35 via-night/0 to-night/55" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[38%] [mask-image:linear-gradient(to_top,black_30%,transparent)] backdrop-blur-[6px]"
        />

        <div className="relative mt-auto px-gutter pb-[3vw] text-washi lg:pb-[1.2vw]">
          <div className="flex items-end justify-between gap-6">
            {site.heroTags.map((pair, i) => (
              <motion.p key={i} {...fade(i)} className={`flex flex-wrap gap-x-3 text-body ${i ? 'justify-end text-right' : ''}`}>
                {pair.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </motion.p>
            ))}
          </div>
          <h1 className="mt-2 flex justify-between font-display text-hero uppercase lg:mt-0">
            <span className="sr-only">Komorebi. {site.tagline}</span>
            {['Komo', 'rebi'].map((w, i) => (
              <span key={w} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" {...rise(i)}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </section>
    </div>
  );
}
