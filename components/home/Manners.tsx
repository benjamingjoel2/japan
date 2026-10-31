import { t, tx } from '@/lib/i18n/server';
import { manners, mannersIntro } from '@/data/manners';
import { Reveal } from '@/components/ui/Reveal';

/** Huge stacked lines, each with a small kind note and a dot. */
export function Manners() {
  return (
    <section id="manners" aria-labelledby="manners-h" className="bg-washi px-gutter py-section">
      <header className="mb-12 text-center lg:mb-[4vw]">
        <h2 id="manners-h" className="text-label text-sumi">
          {t('Manners, gently')}
        </h2>
        <p className="mx-auto mt-3 max-w-[36ch] text-body text-sumi-soft">{t(mannersIntro)}</p>
      </header>
      <ul className="flex flex-col items-center">
        {tx(manners).map((m, i) => (
          <li key={m.line} className="group w-full">
            <Reveal amount={0.5} className="flex flex-col items-center py-2 text-center md:py-[0.6vw]">
              <span className="font-display text-[11vw] leading-[0.85] font-light tracking-[-0.01em] text-moss-light uppercase transition-colors duration-500 group-hover:text-moss md:text-[8vw]">
                {m.line}
              </span>
              <span className="mt-2 flex max-w-[44ch] items-start gap-2 text-left text-body text-sumi-soft md:mt-[0.5vw]">
                <span
                  aria-hidden="true"
                  className={`mt-[0.45em] size-1.5 shrink-0 rounded-full ${i % 2 ? 'bg-moss' : 'bg-beni'}`}
                />
                {m.note}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
