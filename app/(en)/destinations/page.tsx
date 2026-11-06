import { initLocale, t, tx } from '@/lib/i18n/server';
import Link from '@/components/i18n/Link';
import { destinations } from '@/data/destinations';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { DestinationCard } from '@/components/cards/Cards';
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
      <div className="px-gutter pb-section">
        <ul className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-10 md:grid-cols-3 lg:grid-cols-4">
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
