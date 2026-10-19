'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { useRef } from 'react';
import { videos } from '@/config/media';
import { Media } from '@/components/ui/Media';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

const cards = [
  {
    title: 'Four places, properly',
    body: 'We don’t do Japan in ten cities. Three nights in one place is when the neighbourhood starts nodding back.',
  },
  {
    title: 'Built around the season',
    body: 'We plan from the calendar outward: what is in bloom, in the river, on the table. The route follows.',
  },
  {
    title: 'Private, never rushed',
    body: 'Your own guide, your own pace. Long lunches are allowed. So is an afternoon with nothing in it.',
  },
  {
    title: 'Planned by people who live there',
    body: 'Our specialists know the innkeepers by name and the trains by heart. They are a message away throughout.',
  },
];

/**
 * A giant word sits behind; the video grows from a small frame to full-bleed as you scroll
 * and its blur lifts. Followed by four short cards around a portrait.
 */
export function JourneysVideo() {
  const track = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.42, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.7], [8, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ['blur(5px)', 'blur(0px)']);
  const subtitle = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  return (
    <section id="journeys" aria-labelledby="journeys-h" className="relative bg-washi">
      <div ref={track} className="relative h-[260svh]">
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          <h2
            id="journeys-h"
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[18vw] leading-none text-sumi lg:text-[15vw]"
          >
            Journeys
          </h2>
          <motion.div
            className="relative h-svh w-full overflow-hidden"
            style={reduce ? undefined : { scale, borderRadius: radius, filter: blur }}
          >
            <VideoPlayer
              media={{
                subject: 'Walking a cedar path on the Kumano Kodo, morning mist',
                tone: 'cedar',
                alt: 'A walker on a mossy stone path between tall cedars',
                captions: '/captions/journeys.vtt',
              }}
              src={videos.journeys}
            />
            <motion.p
              style={reduce ? undefined : { opacity: subtitle }}
              className="absolute inset-x-0 bottom-[8vh] mx-auto max-w-[34ch] px-gutter text-center text-body text-washi"
            >
              Eight journeys to start from, each rewritten around your dates, your pace and the season you’ll arrive in.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="px-gutter pt-section">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.2fr_1fr] md:gap-grid">
          {[cards.slice(0, 2), cards.slice(2)].map((col, c) => (
            <div key={c} className={`flex flex-col gap-10 lg:gap-[3vw] ${c ? 'md:order-3' : ''}`}>
              {col.map((card, k) => (
                <Reveal key={card.title} delay={k * 0.1}>
                  <h3 className="text-h3">{card.title}</h3>
                  <p className="mt-2 max-w-[34ch] text-body">{card.body}</p>
                </Reveal>
              ))}
            </div>
          ))}
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-media md:order-2">
            <Media media={{ subject: 'Guide and guest crossing a stone bridge, Nakasendō, autumn', tone: 'maple' }} sizes="35vw" />
          </Reveal>
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/journeys">See all eight journeys</Button>
        </div>
      </div>
    </section>
  );
}
