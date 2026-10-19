import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJourney, journeys } from '@/data/journeys';
import { stays } from '@/data/stays';
import { destinations } from '@/data/destinations';
import { seasonsForMonths, formatRange } from '@/lib/seasons';
import { pageMeta } from '@/lib/seo';
import { site } from '@/config/site';
import { Media } from '@/components/ui/Media';
import { Price, CurrencySwitcher } from '@/components/ui/Price';
import { Button } from '@/components/ui/Button';
import { Reveal, SplitWords } from '@/components/ui/Reveal';
import { SpecTable } from '@/components/ui/SpecTable';
import { StayCard, JourneyCard, monthsLabel } from '@/components/cards/Cards';
import { JsonLd } from '@/components/ui/JsonLd';
import { VerifyTag } from '@/components/ui/Tags';

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const j = getJourney((await params).slug);
  if (!j) return {};
  return pageMeta({ title: j.title, description: `${j.tagline} ${j.days} days, private and unhurried.`, path: `/journeys/${j.slug}` });
}

const destName = Object.fromEntries(destinations.map((d) => [d.slug, d.name]));

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const j = getJourney((await params).slug);
  if (!j) notFound();
  const jStays = stays.filter((s) => j.stays.includes(s.slug));
  const kos = seasonsForMonths(j.bestMonths);
  const others = journeys.filter((o) => o.slug !== j.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: j.title,
          description: j.summary.join(' '),
          touristType: 'Private, slow travel',
          itinerary: {
            '@type': 'ItemList',
            itemListElement: j.itinerary.map((d) => ({ '@type': 'ListItem', position: d.day, name: `${d.title}, ${d.place}` })),
          },
          offers: { '@type': 'Offer', price: j.fromJPY, priceCurrency: 'JPY', url: `${site.url}/journeys/${j.slug}` },
          provider: { '@type': 'TravelAgency', name: site.name, url: site.url },
        }}
      />
      <header className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-night text-washi">
        <Media media={j.image} sizes="100vw" priority />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-night/30" />
        <div className="relative px-gutter pt-[calc(var(--header-h)+3rem)] pb-10 lg:pb-[3vw]">
          <p className="label text-washi/75">
            <Link href="/journeys" className="hover:underline">
              Journeys
            </Link>{' '}
            · {j.days} days
          </p>
          <SplitWords as="h1" text={j.title} className="mt-3 max-w-[18ch] text-h2" />
          <p className="mt-4 max-w-[40ch] text-lead">{j.tagline}</p>
        </div>
      </header>

      <section className="grid gap-10 px-gutter py-section md:grid-cols-[1.3fr_1fr] md:gap-grid">
        <div className="flex max-w-[60ch] flex-col gap-5">
          {j.summary.map((p, i) => (
            <Reveal as="p" key={i} className={i ? 'text-body text-sumi-soft' : 'text-lead'}>
              {p}
            </Reveal>
          ))}
        </div>
        <aside className="flex flex-col gap-5 md:sticky md:top-[calc(var(--header-h)+1rem)] md:self-start">
          <p className="font-display text-[34px] leading-none lg:text-[2.6vw]">
            <Price jpy={j.fromJPY} />
          </p>
          <CurrencySwitcher />
          <SpecTable
            className="border-t border-line pt-4"
            rows={[
              { label: 'Length', value: `${j.days} days` },
              { label: 'Best months', value: monthsLabel(j.bestMonths) },
              { label: 'Style', value: 'Private, guided in places' },
              { label: 'Pace', value: 'Unhurried' },
            ]}
          />
          <div>
            <p className="label mb-2">Places</p>
            <ul className="flex flex-wrap gap-1.5">
              {j.destinations.map((d) => (
                <li key={d}>
                  <Link href={`/destinations/${d}`} className="inline-block rounded-full border border-line px-3 py-1 text-[13px] hover:bg-sumi hover:text-washi">
                    {destName[d]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Button href={`/plan?journey=${j.slug}`}>Plan this with us</Button>
          <p className="flex items-center gap-2 text-[12px] text-moss">
            <VerifyTag /> Prices are indicative placeholders, per person sharing.
          </p>
        </aside>
      </section>

      <section aria-labelledby="days-h" className="px-gutter pb-section">
        <h2 id="days-h" className="mb-8 text-h2">
          Day by day
        </h2>
        <ol className="border-t border-line">
          {j.itinerary.map((d) => {
            const stay = d.stay ? stays.find((s) => s.slug === d.stay) : undefined;
            return (
              <li key={d.day} className="grid gap-4 border-b border-line py-6 md:grid-cols-[8rem_1fr_2fr] md:gap-grid">
                <p className="label tabular-nums">Day {d.day}</p>
                <div>
                  <h3 className="text-h3">{d.title}</h3>
                  <p className="mt-1 text-[14px] text-moss">{d.place}</p>
                  {stay && (
                    <Link href={`/stays/${stay.slug}`} className="mt-2 inline-block text-[13px] underline underline-offset-4">
                      Night at {stay.name}
                    </Link>
                  )}
                </div>
                <dl className="grid gap-2 text-[15px] md:grid-cols-3 md:gap-grid">
                  {(['morning', 'afternoon', 'evening'] as const).map((k) => (
                    <div key={k}>
                      <dt className="capitalize text-moss">{k}</dt>
                      <dd className="mt-0.5">{d[k]}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="exp-h" className="bg-night px-gutter py-section text-washi">
        <div className="grid gap-10 md:grid-cols-2 md:gap-grid">
          <div>
            <h2 id="exp-h" className="text-h2">
              What&rsquo;s in it
            </h2>
            <ul className="mt-8 flex flex-col">
              {j.experiences.map((e) => (
                <li key={e} className="flex gap-3 border-t border-washi/20 py-3 text-body">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-beni" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3">The seasons you&rsquo;ll travel through</h2>
            <p className="mt-2 max-w-[44ch] text-[15px] text-washi/75">
              In its best months ({monthsLabel(j.bestMonths)}), this journey passes through {kos.length} of the 72
              micro-seasons. A few of them:
            </p>
            <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {kos.slice(0, 12).map((k) => (
                <li key={k.n}>
                  <Link href={`/seasons#ko-${k.n}`} className="group block">
                    <span className="text-[12px] text-moss-light tabular-nums">{formatRange(k.start, k.end)}</span>
                    <span className="block text-[15px] group-hover:underline">
                      <span lang="ja" className="mr-2 font-jp">
                        {k.ja}
                      </span>
                      {k.en}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/seasons" className="mt-6 inline-block text-[14px] underline underline-offset-4">
              All 72 seasons
            </Link>
          </div>
        </div>
      </section>

      {jStays.length > 0 && (
        <section aria-labelledby="stays-h" className="px-gutter py-section">
          <h2 id="stays-h" className="mb-10 text-h2">
            Where you&rsquo;ll sleep
          </h2>
          <ul className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {jStays.map((s) => (
              <li key={s.slug}>
                <StayCard s={s} destination={destName[s.destination]} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-t border-line px-gutter py-section">
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[30ch] text-lead">Every day above can move. Tell us what you&rsquo;d change.</p>
          <Button href={`/plan?journey=${j.slug}`}>Plan with us</Button>
        </div>
        <h2 className="label mb-6">Other journeys</h2>
        <ul className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <JourneyCard j={o} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
