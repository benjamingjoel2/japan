'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import type { Stay } from '@/data/types';
import { useT } from '@/components/i18n/I18nProvider';
import { Media } from '@/components/ui/Media';
import { Button } from '@/components/ui/Button';
import { SpecTable } from '@/components/ui/SpecTable';
import { PlaceholderTag } from '@/components/ui/Tags';
import { staySpecRows } from '@/lib/stay';

const ease = [0.22, 1, 0.36, 1] as const;


function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function StaySlider({ stays }: { stays: Stay[] }) {
  const { t } = useT();
  const [i, setI] = useState(0);
  const s = stays[i];
  const go = (d: number) => setI((n) => (n + d + stays.length) % stays.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t('Stays')}
      className="relative px-gutter pb-section"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="label">{t('Stays')}</h3>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => go(-1)} aria-label={t('Previous stay')} className="grid size-10 place-items-center">
            <Arrow dir="prev" />
          </button>
          <span className="text-label tabular-nums text-moss" aria-live="polite">
            {i + 1} / {stays.length}
          </span>
          <button type="button" onClick={() => go(1)} aria-label={t('Next stay')} className="grid size-10 place-items-center">
            <Arrow dir="next" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={s.slug}
          role="group"
          aria-roledescription="slide"
          aria-label={t('{i} of {n}: {name}', { i: i + 1, n: stays.length, name: s.name })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 gap-grid md:grid-cols-[1.25fr_1fr_0.6fr]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-media md:aspect-auto md:min-h-[36vw]">
            <Media media={s.images[0]} sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <div className="flex flex-col gap-4 md:px-[1vw]">
            <div className="flex items-center gap-2">
              <span className="label capitalize">{t(s.type)}</span>
              <PlaceholderTag className="text-moss" />
            </div>
            <h4 className="font-display text-[40px] leading-none md:text-[7vw] lg:text-[4vw]">{s.name}</h4>
            <p className="max-w-[40ch] text-body">{s.summary}</p>
            <div>
              <Button href={`/stays/${s.slug}`}>{t('See this stay')}</Button>
            </div>
            <SpecTable rows={staySpecRows(s, t)} className="mt-auto border-t border-line pt-3" />
          </div>
          <div className="relative hidden aspect-[3/4] self-start overflow-hidden rounded-media md:block">
            <Media media={s.images[1]} ratio={3 / 4} sizes="20vw" />
          </div>
        </m.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-center gap-0.5" role="group" aria-label={t('Choose a stay')}>
        {stays.map((st, n) => (
          <button
            key={st.slug}
            type="button"
            aria-pressed={n === i}
            aria-label={st.name}
            onClick={() => setI(n)}
            className="grid h-6 min-w-6 place-items-center"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${n === i ? 'w-6 bg-sumi' : 'w-1.5 bg-sumi/25'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
