import { site } from '@/config/site';
import { videos } from '@/config/media';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

/**
 * Full-screen sticky video. The wrapper is 200vh and the next section pulls itself up by
 * 100vh, so the page slides over the hero rather than the hero scrolling away.
 */
export function Hero() {
  return (
    <div id="top" className="relative h-[200svh]">
      <section aria-label="Komorebi" className="sticky top-0 flex h-svh flex-col overflow-hidden bg-night">
        <VideoPlayer
          media={{
            subject: 'Light through maple leaves, Kyoto, 7am',
            tone: 'leaf',
            alt: 'Morning light filtering through maple leaves',
            captions: '/captions/hero.vtt',
          }}
          src={videos.hero}
          priority
          drift
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/0 to-night/70" />

        <div className="relative mt-auto px-gutter pb-[3vw] text-washi lg:pb-[1.2vw]">
          <div className="flex items-end justify-between gap-6">
            {site.heroTags.map((pair, i) => (
              <p
                key={i}
                className={`rise-in flex flex-wrap gap-x-3 text-body ${i ? 'justify-end text-right' : ''}`}
                style={{ ['--d' as string]: `${0.9 + i * 0.1}s` }}
              >
                {pair.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            ))}
          </div>
          <h1 className="mt-2 flex justify-between font-display text-hero uppercase lg:mt-0">
            <span className="sr-only">Komorebi. {site.tagline}</span>
            {['Komo', 'rebi'].map((w, i) => (
              <span key={w} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                <span className="word-up block" style={{ ['--d' as string]: `${0.25 + i * 0.12}s` }}>
                  {w}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </section>
    </div>
  );
}
