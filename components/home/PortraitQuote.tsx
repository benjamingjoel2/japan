'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { useRef } from 'react';
import { portraitQuote } from '@/data/quote';
import { Media } from '@/components/ui/Media';
import { Button } from '@/components/ui/Button';
import { PlaceholderTag } from '@/components/ui/Tags';

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(p, [start * 0.8, start * 0.8 + 0.12], [0.2, 1]);
  const filter = useTransform(p, [start * 0.8, start * 0.8 + 0.12], ['blur(4px)', 'blur(0px)']);
  return <motion.span style={{ opacity, filter }}>{w} </motion.span>;
}

/** Full-bleed portrait; the quote comes into focus word by word as you scroll. */
export function PortraitQuote() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'center center'] });
  const words = portraitQuote.quote.split(' ');
  const q = portraitQuote;

  return (
    <section ref={ref} aria-label="A word from our hosts" className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Media media={q.image} sizes="100vw" label={false} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-washi/85 via-washi/45 to-transparent" />
      </div>
      <div className="relative flex flex-1 flex-col px-gutter pt-[calc(var(--header-h)+4vh)] pb-6">
        <figure className="max-w-[30rem] lg:max-w-[30vw]">
          <span aria-hidden="true" className="block font-display text-[64px] leading-[0.6] lg:text-[5vw]">
            &ldquo;
          </span>
          <blockquote className="mt-3 text-lead">
            <p>
              <span className="font-medium">{q.lead}</span>{' '}
              {reduce ? q.quote : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
            </p>
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-label">
            <span>
              {q.name}, <span className="text-sumi-soft">{q.role}</span>
            </span>
            <PlaceholderTag />
          </figcaption>
        </figure>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-16">
          <p className="max-w-[22rem] text-label">Stay with hosts like this one. We know them, and they know we&rsquo;re coming.</p>
          <Button href="/plan">Plan with us</Button>
        </div>
      </div>
    </section>
  );
}
