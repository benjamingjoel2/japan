import { stays } from '@/data/stays';
import { destinations } from '@/data/destinations';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { StayCard } from '@/components/cards/Cards';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = pageMeta({
  title: 'Stays',
  description: 'Ryokan, temple lodgings, machiya townhouses, mountain onsen inns and a few design hotels, chosen for their people as much as their rooms.',
  path: '/stays',
});

const destName = Object.fromEntries(destinations.map((d) => [d.slug, d.name]));
const types = ['ryokan', 'shukubo', 'machiya', 'onsen inn', 'design hotel'] as const;
const typeNotes: Record<(typeof types)[number], string> = {
  ryokan: 'Traditional inns: tatami, futon, a bath, and dinner that follows the season.',
  shukubo: 'Temple lodgings. Vegetarian shōjin ryōri and an optional dawn service.',
  machiya: 'Old wooden townhouses, restored, with your own key.',
  'onsen inn': 'Small mountain inns built around hot springs.',
  'design hotel': 'For the cities and the islands, where a ryokan isn’t the right fit.',
};

export default function StaysPage() {
  return (
    <>
      <PageHeader
        label="Stays"
        title="Where you'll sleep"
        lead="Fewer places, longer stays. These are examples of the kinds of inns we use. Names here are placeholders until our partner list is published."
      />
      {types.map((t) => {
        const list = stays.filter((s) => s.type === t);
        if (!list.length) return null;
        return (
          <section key={t} aria-labelledby={`t-${t}`} className="border-t border-line px-gutter py-12 lg:py-[4vw]">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h2 id={`t-${t}`} className="font-display text-[40px] leading-none capitalize lg:text-[3.4vw]">
                {t === 'shukubo' ? 'Shukubo' : t}
              </h2>
              <p className="max-w-[44ch] text-[15px] text-sumi-soft">{typeNotes[t]}</p>
            </div>
            <ul className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {list.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.06}>
                  <StayCard s={s} destination={destName[s.destination]} />
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
