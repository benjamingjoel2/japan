import { initLocale } from '@/lib/i18n/server';
import { LegalPage, legalMeta } from '@/components/legal/LegalPage';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return legalMeta('booking-terms');
}

export default async function Page({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return <LegalPage slug="booking-terms" />;
}
