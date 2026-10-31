'use client';

import { currencyOrder, ratesAsOf } from '@/config/currency';
import { formatPrice, useCurrency } from '@/lib/currency';
import { useT } from '@/components/i18n/I18nProvider';

/**
 * Journey prices are quoted per trip, so we show "Price on request" for now. `jpy` stays in the
 * data (and `showPrices` below) so published "from" prices can be switched back on in one place.
 */
const showPrices = false;

export function Price({ jpy, className = '' }: { jpy: number; className?: string }) {
  const { currency } = useCurrency();
  const { t } = useT();
  if (!showPrices) return <span className={className}>{t('Price on request')}</span>;
  return (
    <span className={className}>
      {t('From {price}', { price: formatPrice(jpy, currency) })}
      {currency !== 'JPY' && <span className="sr-only"> ({t('approximate')})</span>}
    </span>
  );
}

export function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const { t } = useT();
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div role="radiogroup" aria-label={t('Currency')} className="flex rounded-full border border-line p-0.5">
        {currencyOrder.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={currency === c}
            onClick={() => setCurrency(c)}
            className={`rounded-full px-3 py-1 text-[13px] transition-colors ${
              currency === c ? 'bg-sumi text-washi' : 'text-sumi-soft hover:text-sumi'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <span className="text-[12px] text-moss">
        {t('Per person, sharing. Non-yen prices approximate (rates as of {date}).', { date: ratesAsOf })}
      </span>
    </div>
  );
}
