import type { ImageLoaderProps } from 'next/image';
import { photos } from '@/data/photos';

export const UNSPLASH = 'https://images.unsplash.com/';

/** Unsplash's CDN resizes on the fly, so we let it do the work instead of the Next image optimiser. */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 72));
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  return url.toString();
}

export function photoFor(subject: string) {
  const p = photos[subject];
  return p ? { ...p, src: `${UNSPLASH}${p.photo}` } : null;
}
