'use client';

import { usePathname } from 'next/navigation';
import { locales, localeNames, localizeHref, stripLocale } from '@/lib/i18n/config';
import { useT } from './I18nProvider';

/** EN · FR · DE · ES. Each link opens the same page in that language. */
export function LanguageSelector({ className = '' }: { className?: string }) {
  const pathname = usePathname() || '/';
  const { locale, t } = useT();
  const base = stripLocale(pathname);
  return (
    <nav aria-label={t('Language')} className={className}>
      <ul className="flex items-center gap-1">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
            )}
            <a
              href={localizeHref(base, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? 'true' : undefined}
              aria-label={localeNames[l]}
              className={`rounded-sm px-0.5 uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beni ${
                l === locale ? 'font-medium underline' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
