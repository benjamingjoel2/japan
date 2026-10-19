import { journeys } from '@/data/journeys';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { CurrencySwitcher } from '@/components/ui/Price';
import { JourneyCard } from '@/components/cards/Cards';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = pageMeta({
  title: 'Journeys',
  description:
    'Eight private, slow journeys through Japan: Kyoto and Nara, the old roads, the art islands, blossom, autumn in the Alps, snow and onsen, a first trip done well, and craft.',
  path: '/journeys',
});

export default function JourneysPage() {
  return (
    <>
      <PageHeader
        label="Journeys"
        title="Eight ways to begin"
        lead="Each one is a starting point, not a package. We rewrite it around your dates, your pace and the season you arrive in."
      >
        <CurrencySwitcher />
      </PageHeader>
      <ul className="grid gap-x-[var(--gap)] gap-y-14 px-gutter pb-section md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((j, i) => (
          <Reveal as="li" key={j.slug} delay={(i % 3) * 0.08}>
            <JourneyCard j={j} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}
