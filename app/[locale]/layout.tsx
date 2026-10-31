import '../globals.css';
import { SiteShell, shellMetadata } from '@/components/layout/SiteShell';
import { initLocale } from '@/lib/i18n/server';
import { otherLocales } from '@/lib/i18n/config';

export { viewport } from '@/components/layout/SiteShell';

// French, German and Spanish copies of every page, all pre-rendered.
export const dynamicParams = false;
export function generateStaticParams() {
  return otherLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return shellMetadata();
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return <SiteShell>{children}</SiteShell>;
}
