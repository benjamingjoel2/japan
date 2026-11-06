'use client';

import { useState } from 'react';
import { Media } from '@/components/ui/Media';
import type { Tone } from '@/data/types';

export type PickerMonth = { m: number; short: string; name: string; note: string; subject: string; tone: Tone };

/**
 * Home hero: the photograph fills the screen and changes with the month picked below the
 * headline, with one line on what is good that month. Only the chosen month's photo loads.
 */
export function MonthPicker({
  months,
  initial,
  label,
  children,
}: {
  months: PickerMonth[];
  initial: number;
  label: string;
  children: React.ReactNode;
}) {
  const [m, setM] = useState(initial);
  const [picked, setPicked] = useState(false);
  const cur = months.find((x) => x.m === m) ?? months[0];
  return (
    <>
      <div className="absolute inset-0">
        <Media
          key={cur.m}
          media={{ subject: cur.subject, tone: cur.tone }}
          sizes="100vw"
          phoneRatio={0.46}
          priority={cur.m === initial}
          label={false}
          className={picked ? 'animate-[fade-in_0.8s_ease-out_both]' : ''}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/45 via-night/5 to-night/75" />

      <div className="relative mt-auto px-gutter pb-[6vh] text-washi lg:pb-[5vw]">
        {children}
        <fieldset className="mt-7 max-w-[46rem] lg:mt-[2vw]">
          <legend className="label mb-2 text-washi/80">{label}</legend>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {months.map((x) => (
              <button
                key={x.m}
                type="button"
                aria-pressed={x.m === m}
                aria-label={x.name}
                onClick={() => {
                  setM(x.m);
                  setPicked(true);
                }}
                className={`min-h-[36px] min-w-[36px] text-label underline-offset-[6px] transition-colors ${
                  x.m === m ? 'text-washi underline decoration-beni decoration-2' : 'text-washi/70 hover:text-washi'
                }`}
              >
                {x.short}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-3 max-w-[44ch] text-body text-washi">
            <span className="font-medium">{cur.name}.</span> {cur.note}
          </p>
        </fieldset>
      </div>
    </>
  );
}
