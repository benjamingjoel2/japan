import { kyotoWeek } from '@/data/kyoto-week';
import { Marquee } from '@/components/ui/Marquee';
import { Media } from '@/components/ui/Media';
import { SplitWords } from '@/components/ui/Reveal';

export function DayCarousel() {
  return (
    <section aria-labelledby="week-h" className="bg-washi pt-section pb-section">
      <div className="mb-10 px-gutter lg:mb-[3vw]">
        <SplitWords id="week-h" as="h2" text={kyotoWeek.title} className="max-w-[12ch] text-h2" />
        <p className="mt-5 max-w-[42ch] text-body">{kyotoWeek.intro}</p>
      </div>
      <Marquee label={kyotoWeek.title} speed={0.8}>
        {kyotoWeek.days.map((d) => (
          <article
            key={d.day}
            className="relative isolate flex h-[78svh] max-h-[640px] w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-media p-4 pl-[var(--gutter)] text-washi first:ml-[var(--gutter)] mr-2.5 md:mr-4 md:h-[36vw] md:max-h-none md:w-[26vw] md:p-[1vw] md:first:ml-0 md:first:pl-[1vw]"
          >
            <div className="absolute inset-0 -z-10">
              <Media media={d.image ?? { subject: d.place, tone: 'leaf' }} ratio={0.72} sizes="(min-width: 768px) 26vw, 80vw" label={false} />
              <div className="absolute inset-0 bg-gradient-to-b from-sumi/60 via-sumi/25 to-sumi/80" />
            </div>
            <header className="flex items-start justify-between gap-3">
              <h3 className="text-h3">{d.title}</h3>
              <span className="shrink-0 pt-1 text-label">Day {d.day}</span>
            </header>
            <div className="grid gap-2 text-[14px] leading-snug lg:text-[0.95vw]">
              <p className="label text-washi/70">{d.place}</p>
              <dl className="grid gap-2">
              {(['morning', 'afternoon', 'evening'] as const).map((k) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2 border-t border-washi/25 pt-2 lg:grid-cols-[6vw_1fr]">
                  <dt className="capitalize text-washi/70">{k}</dt>
                  <dd>{d[k]}</dd>
                </div>
              ))}
              </dl>
            </div>
          </article>
        ))}
      </Marquee>
    </section>
  );
}
