import { initLocale, t, tx } from '@/lib/i18n/server';
import { msg } from '@/lib/i18n/config';
import { stays } from '@/data/stays';
import { destinations } from '@/data/destinations';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { StayCard } from '@/components/cards/Cards';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Stays',
    description: 'Ryokan, temple lodgings, machiya townhouses, mountain onsen inns and a few design hotels, chosen for their people as much as their rooms.',
    path: '/stays',
  });
}

const types = ['ryokan', 'shukubo', 'machiya', 'onsen inn', 'design hotel'] as const;
const typeNotes: Record<(typeof types)[number], string> = {
  ryokan: msg('Traditional inns: tatami, futon, a bath, and dinner that follows the season.'),
  shukubo: msg('Temple lodgings. Vegetarian shōjin ryōri and an optional dawn service.'),
  machiya: msg('Old wooden townhouses, restored, with your own key.'),
  'onsen inn': msg('Small mountain inns built around hot springs.'),
  'design hotel': msg('For the cities and the islands, where a ryokan isn’t the right fit.'),
};

export default async function StaysPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  const destName = Object.fromEntries(tx(destinations).map((d) => [d.slug, d.name]));
  return (
    <>
      <PageHeader
        label={t('Stays')}
        title={t('Where you’ll sleep')}
        lead={t('Fewer places, longer stays. These are examples of the kinds of inns we use. Names here are placeholders until our partner list is published.')}
      />
      {types.map((ty) => {
        const list = stays.filter((s) => s.type === ty);
        if (!list.length) return null;
        return (
          <section key={ty} aria-labelledby={`t-${ty.replace(' ', '-')}`} className="border-t border-line px-gutter py-12 lg:py-[4vw]">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h2 id={`t-${ty.replace(' ', '-')}`} className="font-display text-[40px] leading-none capitalize lg:text-[3.4vw]">
                {ty === 'shukubo' ? t('Shukubo') : t(ty)}
              </h2>
              <p className="max-w-[44ch] text-[15px] text-sumi-soft">{t(typeNotes[ty])}</p>
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
