import { getLocale, initLocale, lhref, t, tx } from '@/lib/i18n/server';
import Link from '@/components/i18n/Link';
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
import { Reveal } from '@/components/ui/Reveal';
import { HeadingWords } from '@/components/ui/HeadingWords';
import { SpecTable } from '@/components/ui/SpecTable';
import { StayCard, JourneyCard, monthsLabel } from '@/components/cards/Cards';
import { JsonLd } from '@/components/ui/JsonLd';
import { VerifyTag } from '@/components/ui/Tags';

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  await initLocale(params);
  const raw = getJourney((await params).slug);
  if (!raw) return {};
  const j = tx(raw);
  return pageMeta({ title: j.title, description: `${j.tagline} ${t('{n} days, private and unhurried.', { n: j.days })}`, path: `/journeys/${j.slug}`, raw: true });
}


export default async function JourneyPage({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  await initLocale(params);
  const raw = getJourney((await params).slug);
  if (!raw) notFound();
  const j = tx(raw);
  const locale = getLocale();
  const destName = Object.fromEntries(tx(destinations).map((d) => [d.slug, d.name]));
  const allStays = tx(stays);
  const jStays = allStays.filter((s) => j.stays.includes(s.slug));
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
          touristType: t('Private, slow travel'),
          itinerary: {
            '@type': 'ItemList',
            itemListElement: j.itinerary.map((d) => ({ '@type': 'ListItem', position: d.day, name: `${d.title}, ${d.place}` })),
          },
          offers: { '@type': 'Offer', price: j.fromJPY, priceCurrency: 'JPY', url: `${site.url}${lhref(`/journeys/${j.slug}`)}` },
          provider: { '@type': 'TravelAgency', name: site.name, url: site.url, email: site.company.email, address: { '@type': 'PostalAddress', ...site.company.postal } },
        }}
      />
      <header className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-night text-washi">
        <Media media={j.image} sizes="100vw" priority phoneRatio={0.55} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-night/30" />
        <div className="relative px-gutter pt-[calc(var(--header-h)+3rem)] pb-10 lg:pb-[3vw]">
          <p className="label text-washi/75">
            <Link href="/journeys" className="hover:underline">
              {t('Journeys')}
            </Link>{' '}
            · {t('{n} days', { n: j.days })}
          </p>
          <HeadingWords text={j.title} className="mt-3 max-w-[18ch] text-h2" />
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
              { label: t('Length'), value: t('{n} days', { n: j.days }) },
              { label: t('Best months'), value: monthsLabel(j.bestMonths) },
              { label: t('Style'), value: t('Private, guided in places') },
              { label: t('Pace'), value: t('Unhurried') },
            ]}
          />
          <div>
            <p className="label mb-2">{t('Places')}</p>
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
          <Button href={`/plan?journey=${j.slug}`}>{t('Plan this with us')}</Button>
          <p className="flex items-center gap-2 text-[12px] text-moss">
            <VerifyTag /> {t('Prices are indicative placeholders, per person sharing.')}
          </p>
        </aside>
      </section>

      <section aria-labelledby="days-h" className="px-gutter pb-section">
        <h2 id="days-h" className="mb-8 text-h2">
          {t('Day by day')}
        </h2>
        <ol className="border-t border-line">
          {j.itinerary.map((d) => {
            const stay = d.stay ? allStays.find((s) => s.slug === d.stay) : undefined;
            return (
              <li key={d.day} className="grid gap-4 border-b border-line py-6 md:grid-cols-[8rem_1fr_2fr] md:gap-grid">
                <p className="label tabular-nums">{t('Day {n}', { n: d.day })}</p>
                <div>
                  <h3 className="text-h3">{d.title}</h3>
                  <p className="mt-1 text-[14px] text-moss">{d.place}</p>
                  {stay && (
                    <Link href={`/stays/${stay.slug}`} className="mt-2 inline-block text-[13px] underline underline-offset-4">
                      {t('Night at {name}', { name: stay.name })}
                    </Link>
                  )}
                </div>
                <dl className="grid gap-2 text-[15px] md:grid-cols-3 md:gap-grid">
                  {(['morning', 'afternoon', 'evening'] as const).map((k) => (
                    <div key={k}>
                      <dt className="capitalize text-moss">{t(k)}</dt>
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
              {t('What’s in it')}
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
            <h2 className="text-h3">{t('The seasons you’ll travel through')}</h2>
            <p className="mt-2 max-w-[44ch] text-[15px] text-washi/75">
              {t('In its best months ({months}), this journey passes through {n} of the 72 micro-seasons. A few of them:', { months: monthsLabel(j.bestMonths), n: kos.length })}
            </p>
            <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {kos.slice(0, 12).map((k) => (
                <li key={k.n}>
                  <Link href={`/seasons#ko-${k.n}`} className="group block">
                    <span className="text-[12px] text-moss-pale tabular-nums">{formatRange(k.start, k.end, locale)}</span>
                    <span className="block text-[15px] group-hover:underline">
                      <span lang="ja" className="mr-2 font-jp">
                        {k.ja}
                      </span>
                      {t(k.en)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/seasons" className="mt-6 inline-block text-[14px] underline underline-offset-4">
              {t('All 72 seasons')}
            </Link>
          </div>
        </div>
      </section>

      {jStays.length > 0 && (
        <section aria-labelledby="stays-h" className="px-gutter py-section">
          <h2 id="stays-h" className="mb-10 text-h2">
            {t('Where you’ll sleep')}
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
          <p className="max-w-[30ch] text-lead">{t('Every day above can move. Tell us what you’d change.')}</p>
          <Button href={`/plan?journey=${j.slug}`}>{t('Plan with us')}</Button>
        </div>
        <h2 className="label mb-6">{t('Other journeys')}</h2>
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
