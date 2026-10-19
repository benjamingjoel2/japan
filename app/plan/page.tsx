import { Suspense } from 'react';
import { journeys } from '@/data/journeys';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlanForm } from '@/components/features/PlanForm';
import { CurrencySwitcher } from '@/components/ui/Price';

export const metadata = pageMeta({
  title: 'Plan with us',
  description: 'Tell us when you would like to travel and what you love. A Komorebi specialist will write back with ideas, no obligation.',
  path: '/plan',
});

export default function PlanPage() {
  return (
    <>
      <PageHeader
        label="Plan with us"
        title="Tell us a little"
        lead="When you’d like to go, what you love, how you like to travel. We’ll write back with a first sketch, then plan it together."
      >
        <CurrencySwitcher />
      </PageHeader>
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[1fr_44rem_1fr]">
        <div className="lg:col-start-2">
          <Suspense fallback={null}>
            <PlanForm journeyTitles={Object.fromEntries(journeys.map((j) => [j.slug, j.title]))} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
