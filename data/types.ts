// Shared content types. Every content file in /data conforms to these.

export type Slug = string;
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type MonthDay = { m: Month; d: number };

/**
 * Placeholder imagery. `tone` picks the generated palette; `subject` is the
 * shot we want a photographer to take (shown on the placeholder itself).
 */
export type Tone =
  | 'leaf'
  | 'mist'
  | 'dusk'
  | 'night'
  | 'blossom'
  | 'maple'
  | 'snow'
  | 'sea'
  | 'stone'
  | 'cedar'
  | 'lantern'
  | 'paper';

export interface Media {
  subject: string;
  tone: Tone;
  /** Optional real asset path or URL; overrides the placeholder when set. */
  src?: string;
  alt?: string;
}

export interface VideoMedia extends Media {
  /** Optional real video URL. Empty until footage exists. */
  video?: string;
  captions?: string;
}

export interface MicroSeason {
  n: number; // 1–72
  sekki: string; // parent solar term, romanised (e.g. "Risshun")
  sekkiEn: string; // parent solar term, English
  ja: string;
  romaji: string;
  en: string;
  start: MonthDay;
  end: MonthDay;
  nature: string;
  onTheTable: string;
  journeys: Slug[];
  verify: true;
}

export interface Window {
  from: MonthDay;
  to: MonthDay;
}

export interface BlossomRegion {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  blossom: Window;
  leaves: Window;
  note: string;
  journeys: Slug[];
  destinations: Slug[];
}

export interface QuietPairing {
  id: string;
  region: string;
  destination: Slug;
  famous: string;
  quieter: string;
  betterTiming?: string;
  why: string;
  kind: 'timing' | 'alternative' | 'route';
  lat: number;
  lng: number;
  verify: true;
}

export interface Destination {
  slug: Slug;
  name: string;
  ja?: string;
  region: string;
  tagline: string;
  intro: string[];
  bestSeasons: { season: string; why: string }[];
  quietTips: string[];
  stays: Slug[];
  journeys: Slug[];
  image: Media;
  lat: number;
  lng: number;
}

export type Bath = 'private onsen' | 'shared onsen' | 'none';
export type StayType = 'ryokan' | 'shukubo' | 'machiya' | 'onsen inn' | 'design hotel';

export interface Stay {
  slug: Slug;
  name: string;
  type: StayType;
  destination: Slug;
  bath: Bath;
  sleeping: 'futon' | 'bed' | 'futon or bed';
  sizeM2: number;
  guests: string;
  summary: string;
  description: string[];
  details: string[];
  images: [Media, Media];
  placeholder: true;
}

export interface DayPlan {
  day: number;
  title: string;
  place: string;
  morning: string;
  afternoon: string;
  evening: string;
  stay?: Slug;
  image?: Media;
}

export interface Journey {
  slug: Slug;
  title: string;
  tagline: string;
  summary: string[];
  days: number;
  fromJPY: number;
  bestMonths: Month[];
  destinations: Slug[];
  itinerary: DayPlan[];
  stays: Slug[];
  experiences: string[];
  image: Media;
}

export interface Included {
  title: string;
  body: string;
  image: Media;
}

export interface Value {
  word: string;
  ja: string;
  body: string;
}

export interface Manner {
  line: string;
  note: string;
}

export interface TeamMember {
  name: string;
  role: string;
  base: string;
  intro: string;
  bio: string[];
  image: Media;
  placeholder: true;
}

export interface Review {
  quote: string;
  name: string;
  from: string;
  trip: string;
  placeholder: true;
}

export interface FaqItem {
  q: string;
  a: string[];
  images: [Media, Media];
  verify?: string;
}

export interface RyokanStage {
  title: string;
  ja?: string;
  body: string;
  media: VideoMedia;
}

export type Currency = 'JPY' | 'USD' | 'GBP' | 'EUR' | 'AUD';
