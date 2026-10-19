'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { blossomRegions } from '@/data/blossom';
import { budgets, contactMethods, interests, paces, stayStyles } from '@/lib/enquiry';
import { dayOfYear, formatRange, MONTH_NAMES, seasonsInMonth } from '@/lib/seasons';
import { formatPrice, useCurrency } from '@/lib/currency';
import type { MonthDay } from '@/data/types';

const paceNotes: Record<(typeof paces)[number], string> = {
  gentle: 'One thing a day, long lunches',
  balanced: 'A morning and an afternoon, free evenings',
  fuller: 'Early starts, more to see',
};

function Field({ label, hint, error, children, id }: { label: string; hint?: string; error?: string; children: ReactNode; id?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-medium">
        {label}
      </label>
      {hint && <p className="-mt-1 text-[13px] text-moss">{hint}</p>}
      {children}
      {error && (
        <p className="text-[13px] text-beni" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Group({ legend, hint, children, error }: { legend: string; hint?: string; children: ReactNode; error?: string }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-[15px] font-medium">{legend}</legend>
      {hint && <p className="-mt-2 text-[13px] text-moss">{hint}</p>}
      <div className="flex flex-wrap gap-2">{children}</div>
      {error && (
        <p className="text-[13px] text-beni" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Pill-shaped radio / checkbox. */
function Choice({ type, name, value, checked, onChange, children }: {
  type: 'radio' | 'checkbox';
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-beni ${
        checked ? 'border-sumi bg-sumi text-washi' : 'border-line hover:border-sumi/50'
      }`}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

const input =
  'w-full rounded-media border border-line bg-washi px-3 py-2.5 text-[16px] outline-none focus:border-sumi aria-[invalid=true]:border-beni';

function inWindow(month: number, w: { from: MonthDay; to: MonthDay }) {
  const a = dayOfYear({ m: month as MonthDay['m'], d: 1 });
  const b = dayOfYear({ m: month as MonthDay['m'], d: 28 });
  return dayOfYear(w.from) <= b && dayOfYear(w.to) >= a;
}

/** Inline seasonal context for the chosen month: micro-seasons + typical blossom/leaf regions. */
function MonthContext({ month }: { month: number }) {
  const kos = seasonsInMonth(month);
  const blossom = blossomRegions.filter((r) => inWindow(month, r.blossom));
  const leaves = blossomRegions.filter((r) => r.id !== 'okinawa' && inWindow(month, r.leaves));
  return (
    <motion.div
      key={month}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-4 rounded-media bg-washi-deep/60 p-4 text-[14px] md:grid-cols-2"
    >
      <div>
        <p className="mb-2 text-moss">Micro-seasons in {MONTH_NAMES[month - 1]}</p>
        <ul className="flex flex-col gap-1">
          {kos.map((k) => (
            <li key={k.n} className="flex gap-2">
              <span className="w-24 shrink-0 text-[12px] text-sumi-soft tabular-nums">{formatRange(k.start, k.end)}</span>
              <span>
                <span lang="ja" className="mr-1.5 font-jp">
                  {k.ja}
                </span>
                {k.en}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-moss">
            <span className="size-2 rounded-full bg-blossom" /> Cherry blossom, typically
          </p>
          <p>{blossom.length ? blossom.map((r) => r.name).join(', ') : 'Not in season this month.'}</p>
        </div>
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-moss">
            <span className="size-2 rounded-full bg-koyo" /> Autumn leaves, typically
          </p>
          <p>{leaves.length ? leaves.map((r) => r.name).join(', ') : 'Not in season this month.'}</p>
        </div>
        <p className="text-[12px] text-sumi-soft">Typical windows, not forecasts.</p>
      </div>
    </motion.div>
  );
}

export function PlanForm({ journeyTitles }: { journeyTitles: Record<string, string> }) {
  const params = useSearchParams();
  const { currency } = useCurrency();
  const pre = {
    journey: params.get('journey') ?? '',
    destination: params.get('destination') ?? '',
    stay: params.get('stay') ?? '',
  };
  const [v, setV] = useState({
    month: '',
    year: '',
    days: '12',
    visit: 'first',
    interests: [] as string[],
    pace: 'balanced',
    stayStyle: 'mix',
    adults: '2',
    children: '0',
    budget: 'unsure',
    name: '',
    email: '',
    phone: '',
    contact: 'email',
    notes: pre.journey ? `I'm interested in ${journeyTitles[pre.journey] ?? pre.journey}.` : '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const topRef = useRef<HTMLDivElement>(null);
  const set = (k: keyof typeof v, val: string | string[]) => setV((o) => ({ ...o, [k]: val }));
  const toggle = (i: string) => set('interests', v.interests.includes(i) ? v.interests.filter((x) => x !== i) : [...v.interests, i]);
  const thisYear = useMemo(() => new Date().getFullYear(), []);

  const budgetLabel = (b: (typeof budgets)[number]) => {
    if (b.id === 'unsure') return 'Not sure yet';
    const [lo, hi] = b.jpy;
    if (!lo) return `Under ${formatPrice(hi, currency)}`;
    if (!hi) return `${formatPrice(lo, currency)}+`;
    return `${formatPrice(lo, currency)} – ${formatPrice(hi, currency)}`;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrors({});
    const local: Record<string, string> = {};
    if (!v.month) local.month = 'Choose a month, or “Flexible”';
    if (!v.name.trim()) local.name = 'Please tell us your name';
    if (!/^\S+@\S+\.\S+$/.test(v.email)) local.email = 'Please check your email address';
    if (v.contact !== 'email' && v.phone.trim().length < 6) local.phone = 'Please add a phone number so we can reach you that way';
    if (Object.keys(local).length) {
      setErrors(local);
      setStatus('error');
      document.getElementById(`f-${Object.keys(local)[0]}`)?.focus();
      return;
    }
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, currency, ...pre }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.fields ?? { form: data.error ?? 'Something went wrong. Please try again.' });
        setStatus('error');
        return;
      }
      setStatus('done');
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      setErrors({ form: 'We couldn’t send that. Please check your connection and try again.' });
      setStatus('error');
    }
  }

  return (
    <div ref={topRef} className="scroll-mt-[calc(var(--header-h)+2rem)]">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="flex min-h-[50vh] flex-col items-start justify-center gap-4 py-16"
          >
            <p className="text-h2">Thank you. We&rsquo;ll write soon.</p>
            <p className="max-w-[40ch] text-body text-sumi-soft">
              A specialist will read your note properly and reply within two working days, usually sooner.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="flex flex-col gap-12" exit={{ opacity: 0 }}>
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} />
              </label>
            </div>

            <section aria-labelledby="s-when" className="flex flex-col gap-6">
              <h2 id="s-when" className="text-h3">
                When
              </h2>
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
                <Field label="Month" id="f-month" error={errors.month}>
                  <select id="f-month" className={input} value={v.month} onChange={(e) => set('month', e.target.value)} aria-invalid={!!errors.month}>
                    <option value="">Choose a month</option>
                    <option value="flexible">Flexible, advise me</option>
                    {MONTH_NAMES.map((m, i) => (
                      <option key={m} value={String(i + 1)}>
                        {m}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Year" id="f-year">
                  <select id="f-year" className={input} value={v.year} onChange={(e) => set('year', e.target.value)}>
                    <option value="">Not sure</option>
                    {[0, 1, 2].map((d) => (
                      <option key={d}>{thisYear + d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="How many days" id="f-days">
                  <input id="f-days" type="number" min={3} max={60} className={input} value={v.days} onChange={(e) => set('days', e.target.value)} />
                </Field>
              </div>
              <AnimatePresence mode="wait">
                {v.month && v.month !== 'flexible' && <MonthContext month={+v.month} />}
              </AnimatePresence>
            </section>

            <section aria-labelledby="s-you" className="flex flex-col gap-6">
              <h2 id="s-you" className="text-h3">
                Your trip
              </h2>
              <Group legend="Is this your first time in Japan?">
                {[
                  ['first', 'First time'],
                  ['returning', 'Returning'],
                ].map(([val, l]) => (
                  <Choice key={val} type="radio" name="visit" value={val} checked={v.visit === val} onChange={() => set('visit', val)}>
                    {l}
                  </Choice>
                ))}
              </Group>
              <Group legend="What do you love?" hint="Choose as many as you like.">
                {interests.map((i) => (
                  <Choice key={i} type="checkbox" name="interests" value={i} checked={v.interests.includes(i)} onChange={() => toggle(i)}>
                    <span className="capitalize">{i}</span>
                  </Choice>
                ))}
              </Group>
              <Group legend="Pace">
                {paces.map((p) => (
                  <Choice key={p} type="radio" name="pace" value={p} checked={v.pace === p} onChange={() => set('pace', p)}>
                    <span className="capitalize">{p}</span>
                    <span className="sr-only">: </span>
                    <span className={`ml-2 text-[12px] ${v.pace === p ? 'text-washi/70' : 'text-moss'}`}>{paceNotes[p]}</span>
                  </Choice>
                ))}
              </Group>
              <Group legend="Where would you like to stay?">
                {stayStyles.map((s) => (
                  <Choice key={s} type="radio" name="stayStyle" value={s} checked={v.stayStyle === s} onChange={() => set('stayStyle', s)}>
                    <span className="capitalize">{s === 'mix' ? 'A mix of both' : s === 'ryokan' ? 'Mostly ryokan' : 'Mostly design hotels'}</span>
                  </Choice>
                ))}
              </Group>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Adults" id="f-adults">
                  <input id="f-adults" type="number" min={1} max={20} className={input} value={v.adults} onChange={(e) => set('adults', e.target.value)} />
                </Field>
                <Field label="Children" id="f-children" hint="Under 16">
                  <input id="f-children" type="number" min={0} max={20} className={input} value={v.children} onChange={(e) => set('children', e.target.value)} />
                </Field>
              </div>
              <Group legend="Budget per person, excluding flights" hint={currency === 'JPY' ? undefined : 'Approximate conversion from yen.'}>
                {budgets.map((b) => (
                  <Choice key={b.id} type="radio" name="budget" value={b.id} checked={v.budget === b.id} onChange={() => set('budget', b.id)}>
                    {budgetLabel(b)}
                  </Choice>
                ))}
              </Group>
            </section>

            <section aria-labelledby="s-contact" className="flex flex-col gap-6">
              <h2 id="s-contact" className="text-h3">
                How to reach you
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" id="f-name" error={errors.name}>
                  <input id="f-name" autoComplete="name" className={input} value={v.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} required />
                </Field>
                <Field label="Email" id="f-email" error={errors.email}>
                  <input id="f-email" type="email" autoComplete="email" className={input} value={v.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} required />
                </Field>
                <Field label="Phone" id="f-phone" hint="Optional, unless you'd like a call or WhatsApp" error={errors.phone}>
                  <input id="f-phone" type="tel" autoComplete="tel" className={input} value={v.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} />
                </Field>
              </div>
              <Group legend="Best way to reach you">
                {contactMethods.map((c) => (
                  <Choice key={c} type="radio" name="contact" value={c} checked={v.contact === c} onChange={() => set('contact', c)}>
                    {c === 'whatsapp' ? 'WhatsApp' : c[0].toUpperCase() + c.slice(1)}
                  </Choice>
                ))}
              </Group>
              <Field label="Anything else?" id="f-notes" hint="Dietary needs, mobility, a birthday, a place you've always wanted to see.">
                <textarea id="f-notes" rows={5} className={input} value={v.notes} onChange={(e) => set('notes', e.target.value)} />
              </Field>
            </section>

            <div className="flex flex-col items-start gap-3 border-t border-line pt-8">
              {errors.form && (
                <p role="alert" className="text-[14px] text-beni">
                  {errors.form}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="h-12 rounded-full bg-sumi px-8 text-[15px] text-washi disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send to a specialist'}
              </button>
              <p className="max-w-[52ch] text-[13px] text-moss">
                No obligation and no payment. We use your details only to plan your trip. See our{' '}
                <a href="/legal#privacy" className="underline underline-offset-4">
                  privacy notice
                </a>
                .
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
