import { getLocale, initLocale, t, tx } from '@/lib/i18n/server';
import Link from '@/components/i18n/Link';
import { notFound } from 'next/navigation';
import { destinations } from '@/data/destinations';
import { journeys } from '@/data/journeys';
import { stays } from '@/data/stays';
import { quietPairings } from '@/data/quiet';
import { pageMeta } from '@/lib/seo';
import { Media } from '@/components/ui/Media';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { HeadingWords } from '@/components/ui/HeadingWords';
import { JourneyCard, StayCard } from '@/components/cards/Cards';
import { JapanMap } from '@/components/features/JapanMap';
import { VerifyTag } from '@/components/ui/Tags';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

const get = (slug: string) => destinations.find((d) => d.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  await initLocale(params);
  const raw = get((await params).slug);
  if (!raw) return {};
  const d = tx(raw);
  return pageMeta({ title: d.name, description: `${d.tagline} ${d.intro[0]}`.slice(0, 160), path: `/destinations/${d.slug}`, raw: true });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  await initLocale(params);
  const raw = get((await params).slug);
  if (!raw) notFound();
  const d = tx(raw);
  const dJourneys = journeys.filter((j) => d.journeys.includes(j.slug) || j.destinations.includes(d.slug));
  const dStays = stays.filter((s) => s.destination === d.slug);
  const dQuiet = quietPairings.filter((q) => q.destination === d.slug);

  return (
    <>
      <header className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-night text-washi">
        <Media media={d.image} sizes="100vw" priority phoneRatio={0.55} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-night/30" />
        <div className="relative flex items-end justify-between gap-6 px-gutter pt-[calc(var(--header-h)+3rem)] pb-10 lg:pb-[3vw]">
          <div>
            <p className="label text-washi/75">
              <Link href="/destinations" className="hover:underline">
                {t('Destinations')}
              </Link>{' '}
              · {d.region}
              {d.ja && (
                <span lang="ja" className="ml-3 font-jp">
                  {d.ja}
                </span>
              )}
            </p>
            <HeadingWords text={d.name} className="mt-3 max-w-[16ch] text-h2" />
            <p className="mt-4 max-w-[40ch] text-lead">{d.tagline}</p>
          </div>
          <div className="hidden w-40 shrink-0 md:block lg:w-[12vw]">
            <JapanMap
              points={[{ id: d.slug, lat: d.lat, lng: d.lng }]}
              highlight={d.slug}
              land="rgb(244 239 228 / 0.18)"
              stroke="rgb(244 239 228 / 0.5)"
              className="h-auto w-full"
              title={t('Map showing {place}', { place: d.name })}
            />
          </div>
        </div>
      </header>

      <section className="grid gap-10 px-gutter py-section md:grid-cols-[1.3fr_1fr] md:gap-grid">
        <div className="flex max-w-[60ch] flex-col gap-5">
          {d.intro.map((p, i) => (
            <Reveal as="p" key={i} className={i ? 'text-body text-sumi-soft' : 'text-lead'}>
              {p}
            </Reveal>
          ))}
        </div>
        <aside className="flex flex-col gap-6">
          <div>
            <h2 className="label mb-3">{t('Best seasons')}</h2>
            <ul className="flex flex-col">
              {d.bestSeasons.map((s) => (
                <li key={s.season} className="border-t border-line py-3">
                  <p className="font-display text-[22px]">{s.season}</p>
                  <p className="mt-1 text-[15px] text-sumi-soft">{s.why}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label mb-3 flex items-center gap-2">
              {t('Quiet Japan tips')} <VerifyTag />
            </h2>
            <ul className="flex flex-col gap-2">
              {d.quietTips.map((tip) => (
                <li key={tip} className="flex gap-2 text-[15px]">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-moss" />
                  {tip}
                </li>
              ))}
            </ul>
            {dQuiet.length > 0 && (
              <Link href="/quiet-japan" className="mt-3 inline-block text-[14px] underline underline-offset-4">
                {dQuiet.length > 1 ? t('{n} more pairings on the Quiet Japan map', { n: dQuiet.length }) : t('1 more pairing on the Quiet Japan map')}
              </Link>
            )}
          </div>
        </aside>
      </section>

      {dStays.length > 0 && (
        <section aria-labelledby="dstays-h" className="px-gutter pb-section">
          <h2 id="dstays-h" className="mb-10 text-h2">
            {t('Stays')}
          </h2>
          <ul className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {dStays.map((s) => (
              <li key={s.slug}>
                <StayCard s={s} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {dJourneys.length > 0 && (
        <section aria-labelledby="dj-h" className="border-t border-line px-gutter py-section">
          <h2 id="dj-h" className="mb-10 text-h2">
            {t('Journeys through {place}', { place: getLocale() === 'en' ? d.name.replace(/^The /, 'the ') : d.name })}
          </h2>
          <ul className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {dJourneys.map((j) => (
              <li key={j.slug}>
                <JourneyCard j={j} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-t border-line px-gutter py-section">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[34ch] text-lead">{t('Want to spend longer here? Most people do.')}</p>
          <Button href={`/plan?destination=${d.slug}`}>{t('Plan with us')}</Button>
        </div>
      </section>
    </>
  );
}
