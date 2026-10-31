import { initLocale, t, tx } from '@/lib/i18n/server';
import { pageMeta } from '@/lib/seo';
import { stays } from '@/data/stays';
import { included } from '@/data/included';
import { ryokanNight } from '@/data/ryokan-night';
import { Hero } from '@/components/home/Hero';
import { AboutInfo } from '@/components/home/AboutInfo';
import { Values } from '@/components/home/Values';
import { StayIntro } from '@/components/home/StayIntro';
import { IncludedStack } from '@/components/home/IncludedStack';
import { StaySlider } from '@/components/home/StaySlider';
import { JourneysVideo } from '@/components/home/JourneysVideo';
import { DayCarousel } from '@/components/home/DayCarousel';
import { RyokanStory } from '@/components/home/RyokanStory';
import { Manners } from '@/components/home/Manners';
import { Faq } from '@/components/home/Faq';
import { faq } from '@/data/faq';
import { JsonLd } from '@/components/ui/JsonLd';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  const meta = pageMeta({ title: `${site.name}: ${t(site.tagline)}`, description: t(site.description), path: '/', raw: true });
  return { ...meta, title: { absolute: `${site.name}: ${t(site.tagline)}` } };
}

export default async function Home({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  const faqT = tx(faq);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'TravelAgency',
              name: site.name,
              url: site.url,
              description: t(site.description),
              slogan: t(site.tagline),
              email: site.company.email,
              address: { '@type': 'PostalAddress', ...site.company.postal },
              areaServed: 'Japan',
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqT.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
              })),
            },
          ],
        }}
      />
      <Hero />
      <AboutInfo />
      <Values />
      <section id="stay" aria-label={t('Stay')} className="bg-washi">
        <StayIntro />
        <IncludedStack items={tx(included)} />
        <StaySlider stays={tx(stays)} />
      </section>
      <JourneysVideo />
      <DayCarousel />
      <RyokanStory night={tx(ryokanNight)} />
      <Manners />
      <Faq items={faqT} />
    </>
  );
}
