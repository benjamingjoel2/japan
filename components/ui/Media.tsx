import Image from 'next/image';
import type { Media as MediaT } from '@/data/types';
import { palettes, seedOf } from '@/lib/placeholder';
import { photoFor } from '@/lib/unsplash';

export function placeholderUrl(media: Pick<MediaT, 'tone' | 'subject'>) {
  return `/ph/${media.tone}/${seedOf(media.subject)}.svg`;
}

/** Generated placeholder artwork (an SVG file), with the intended shot written on it. */
export function Placeholder({ media, label = true, priority }: { media: MediaT; label?: boolean; priority?: boolean }) {
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
          <span className="sr-only">Placeholder image: </span>
          {media.subject}
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
};

/**
 * Fills its (relative) parent. Order of preference: the media's own `src` (your photography),
 * then the Unsplash photo mapped to its subject in /data/photos.ts, then generated placeholder art.
 */
export function Media({ media, sizes = '100vw', priority, className = '', label, ratio }: Props) {
  const tone = palettes[media.tone] ?? palettes.paper;
  if (media.src) {
    return (
      <Image src={media.src} alt={media.alt ?? media.subject} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
    );
  }
  const photo = photoFor(media.subject);
  if (photo) {
    return (
      <Image
        src={ratio ? `${photo.src}?ar=${ratio.toFixed(3)}` : photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={{ backgroundColor: tone.bg[0] }}
      />
    );
  }
  return (
    <div role="img" aria-label={media.alt ?? media.subject} className={`absolute inset-0 ${className}`}>
      <Placeholder media={media} label={label} priority={priority} />
    </div>
  );
}
