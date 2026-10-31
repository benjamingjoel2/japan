import { Button } from '@/components/ui/Button';
import { t } from '@/lib/i18n/server';

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-start justify-center gap-6 px-gutter pt-[var(--header-h)]">
      <p className="label">404</p>
      <h1 className="max-w-[16ch] text-h2">{t('This path isn’t on the map.')}</h1>
      <p className="max-w-[40ch] text-lead">{t('Even in Kyoto, the side streets sometimes end in a garden wall.')}</p>
      <Button href="/">{t('Back to the beginning')}</Button>
    </div>
  );
}
