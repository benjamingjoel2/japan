import Link from 'next/link';
import { anchors, legalLinks, pages, site } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    // Reveal footer: the page content lifts off it (sticky bottom, under the main column).
    <footer id="footer" className="relative bg-night text-washi lg:sticky lg:bottom-0 lg:-z-10">
      <div className="px-gutter pt-16 pb-6 lg:pt-[6vw]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr_1fr] md:gap-grid">
          <address className="flex flex-col gap-1 text-label not-italic text-washi/80">
            <span className="text-washi">{site.company.legalName}</span>
            {site.company.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${site.company.email}`} className="mt-3 underline-offset-4 hover:underline">
              {site.company.email}
            </a>
            <span>{site.company.phone}</span>
          </address>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-6">
            <ul className="flex flex-col">
              <li>
                <Link href="/" className="group flex items-center gap-2 font-display text-[28px] leading-[1.15] lg:text-[2.2vw]">
                  <span aria-hidden="true" className="size-1.5 scale-0 rounded-full bg-beni transition-transform group-hover:scale-100" />
                  Welcome
                </Link>
              </li>
              {anchors.slice(0, 6).map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/#${a.id}`}
                    className="group flex items-center gap-2 font-display text-[28px] leading-[1.15] lg:text-[2.2vw]"
                  >
                    <span aria-hidden="true" className="size-1.5 scale-0 rounded-full bg-beni transition-transform group-hover:scale-100" />
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1.5 pt-2 text-label text-washi/80">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-washi">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-1.5 text-label text-washi/80 md:items-end md:text-right">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-washi">
                {s.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-1.5 md:items-end">
              {legalLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-washi">
                  {l.label}
                </Link>
              ))}
            </div>
            <p className="mt-6 max-w-xs text-[12px] leading-snug text-washi/60">
              {site.company.registration}. {site.company.partner}.
            </p>
          </div>
        </div>

        <div className="mt-16 lg:mt-[8vw]">
          <p aria-hidden="true" className="font-display text-[23.5vw] leading-[0.8] tracking-[-0.03em] uppercase">
            Komorebi
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-label text-washi/70">
            <span>© {year} {site.name}. All rights reserved.</span>
            <span lang="ja" className="font-jp">
              {site.ja} · {site.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
