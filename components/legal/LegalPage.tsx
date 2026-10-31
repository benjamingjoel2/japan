import { legalDocs, legalUpdated, type LegalDoc } from '@/data/legal';
import { site } from '@/config/site';
import { getLocale, t, tx } from '@/lib/i18n/server';
import { formatDate } from '@/lib/journal';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import Link from '@/components/i18n/Link';

const fill = (s: string) =>
  s.replaceAll('{brand}', site.name).replaceAll('{email}', site.company.email).replaceAll('{address}', site.company.address.join(', '));

function doc(slug: LegalDoc['slug']) {
  return tx(legalDocs.find((d) => d.slug === slug)!);
}

export function legalMeta(slug: LegalDoc['slug']) {
  const d = doc(slug);
  return pageMeta({ title: d.title, description: fill(d.description), path: `/${slug}`, raw: true });
}

export function LegalPage({ slug }: { slug: LegalDoc['slug'] }) {
  const d = doc(slug);
  return (
    <>
      <PageHeader label={t('Legal')} title={d.title} lead={d.lead} />
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[14rem_1fr]">
        <nav aria-label={t('Legal')} className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <ul className="flex flex-wrap gap-3 text-[14px] lg:flex-col lg:gap-1.5">
            {legalDocs.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/${l.slug}`}
                  aria-current={l.slug === slug ? 'page' : undefined}
                  className={`underline-offset-4 hover:underline ${l.slug === slug ? 'font-medium underline' : ''}`}
                >
                  {t(l.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="prose-k">
          <p className="text-[14px] text-sumi-soft">{t('Last updated: {date}', { date: formatDate(legalUpdated, getLocale()) })}</p>
          {d.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{fill(p)}</p>
              ))}
            </section>
          ))}
          <section>
            <h2>{t('Contact')}</h2>
            <p>
              {site.name}
              <br />
              {site.company.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
              <a href={`mailto:${site.company.email}`}>{site.company.email}</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
