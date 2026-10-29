// Brand settings. Everything brand-specific that isn't content lives here.

const BRAND = 'Komorebi';
// Shared across all our brands: each brand lives at {brand}.tourground.com and its
// email is {brand}@tourground.com.
const DOMAIN = 'tourground.com';
const SLUG = BRAND.toLowerCase();

export const site = {
  name: BRAND,
  ja: '木漏れ日',
  tagline: 'Japan, in its own time.',
  description:
    'Private, slow journeys in Japan, planned around the seasons and away from the crowds. Ryokan nights, quiet temples at opening time, craft, food and the 72 seasons.',
  // Canonical address. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a staging copy).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SLUG}.${DOMAIN}`,
  locale: 'en_GB',
  heroTags: [
    ['Private journeys', 'Seasonal'],
    ['Slow', 'Japan'],
  ] as const,
  cta: { label: 'Plan with us', href: '/plan' },
  // PLACEHOLDER company details — replace before launch.
  company: {
    legalName: 'Komorebi Journeys Ltd. (placeholder)',
    address: ['Placeholder address line 1', 'Placeholder city, postcode', 'Country'],
    email: `${SLUG}@${DOMAIN}`,
    phone: '+00 0000 000000',
    registration: 'Travel agency registration no. 0000 (placeholder)',
    partner: 'Licensed Japanese partner: Placeholder Travel K.K., Japan Tourism Agency registration no. 0000 (placeholder)',
  },
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Newsletter', href: '#' },
  ],
} as const;

export type AnchorItem = { id: string; label: string };

/** Homepage anchor menu, in page order. */
export const anchors: AnchorItem[] = [
  { id: 'komorebi', label: 'Komorebi' },
  { id: 'values', label: 'Values' },
  { id: 'stay', label: 'Stay' },
  { id: 'journeys', label: 'Journeys' },
  { id: 'a-night', label: 'A Night' },
  { id: 'manners', label: 'Manners' },
  { id: 'team', label: 'Team' },
  { id: 'words', label: 'Words' },
  { id: 'faq', label: 'FAQ' },
];

/** Site pages, used in the footer and on inner pages. */
export const pages = [
  { href: '/journeys', label: 'Journeys' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/stays', label: 'Stays' },
  { href: '/seasons', label: 'The 72 Seasons' },
  { href: '/blossom-and-leaves', label: 'Blossom & Leaves' },
  { href: '/quiet-japan', label: 'Quiet Japan' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
  { href: '/plan', label: 'Plan with us' },
] as const;

export const legalLinks = [
  { href: '/legal#terms', label: 'Booking terms' },
  { href: '/legal#privacy', label: 'Privacy' },
  { href: '/legal#cookies', label: 'Cookies' },
  { href: '/legal#licence', label: 'Licence & registration' },
  { href: '/credits', label: 'Photo credits' },
] as const;
