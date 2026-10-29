import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Geist } from 'next/font/google';
import { site } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { Providers } from '@/components/layout/Providers';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-display-face',
  display: 'swap',
});
const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#f4efe4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${geist.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-2 left-2 z-[60] -translate-y-20 rounded-full bg-sumi px-4 py-2 text-washi focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
            <Header />
            <main id="main" tabIndex={-1} className="relative z-10 bg-washi outline-none">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </Providers>
      </body>
    </html>
  );
}
