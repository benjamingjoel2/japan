'use client';

import { currencyOrder, ratesAsOf } from '@/config/currency';
import { formatPrice, useCurrency } from '@/lib/currency';

export function Price({ jpy, className = '' }: { jpy: number; className?: string }) {
  const { currency } = useCurrency();
  return (
    <span className={className}>
      from {formatPrice(jpy, currency)}
      {currency !== 'JPY' && <span className="sr-only"> (approximate)</span>}
    </span>
  );
}

export function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div role="radiogroup" aria-label="Currency" className="flex rounded-full border border-line p-0.5">
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
        Per person, sharing. Non-yen prices approximate (rates as of {ratesAsOf}).
      </span>
    </div>
  );
}
