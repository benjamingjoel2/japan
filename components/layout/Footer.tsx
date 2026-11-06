import Link from '@/components/i18n/Link';
import { legalLinks, pages, site } from '@/config/site';
import { t } from '@/lib/i18n/server';

/** Footer columns, built from the site pages so every link appears once. */
const columns = [
  { title: 'Travel', hrefs: ['/journeys', '/destinations', '/stays'] },
  { title: 'Seasons', hrefs: ['/seasons', '/blossom-and-leaves', '/quiet-japan'] },
  { title: 'Komorebi', hrefs: ['/about', '/journal', '/plan'] },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="relative overflow-clip bg-night text-washi">
      <div className="px-gutter pt-16 pb-6 lg:pt-[5vw]">
        <div className="grid grid-cols-2 gap-x-grid gap-y-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <p className="flex items-baseline gap-2">
              <span className="font-display text-[28px] leading-none">{site.name}</span>
              <span lang="ja" className="font-jp text-xs opacity-70">
                {site.ja}
              </span>
            </p>
            <p className="max-w-[30ch] text-body text-washi/80">{t(site.tagline)}</p>
            <a href={`mailto:${site.company.email}`} className="text-label underline-offset-4 hover:underline">
              {site.company.email}
            </a>
            <address className="max-w-[34ch] text-label not-italic text-washi/70">{site.company.address.join(', ')}</address>
          </div>

          {columns.map((c) => (
            <nav key={c.title} aria-label={t(c.title)}>
              <h2 className="label mb-3 text-washi/60">{t(c.title)}</h2>
              <ul className="flex flex-col gap-1.5 text-label text-washi/85">
                {c.hrefs.map((h) => {
                  const p = pages.find((x) => x.href === h);
                  return p ? (
                    <li key={h}>
                      <Link href={p.href} className="inline-block py-0.5 hover:text-washi">
                        {t(p.label)}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Left padding keeps the line clear of the fixed back-to-top button. */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-washi/15 pt-5 pl-12 text-label text-washi/70 lg:mt-[5vw] lg:pl-16">
          <span>© {year} {site.name}. {t('All rights reserved.')}</span>
          <nav aria-label={t('Legal')} className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-washi">
                {t(l.label)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
