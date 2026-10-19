import Link from 'next/link';
import { microSeasons, sekki } from '@/data/seasons';
import { journeys } from '@/data/journeys';
import { formatRange } from '@/lib/seasons';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { VerifyTag } from '@/components/ui/Tags';
import { TodaySeason } from '@/components/features/TodaySeason';
import { MicroSeasonNow } from '@/components/features/LiveInfo';

export const metadata = pageMeta({
  title: 'The 72 Seasons',
  description:
    'Japan’s old calendar divides the year into 72 micro-seasons of about five days each. All 72, with what is happening in nature and on the table, and the journeys that pass through them.',
  path: '/seasons',
});

const quarters = [
  { name: 'Spring', ja: '春', from: 1 },
  { name: 'Summer', ja: '夏', from: 19 },
  { name: 'Autumn', ja: '秋', from: 37 },
  { name: 'Winter', ja: '冬', from: 55 },
];

const journeyTitle = Object.fromEntries(journeys.map((j) => [j.slug, j.title]));

export default function SeasonsPage() {
  return (
    <>
      <PageHeader
        label="The 72 Seasons"
        ja="七十二候"
        title="A year in seventy-two parts"
        lead={
          <>
            Japan&rsquo;s old calendar splits the year into 24 solar terms, and each of those into three. Seventy-two
            seasons of about five days, each named for something small that happens: rainbows appear, frogs begin to sing.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-body">
            Today: <MicroSeasonNow className="font-medium" />
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <TodaySeason />
            <VerifyTag note="Names, readings and dates to be verified against a reliable source before launch." />
            <span className="text-[13px] text-moss">Dates are approximate and shift by a day from year to year.</span>
          </div>
        </div>
      </PageHeader>

      <div className="grid gap-grid px-gutter pb-section lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Solar terms" className="hidden lg:block">
          <ol className="sticky top-[calc(var(--header-h)+1rem)] flex max-h-[calc(100svh-var(--header-h)-2rem)] flex-col gap-1 overflow-y-auto text-[13px]">
            {sekki.map((s, i) => (
              <li key={s.romaji}>
                <a href={`#ko-${i * 3 + 1}`} className="flex gap-2 text-sumi-soft hover:text-sumi">
                  <span lang="ja" className="w-10 shrink-0 font-jp">
                    {s.ja}
                  </span>
                  <span>{s.en}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div>
          {quarters.map((q) => (
            <section key={q.name} aria-labelledby={`q-${q.name}`} className="mb-16">
              <h2 id={`q-${q.name}`} className="sticky top-[var(--header-h)] z-10 flex items-baseline gap-3 border-b border-line bg-washi/95 py-3 font-display text-[40px] leading-none backdrop-blur lg:text-[3.4vw]">
                {q.name}
                <span lang="ja" className="font-jp text-[0.5em] text-moss">
                  {q.ja}
                </span>
              </h2>
              <ol className="grid gap-x-[var(--gap)] md:grid-cols-2 xl:grid-cols-3">
                {microSeasons
                  .filter((s) => s.n >= q.from && s.n < q.from + 18)
                  .map((s) => (
                    <li
                      key={s.n}
                      id={`ko-${s.n}`}
                      className="group scroll-mt-[calc(var(--header-h)+5rem)] border-b border-line py-5 data-[today=true]:-mx-3 data-[today=true]:rounded-media data-[today=true]:border-transparent data-[today=true]:bg-sumi data-[today=true]:px-3 data-[today=true]:text-washi"
                    >
                      <article className="flex h-full flex-col gap-2">
                        <header className="flex items-baseline justify-between gap-3">
                          <span className="label tabular-nums group-data-[today=true]:text-moss-pale">
                            No. {s.n} · {s.sekkiEn}
                          </span>
                          <span className="text-[13px] text-sumi-soft tabular-nums group-data-[today=true]:text-washi/70">
                            {formatRange(s.start, s.end)}
                          </span>
                        </header>
                        <p lang="ja" className="font-jp text-[22px] leading-tight">
                          {s.ja}
                        </p>
                        <h3 className="font-display text-[26px] leading-tight lg:text-[1.7vw]">{s.en}</h3>
                        <p className="text-[13px] text-moss italic group-data-[today=true]:text-moss-pale">{s.romaji}</p>
                        <span data-today-badge hidden className="w-fit rounded-full bg-beni px-2 py-0.5 text-[11px] uppercase">
                          Today
                        </span>
                        <dl className="mt-1 grid gap-2 text-[15px] leading-snug">
                          <div>
                            <dt className="sr-only">In nature</dt>
                            <dd>{s.nature}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="shrink-0 text-moss group-data-[today=true]:text-moss-pale">On the table</dt>
                            <dd>{s.onTheTable}</dd>
                          </div>
                        </dl>
                        {s.journeys.length > 0 && (
                          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                            {s.journeys.map((j) => (
                              <li key={j}>
                                <Link
                                  href={`/journeys/${j}`}
                                  className="inline-block rounded-full border border-current/25 px-2.5 py-1 text-[12px] hover:bg-sumi hover:text-washi"
                                >
                                  {journeyTitle[j]}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    </li>
                  ))}
              </ol>
            </section>
          ))}
          <p className="max-w-[60ch] text-[13px] text-moss">
            Source note: names and dates follow the commonly published modern table of the 72 kō. Verify against a reliable
            source before launch. Readings vary; some kō have more than one accepted romanisation.
          </p>
        </div>
      </div>
    </>
  );
}
