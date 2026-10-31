import type { Stay } from '@/data/types';

type T = (s: string, vars?: Record<string, string | number>) => string;

/** Spec rows shown on stay cards and the stay slider. Values like "ryokan" are translated as labels. */
export function staySpecRows(s: Stay, t: T) {
  return [
    { label: t('Type'), value: t(s.type) },
    { label: t('Bath'), value: t(s.bath) },
    { label: t('Sleeping'), value: t(s.sleeping) },
    { label: t('Size'), value: `${s.sizeM2} m²` },
    { label: t('Guests'), value: s.guests },
  ];
}

/** Enum values shown as labels (kept here so they are picked up for translation). */
export const STAY_LABELS = [
  'ryokan', 'shukubo', 'machiya', 'onsen inn', 'design hotel', 'private onsen', 'shared onsen', 'none', 'futon', 'bed', 'futon or bed',
  'morning', 'afternoon', 'evening',
];
