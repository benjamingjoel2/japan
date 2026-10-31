import type { Metadata, Viewport } from 'next';
import { site } from '@/config/site';
import { display, geist } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { Providers } from '@/components/layout/Providers';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { clientMessages, getLocale, t } from '@/lib/i18n/server';
import { htmlLang, ogLocale } from '@/lib/i18n/config';

export function shellMetadata(): Metadata {
  const locale = getLocale();
  const tagline = t(site.tagline);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: ${tagline}`, template: `%s · ${site.name}` },
    description: t(site.description),
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: ogLocale[locale],
      title: `${site.name}: ${tagline}`,
      description: t(site.description),
    },
    twitter: { card: 'summary_large_image' },
  };
}

export const viewport: Viewport = {
  themeColor: '#f4efe4',
  width: 'device-width',
  initialScale: 1,
};

/** <html> and the page chrome, shared by the English and the translated root layouts. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  return (
    <html lang={htmlLang[locale]} className={`${display.variable} ${geist.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-2 left-2 z-[60] -translate-y-20 rounded-full bg-sumi px-4 py-2 text-washi focus:translate-y-0"
        >
          {t('Skip to content')}
        </a>
        <I18nProvider locale={locale} messages={clientMessages(locale)}>
          <Providers>
            <Header />
            <main id="main" tabIndex={-1} className="relative z-10 bg-washi outline-none">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
