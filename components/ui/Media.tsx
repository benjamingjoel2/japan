'use client';

import Image, { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { useT } from '@/components/i18n/I18nProvider';
import type { Media as MediaT } from '@/data/types';
import { palettes, seedOf } from '@/lib/placeholder';
import { photoFor } from '@/lib/unsplash';

export function placeholderUrl(media: Pick<MediaT, 'tone' | 'subject'>) {
  return `/ph/${media.tone}/${seedOf(media.subject)}.svg`;
}

/** Generated placeholder artwork (an SVG file), with the intended shot written on it. */
export function Placeholder({ media, label = true, priority }: { media: MediaT; label?: boolean; priority?: boolean }) {
  const { t } = useT();
  const p = palettes[media.tone] ?? palettes.paper;
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `linear-gradient(160deg, ${p.bg[1]}, ${p.bg[0]})` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art, nothing to optimise */}
      <img
        src={placeholderUrl(media)}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {label && (
        <span className="pointer-events-none absolute right-2 bottom-2 left-2 font-sans text-[10px] leading-tight tracking-wide text-white/75 uppercase md:text-[11px]">
          <span className="sr-only">{t('Placeholder image:')} </span>
          {t(media.subject)}
        </span>
      )}
    </div>
  );
}

type Props = {
  media: MediaT;
  sizes?: string;
  priority?: boolean;
  className?: string;
  label?: boolean;
  /** Width / height of the box, when fixed. Lets the CDN crop to that shape (smaller files). */
  ratio?: number;
  /**
   * Full-screen heroes: on phones, fetch a centre crop at this width / height instead of the whole
   * landscape frame (the browser would crop it to the same area anyway), at about half the bytes.
   */
  phoneRatio?: number;
};

/**
 * Fills its (relative) parent. Order of preference: the media's own `src` (your photography),
 * then the Unsplash photo mapped to its subject in /data/photos.ts, then generated placeholder art.
 */
export function Media({ media, sizes = '100vw', priority, className = '', label, ratio, phoneRatio }: Props) {
  const { t } = useT();
  const tone = palettes[media.tone] ?? palettes.paper;
  if (media.src) {
    return (
      <Image src={media.src} alt={t(media.alt ?? media.subject)} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
    );
  }
  const photo = photoFor(media.subject);
  if (photo && phoneRatio) {
    const common = { alt: t(photo.alt), fill: true, fetchPriority: priority ? 'high' : undefined, loading: priority ? 'eager' : 'lazy' } as const;
    // 45vw keeps phones at roughly the density the full frame gave them before, without the cropped-away sides.
    const phone = getImageProps({ ...common, src: `${photo.src}?ar=${phoneRatio.toFixed(3)}&crop=center`, sizes: '45vw' }).props;
    const { props } = getImageProps({ ...common, src: photo.src, sizes });
    if (priority) {
      // The hero is the LCP element: fetch the right crop from <head>, one per breakpoint.
      preload(phone.src, { as: 'image', imageSrcSet: phone.srcSet, imageSizes: phone.sizes, media: '(max-width: 767px)', fetchPriority: 'high' });
      preload(props.src, { as: 'image', imageSrcSet: props.srcSet, imageSizes: props.sizes, media: '(min-width: 768px)', fetchPriority: 'high' });
    }
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet={phone.srcSet} sizes={phone.sizes} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...props} className={`object-cover ${className}`} style={{ ...props.style, backgroundColor: tone.bg[0] }} />
      </picture>
    );
  }
  if (photo) {
    return (
      <Image
        src={ratio ? `${photo.src}?ar=${ratio.toFixed(3)}` : photo.src}
        alt={t(photo.alt)}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={{ backgroundColor: tone.bg[0] }}
      />
    );
  }
  return (
    <div role="img" aria-label={t(media.alt ?? media.subject)} className={`absolute inset-0 ${className}`}>
      <Placeholder media={media} label={label} priority={priority} />
    </div>
  );
}
