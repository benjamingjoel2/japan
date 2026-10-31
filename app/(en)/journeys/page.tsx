import { initLocale, t, tx } from '@/lib/i18n/server';
import { journeys } from '@/data/journeys';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { JourneyCard } from '@/components/cards/Cards';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Journeys',
    description:
      'Eight private, slow journeys through Japan: Kyoto and Nara, the old roads, the art islands, blossom, autumn in the Alps, snow and onsen, a first trip done well, and craft.',
    path: '/journeys',
  });
}

export default async function JourneysPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return (
    <>
      <PageHeader
        label={t('Journeys')}
        title={t('Eight ways to begin')}
        lead={t('Each one is a starting point, not a package. We rewrite it around your dates, your pace and the season you arrive in.')}
      />
      <ul className="grid gap-x-[var(--gap)] gap-y-14 px-gutter pb-section md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((j, i) => (
          <Reveal as="li" key={j.slug} delay={(i % 3) * 0.08}>
            <JourneyCard j={j} priority={i === 0} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}
