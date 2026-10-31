'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useId, useState } from 'react';
import type { FaqItem } from '@/data/types';
import { useT } from '@/components/i18n/I18nProvider';
import { Media } from '@/components/ui/Media';
import { VerifyTag } from '@/components/ui/Tags';

export function Faq({ items: faq }: { items: FaqItem[] }) {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-washi px-gutter py-section">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-grid">
        <h2 id="faq-h" className="text-h2 md:sticky md:top-[calc(var(--header-h)+1rem)] md:self-start">
          {t('FAQ')}
        </h2>
        <ul className="border-t border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const id = `${base}-${i}`;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-3 text-left lg:py-[0.9vw]"
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-moss" />
                      <span className="font-sans text-[20px] leading-tight tracking-[-0.02em] lg:text-[calc(.7vw+1.25rem)]">
                        {item.q}
                      </span>
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className={`shrink-0 text-moss transition-transform duration-500 ease-soft ${isOpen ? 'rotate-45' : ''}`}
                    >
                      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={id}
                      role="region"
                      aria-label={item.q}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-4 pt-1 pb-6 md:grid-cols-[1fr_1.2fr] md:gap-grid">
                        <div className="grid grid-cols-[1.6fr_1fr] items-end gap-2.5">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-media">
                            <Media media={item.images[0]} ratio={4 / 5} sizes="(min-width: 768px) 20vw, 60vw" label={false} />
                          </div>
                          <div className="relative aspect-[3/4] overflow-hidden rounded-media">
                            <Media media={item.images[1]} ratio={3 / 4} sizes="(min-width: 768px) 12vw, 40vw" label={false} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          {item.a.map((p, k) => (
                            <p key={k} className="text-body">
                              {p}
                            </p>
                          ))}
                          {item.verify && (
                            <p className="flex flex-wrap items-center gap-2 text-[13px] text-beni">
                              <VerifyTag /> {item.verify}
                            </p>
                          )}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
