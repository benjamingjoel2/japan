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
import { PortraitQuote } from '@/components/home/PortraitQuote';
import { Team } from '@/components/home/Team';
import { Words } from '@/components/home/Words';
import { Faq } from '@/components/home/Faq';
import { faq } from '@/data/faq';
import { JsonLd } from '@/components/ui/JsonLd';
import { site } from '@/config/site';

export default function Home() {
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
              description: site.description,
              slogan: site.tagline,
              areaServed: 'Japan',
            },
            {
              '@type': 'FAQPage',
              mainEntity: faq.map((f) => ({
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
      <section id="stay" aria-label="Stay" className="bg-washi">
        <StayIntro />
        <IncludedStack />
        <StaySlider />
      </section>
      <JourneysVideo />
      <DayCarousel />
      <RyokanStory />
      <Manners />
      <PortraitQuote />
      <Team />
      <Words />
      <Faq />
    </>
  );
}
