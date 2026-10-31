'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useRef, useState } from 'react';
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
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/** Round arrow button that sits on the photo, so the carousel reads as one at a glance. */
function NavButton({ dir, label, onClick, className = '' }: { dir: 'prev' | 'next'; label: string; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid size-12 place-items-center rounded-full bg-washi/90 text-sumi shadow-md backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <Arrow dir={dir} />
    </button>
  );
}

export function StaySlider({ stays }: { stays: Stay[] }) {
  const { t } = useT();
  const [i, setI] = useState(0);
  const s = stays[i];
  const next = stays[(i + 1) % stays.length];
  const go = (d: number) => setI((n) => (n + d + stays.length) % stays.length);
  const strip = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);

  const choose = (n: number) => {
    setI(n);
    strip.current?.querySelector<HTMLElement>(`[data-i="${n}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

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
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="label">{t('Stays')}</h3>
          <p className="mt-1 text-[15px] text-sumi-soft">{t('{n} places to stay. Browse them all.', { n: stays.length })}</p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <span className="text-label tabular-nums text-moss" aria-live="polite">
            {i + 1} / {stays.length}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t('Previous stay')}
            className="grid size-11 place-items-center rounded-full border border-sumi/30 transition-colors hover:bg-sumi hover:text-washi"
          >
            <Arrow dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t('Next stay')}
            className="grid size-11 place-items-center rounded-full bg-sumi text-washi transition-transform hover:scale-105"
          >
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
          transition={{ duration: 0.5, ease }}
          className="grid grid-cols-1 gap-grid md:grid-cols-[1.25fr_1fr_0.6fr]"
        >
          {/* Main photo, with arrows on it and swipe on touch screens. */}
          <div
            className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-media md:aspect-auto md:min-h-[36vw]"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              touch.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            <Media media={s.images[0]} sizes="(min-width: 768px) 45vw, 100vw" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sumi/45 to-transparent" />
            <NavButton dir="prev" label={t('Previous stay')} onClick={() => go(-1)} className="absolute top-1/2 left-3 -translate-y-1/2" />
            <NavButton dir="next" label={t('Next stay')} onClick={() => go(1)} className="absolute top-1/2 right-3 -translate-y-1/2" />
            <span className="absolute bottom-3 left-3 rounded-full bg-sumi/70 px-3 py-1 text-[13px] text-washi tabular-nums md:hidden">
              {i + 1} / {stays.length} · {t('Swipe for more')}
            </span>
          </div>

          <div className="flex flex-col gap-4 md:px-[1vw]">
            <div className="flex items-center gap-2">
              <span className="label capitalize">{t(s.type)}</span>
              <PlaceholderTag className="text-moss" />
            </div>
            <h4 className="font-display text-[40px] leading-none md:text-[7vw] lg:text-[4vw]">{s.name}</h4>
            <p className="max-w-[40ch] text-body">{s.summary}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button href={`/stays/${s.slug}`}>{t('See this stay')}</Button>
              <button
                type="button"
                onClick={() => go(1)}
                className="group inline-flex items-center gap-2 text-[15px] text-sumi underline-offset-4 hover:underline"
              >
                {t('Next: {name}', { name: next.name })}
                <span className="transition-transform group-hover:translate-x-1">
                  <Arrow dir="next" />
                </span>
              </button>
            </div>
            <SpecTable rows={staySpecRows(s, t)} className="mt-auto border-t border-line pt-3" />
          </div>
          <div className="relative hidden aspect-[3/4] self-start overflow-hidden rounded-media md:block">
            <Media media={s.images[1]} ratio={3 / 4} sizes="20vw" />
          </div>
        </m.div>
      </AnimatePresence>

      {/* Thumbnail strip: shows at a glance that there are more stays, and lets you jump to any. */}
      <div
        ref={strip}
        role="group"
        aria-label={t('Choose a stay')}
        className="-mx-[var(--gutter)] mt-6 flex snap-x scroll-px-[var(--gutter)] gap-2.5 overflow-x-auto px-gutter pt-1 pb-2 [scrollbar-width:none]"
      >
        {stays.map((st, n) => (
          <button
            key={st.slug}
            data-i={n}
            type="button"
            aria-pressed={n === i}
            onClick={() => choose(n)}
            className={`group flex w-[8.5rem] shrink-0 snap-start flex-col gap-1.5 text-left transition-opacity md:w-[9.5rem] ${
              n === i ? 'opacity-100' : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span
              className={`relative block aspect-[3/2] w-full overflow-hidden rounded-media ring-2 ring-offset-2 ring-offset-washi transition-[box-shadow] ${
                n === i ? 'ring-sumi' : 'ring-transparent'
              }`}
            >
              <Media media={st.images[0]} ratio={3 / 2} sizes="160px" label={false} />
            </span>
            <span className="truncate text-[13px] leading-tight">{st.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
