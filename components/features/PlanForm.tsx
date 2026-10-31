'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useT } from '@/components/i18n/I18nProvider';
import { msg } from '@/lib/i18n/config';
import { budgets, contactMethods, interests, paces, stayStyles } from '@/lib/enquiry';
import { capitalize, dayOfYear, formatRange, monthName, seasonsInMonth } from '@/lib/seasons';
import { formatPrice, useCurrency } from '@/lib/currency';
import type { BlossomRegion, MonthDay } from '@/data/types';

const paceNotes: Record<(typeof paces)[number], string> = {
  gentle: msg('One thing a day, long lunches'),
  balanced: msg('A morning and an afternoon, free evenings'),
  fuller: msg('Early starts, more to see'),
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
function MonthContext({ month, blossomRegions }: { month: number; blossomRegions: BlossomRegion[] }) {
  const { t, locale } = useT();
  const kos = seasonsInMonth(month);
  const blossom = blossomRegions.filter((r) => inWindow(month, r.blossom));
  const leaves = blossomRegions.filter((r) => r.id !== 'okinawa' && inWindow(month, r.leaves));
  return (
    <m.div
      key={month}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-4 rounded-media bg-washi-deep/60 p-4 text-[14px] md:grid-cols-2"
    >
      <div>
        <p className="mb-2 text-moss">{t('Micro-seasons in {month}', { month: monthName(month, locale) })}</p>
        <ul className="flex flex-col gap-1">
          {kos.map((k) => (
            <li key={k.n} className="flex gap-2">
              <span className="w-24 shrink-0 text-[12px] text-sumi-soft tabular-nums">{formatRange(k.start, k.end, locale)}</span>
              <span>
                <span lang="ja" className="mr-1.5 font-jp">
                  {k.ja}
                </span>
                {t(k.en)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-moss">
            <span className="size-2 rounded-full bg-blossom" /> {t('Cherry blossom, typically')}
          </p>
          <p>{blossom.length ? blossom.map((r) => r.name).join(', ') : t('Not in season this month.')}</p>
        </div>
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-moss">
            <span className="size-2 rounded-full bg-koyo" /> {t('Autumn leaves, typically')}
          </p>
          <p>{leaves.length ? leaves.map((r) => r.name).join(', ') : t('Not in season this month.')}</p>
        </div>
        <p className="text-[12px] text-sumi-soft">{t('Typical windows, not forecasts.')}</p>
      </div>
    </m.div>
  );
}

export function PlanForm({ journeyTitles, regions }: { journeyTitles: Record<string, string>; regions: BlossomRegion[] }) {
  const { t, locale, href } = useT();
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
    notes: pre.journey ? t('I’m interested in {journey}.', { journey: journeyTitles[pre.journey] ?? pre.journey }) : '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const topRef = useRef<HTMLDivElement>(null);
  const set = (k: keyof typeof v, val: string | string[]) => setV((o) => ({ ...o, [k]: val }));
  const toggle = (i: string) => set('interests', v.interests.includes(i) ? v.interests.filter((x) => x !== i) : [...v.interests, i]);
  const thisYear = useMemo(() => new Date().getFullYear(), []);

  const budgetLabel = (b: (typeof budgets)[number]) => {
    if (b.id === 'unsure') return t('Not sure yet');
    const [lo, hi] = b.jpy;
    if (!lo) return t('Under {price}', { price: formatPrice(hi, currency) });
    if (!hi) return `${formatPrice(lo, currency)}+`;
    return `${formatPrice(lo, currency)} – ${formatPrice(hi, currency)}`;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrors({});
    const local: Record<string, string> = {};
    if (!v.month) local.month = t('Choose a month, or “Flexible”');
    if (!v.name.trim()) local.name = t('Please tell us your name');
    if (!/^\S+@\S+\.\S+$/.test(v.email)) local.email = t('Please check your email address');
    if (v.contact !== 'email' && v.phone.trim().length < 6) local.phone = t('Please add a phone number so we can reach you that way');
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
        body: JSON.stringify({ ...v, currency, locale, ...pre }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(
          data.fields
            ? Object.fromEntries(Object.entries(data.fields as Record<string, string>).map(([k, e]) => [k, t(e)]))
            : { form: t(data.error ?? 'Something went wrong. Please try again.') },
        );
        setStatus('error');
        return;
      }
      setStatus('done');
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      setErrors({ form: t('We couldn’t send that. Please check your connection and try again.') });
      setStatus('error');
    }
  }

  return (
    <div ref={topRef} className="scroll-mt-[calc(var(--header-h)+2rem)]">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <m.div
            key="done"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[50vh] flex-col items-start justify-center gap-4 py-16"
          >
            <p className="text-h2">{t('Thank you. We’ll write soon.')}</p>
            <p className="max-w-[40ch] text-body text-sumi-soft">
              {t('A specialist will read your note properly and reply within two working days, usually sooner.')}
            </p>
          </m.div>
        ) : (
          <m.form key="form" onSubmit={submit} noValidate className="flex flex-col gap-12" exit={{ opacity: 0 }}>
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>
                {t('Website')}
                <input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} />
              </label>
            </div>

            <section aria-labelledby="s-when" className="flex flex-col gap-6">
              <h2 id="s-when" className="text-h3">
                {t('When')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
                <Field label={t('Month')} id="f-month" error={errors.month}>
                  <select id="f-month" className={input} value={v.month} onChange={(e) => set('month', e.target.value)} aria-invalid={!!errors.month}>
                    <option value="">{t('Choose a month')}</option>
                    <option value="flexible">{t('Flexible, advise me')}</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i + 1)}>
                        {capitalize(monthName(i + 1, locale))}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t('Year')} id="f-year">
                  <select id="f-year" className={input} value={v.year} onChange={(e) => set('year', e.target.value)}>
                    <option value="">{t('Not sure')}</option>
                    {[0, 1, 2].map((d) => (
                      <option key={d}>{thisYear + d}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t('How many days')} id="f-days">
                  <input id="f-days" type="number" min={3} max={60} className={input} value={v.days} onChange={(e) => set('days', e.target.value)} />
                </Field>
              </div>
              <AnimatePresence mode="wait">
                {v.month && v.month !== 'flexible' && <MonthContext month={+v.month} blossomRegions={regions} />}
              </AnimatePresence>
            </section>

            <section aria-labelledby="s-you" className="flex flex-col gap-6">
              <h2 id="s-you" className="text-h3">
                {t('Your trip')}
              </h2>
              <Group legend={t('Is this your first time in Japan?')}>
                {[
                  ['first', t('First time')],
                  ['returning', t('Returning')],
                ].map(([val, l]) => (
                  <Choice key={val} type="radio" name="visit" value={val} checked={v.visit === val} onChange={() => set('visit', val)}>
                    {l}
                  </Choice>
                ))}
              </Group>
              <Group legend={t('What do you love?')} hint={t('Choose as many as you like.')}>
                {interests.map((i) => (
                  <Choice key={i} type="checkbox" name="interests" value={i} checked={v.interests.includes(i)} onChange={() => toggle(i)}>
                    <span className="capitalize">{t(i)}</span>
                  </Choice>
                ))}
              </Group>
              <Group legend={t('Pace')}>
                {paces.map((p) => (
                  <Choice key={p} type="radio" name="pace" value={p} checked={v.pace === p} onChange={() => set('pace', p)}>
                    <span className="capitalize">{t(p)}</span>
                    <span className="sr-only">: </span>
                    <span className={`ml-2 text-[12px] ${v.pace === p ? 'text-washi/70' : 'text-moss'}`}>{t(paceNotes[p])}</span>
                  </Choice>
                ))}
              </Group>
              <Group legend={t('Where would you like to stay?')}>
                {stayStyles.map((s) => (
                  <Choice key={s} type="radio" name="stayStyle" value={s} checked={v.stayStyle === s} onChange={() => set('stayStyle', s)}>
                    <span className="capitalize">{s === 'mix' ? t('A mix of both') : s === 'ryokan' ? t('Mostly ryokan') : t('Mostly design hotels')}</span>
                  </Choice>
                ))}
              </Group>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t('Adults')} id="f-adults">
                  <input id="f-adults" type="number" min={1} max={20} className={input} value={v.adults} onChange={(e) => set('adults', e.target.value)} />
                </Field>
                <Field label={t('Children')} id="f-children" hint={t('Under 16')}>
                  <input id="f-children" type="number" min={0} max={20} className={input} value={v.children} onChange={(e) => set('children', e.target.value)} />
                </Field>
              </div>
              <Group legend={t('Budget per person, excluding flights')} hint={currency === 'JPY' ? undefined : t('Approximate conversion from yen.')}>
                {budgets.map((b) => (
                  <Choice key={b.id} type="radio" name="budget" value={b.id} checked={v.budget === b.id} onChange={() => set('budget', b.id)}>
                    {budgetLabel(b)}
                  </Choice>
                ))}
              </Group>
            </section>

            <section aria-labelledby="s-contact" className="flex flex-col gap-6">
              <h2 id="s-contact" className="text-h3">
                {t('How to reach you')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t('Name')} id="f-name" error={errors.name}>
                  <input id="f-name" autoComplete="name" className={input} value={v.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} required />
                </Field>
                <Field label={t('Email')} id="f-email" error={errors.email}>
                  <input id="f-email" type="email" autoComplete="email" className={input} value={v.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} required />
                </Field>
                <Field label={t('Phone')} id="f-phone" hint={t('Optional, unless you’d like a call')} error={errors.phone}>
                  <input id="f-phone" type="tel" autoComplete="tel" className={input} value={v.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} />
                </Field>
              </div>
              <Group legend={t('Best way to reach you')}>
                {contactMethods.map((c) => (
                  <Choice key={c} type="radio" name="contact" value={c} checked={v.contact === c} onChange={() => set('contact', c)}>
                    {c === 'email' ? t('Email') : t('Phone')}
                  </Choice>
                ))}
              </Group>
              <Field label={t('Anything else?')} id="f-notes" hint={t('Dietary needs, mobility, a birthday, a place you’ve always wanted to see.')}>
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
                {status === 'sending' ? t('Sending…') : t('Send to a specialist')}
              </button>
              <p className="max-w-[52ch] text-[13px] text-moss">
                {t('No obligation and no payment. We use your details only to plan your trip. See our')}{' '}
                <a href={href('/privacy')} className="underline underline-offset-4">
                  {t('Privacy Policy')}
                </a>
                .
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
