'use client';

import type { ImageLoaderProps } from 'next/image';

/**
 * Global next/image loader.
 * - Unsplash photos are resized by Unsplash's own CDN (fast, global, cached), so they skip
 *   the Next optimiser entirely.
 * - Anything else is served as-is: put your own photography in /public already sized
 *   (e.g. 2400px wide, WebP/AVIF), or host it on an image CDN and add a branch here.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith('https://images.unsplash.com/')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 55));
    url.searchParams.set('auto', 'format');
    // `ar` (box width / height) is set by <Media ratio>: crop at the CDN to the shape shown,
    // instead of downloading a tall photo for a wide box.
    const ar = Number(url.searchParams.get('ar'));
    url.searchParams.delete('ar');
    if (ar > 0) {
      url.searchParams.set('h', String(Math.round(width / ar)));
      url.searchParams.set('fit', 'crop');
      if (url.searchParams.get('crop') !== 'center') url.searchParams.set('crop', 'entropy');
    } else {
      url.searchParams.set('fit', 'max');
    }
    return url.toString();
  }
  return src;
}
