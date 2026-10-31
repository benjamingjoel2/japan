import { t, tx } from '@/lib/i18n/server';
import { values } from '@/data/values';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';

/** Full-bleed image held still while the three values pass over it, one per screen. */
export function Values() {
  return (
    <section id="values" aria-labelledby="values-h" className="relative bg-washi">
      <h2 id="values-h" className="py-6 text-center font-display text-[32px] text-moss lg:text-[3.2vw]">
        {t('Values')}
      </h2>
      <div className="relative">
        <div className="sticky top-0 h-svh overflow-hidden">
          <Media media={{ subject: 'Mountain temple veranda in morning mist, Kōyasan', tone: 'mist' }} sizes="100vw" label={false} />
          <div aria-hidden="true" className="absolute inset-0 bg-sumi/30" />
        </div>
        <ul className="relative -mt-[100svh]">
          {tx(values).map((v) => (
            <li key={v.word} className="flex h-svh flex-col items-center justify-center px-gutter text-center text-washi">
              <Reveal amount={0.6}>
                <p lang="ja" className="font-jp text-[18px] opacity-80 lg:text-[1.4vw]">
                  {v.ja}
                </p>
                <h3 className="mt-1 font-display text-[64px] leading-none lg:text-[6vw]">{v.word}</h3>
                <p className="mx-auto mt-4 max-w-[30ch] text-body lg:mt-[1vw]">{v.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
