import { initLocale, t, tx } from '@/lib/i18n/server';
import Link from '@/components/i18n/Link';
import { destinations } from '@/data/destinations';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { DestinationCard } from '@/components/cards/Cards';
import { JapanMap, project } from '@/components/features/JapanMap';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Destinations',
    description:
      'Where we go in Japan: Tokyo, Kyoto, Nara, Kanazawa, the Alps, Hakone and Fuji, the Kiso Valley, Kōyasan, the Kumano Kodo, the art islands, Hiroshima, Hokkaido, Okinawa and Kyushu.',
    path: '/destinations',
  });
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return (
    <>
      <PageHeader
        label={t('Where we go')}
        title={t('Fourteen places we know well')}
        lead={t('Not every corner of Japan. The ones where we know the innkeepers, the back roads and the best hour to arrive.')}
      />
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[0.7fr_1.3fr] lg:gap-grid">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <JapanMap className="mx-auto h-auto w-full max-w-[30rem] text-sumi" title={t('Map of Komorebi destinations')}>
            {destinations.map((d) => {
              const [x, y] = project(d.lat, d.lng);
              return (
                <Link key={d.slug} href={`/destinations/${d.slug}`} aria-label={t(d.name)}>
                  <circle cx={x} cy={y} r={11} fill="var(--color-beni)" stroke="var(--color-washi)" strokeWidth={3} />
                  <text x={x + 16} y={y + 7} fontSize={22} fill="currentColor" stroke="var(--color-washi)" strokeWidth={5} paintOrder="stroke">
                    {t(d.name.replace(/^The /, '').split(' & ')[0])}
                  </text>
                </Link>
              );
            })}
          </JapanMap>
        </div>
        <ul className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-10 md:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 0.06}>
              <DestinationCard d={d} priority={i === 0} />
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
