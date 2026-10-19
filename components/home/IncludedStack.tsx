'use client';

import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { included } from '@/data/included';
import { Media } from '@/components/ui/Media';

const accents = ['var(--color-moss)', 'var(--color-beni)', '#a0782f', 'var(--color-moss)', 'var(--color-beni)', '#a0782f'];

/**
 * Cards that pin at the same offset and stack over each other as you scroll.
 * The accent word in the heading shifts colour with each new card.
 */
export function IncludedStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) =>
    setI(Math.min(included.length - 1, Math.floor(v * included.length))),
  );

  return (
    <div ref={ref} className="relative px-gutter pb-section">
      <div className="sticky top-[var(--header-h)] z-20 bg-washi pt-6 pb-4 lg:top-0 lg:pt-[3vw] lg:pb-[2vw]">
        <h3 className="text-center font-display text-[40px] leading-none text-moss-light md:text-[7vw] lg:text-h2">
          Included in{' '}
          <span className="transition-colors duration-700" style={{ color: accents[i] }}>
            every
          </span>{' '}
          journey
        </h3>
      </div>
      <ol>
        {included.map((item) => (
          <li
            key={item.title}
            className="sticky top-[var(--stack-top)] grid h-[65svh] grid-cols-1 content-start gap-2.5 border-t border-moss-light bg-washi pt-3.5 md:h-[40vh] md:grid-cols-[1fr_2fr_1fr] md:gap-5 md:pt-5 lg:h-[60vh] lg:pt-[2vw]"
          >
            <h4 className="text-h3">{item.title}</h4>
            <div className="relative h-[34svh] overflow-hidden rounded-media md:mx-auto md:h-[30vh] md:w-[55%] lg:h-[46vh]">
              <Media media={item.image} sizes="(min-width: 768px) 30vw, 100vw" />
            </div>
            <p className="text-body md:max-w-[28ch]">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
