'use client';

import { useState } from 'react';
import { team } from '@/data/team';
import { Media } from '@/components/ui/Media';
import { Dialog } from '@/components/ui/Dialog';
import { Reveal } from '@/components/ui/Reveal';
import { PlaceholderTag } from '@/components/ui/Tags';

export function Team() {
  const [open, setOpen] = useState<number | null>(null);
  const m = open === null ? null : team[open];
  return (
    <section id="team" aria-labelledby="team-h" className="bg-washi px-gutter py-section">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr] md:gap-grid">
        <div>
          <div className="md:sticky md:top-[calc(var(--header-h)+1rem)]">
            <h2 id="team-h" className="text-h2">
              The people who plan it
            </h2>
            <p className="mt-5 max-w-[32ch] text-body">
              Specialists who have lived in Japan for years and guides who never left. Tap a card to read more.
            </p>
            <PlaceholderTag className="mt-4 text-moss" />
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-6 lg:grid-cols-3">
          {team.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={(i % 3) * 0.08}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-haspopup="dialog"
                  className="group block w-full text-left"
                >
                  <span className="mb-1.5 block font-display text-[20px] text-moss lg:text-[1.4vw]">{p.name}</span>
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-media">
                    <span className="absolute inset-0 transition-transform duration-700 ease-soft group-hover:scale-[1.04]">
                      <Media media={p.image} ratio={3 / 4} sizes="(min-width: 992px) 18vw, 45vw" label={false} />
                    </span>
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-sumi/60 to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[13px] text-washi lg:text-[0.9vw]">{p.role}</span>
                    <span
                      aria-hidden="true"
                      className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-washi/90 text-sumi opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      +
                    </span>
                  </span>
                  <span className="sr-only">Read {p.name}&rsquo;s bio</span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open !== null} onClose={() => setOpen(null)} label={m ? `${m.name}, ${m.role}` : 'Team member'}>
        {m && (
          <div className="grid gap-6 p-4 md:grid-cols-[0.8fr_1.2fr] md:p-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-media">
              <Media media={m.image} ratio={3 / 4} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            <div className="flex flex-col gap-4 md:pr-10">
              <div>
                <h3 className="font-display text-[40px] leading-none lg:text-[3.2vw]">{m.name}</h3>
                <p className="label mt-2">
                  {m.role} · {m.base}
                </p>
              </div>
              <p className="text-lead">{m.intro}</p>
              {m.bio.map((b, i) => (
                <p key={i} className="text-body text-sumi-soft">
                  {b}
                </p>
              ))}
              <PlaceholderTag className="text-moss" />
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
