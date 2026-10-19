# Komorebi — Build plan (step 1 of 6)

Status: **awaiting approval**. Nothing is built yet.

---

## 1. The reference, studied

Studied `eaglesnest.sergesyutkin.com` (Webflow build, last published Aug 2025): markup, stylesheet tokens, inline
scripts, and a full scroll-through capture at 1440×900 (page height ≈ 29,000px, so ~32 screens).

### 1.1 Global system

| Aspect | What the reference does | What we'll do (own implementation) |
|---|---|---|
| Type pairing | Display serif with quirky ligatures (headings) + neo-grotesk sans (body, UI) | Display: **Fraunces** (soft, optical-size variable serif). Text/UI: **Geist Sans**. Japanese: **Noto Serif JP** for kanji/kana only. All via `next/font`, self-hosted. |
| Type scale | Fluid, viewport-based. Body `1vw`/140%. H2 `6vw`/100%. H3 `calc(.7vw + 1.2rem)`/120%. Lead `calc(1.125vw + 1.125rem)`/120%. Labels `calc(.4vw + .625rem)`. Hero H1 ≈ `15vw` uppercase, 100% leading. Guidelines ≈ `8vw` uppercase, weight 200, 80% leading. Mobile breakpoints swap to fixed px. | Same *proportions* via Tailwind tokens using `clamp()`, so desktop matches and mobile never gets too small. Breakpoints 480 / 768 / 992 like the reference. |
| Spacing | Side gutter 2rem (20px tablet, 10px mobile). Section padding `10vw` vertical (100px / 80px on smaller). Grid gap ≈ 1.4vw. Section header bottom 3.5rem. | Same rhythm as tokens: `--gutter`, `--section-y`, `--gap`. |
| Colour | Cream paper bg, very dark green ink, muted light-green labels, orange accent word, dark-green full-bleed for video and footer. | **Washi** `#F4EFE4` paper, **Sumi** `#1E1D1A` ink, **Moss** `#6F7A5C` labels, **Beni** `#B4472E` (vermilion, sparing accent), **Night** `#1B2220` for video/footer bands. |
| Radius | 0.5rem on media, 1rem on video cards, pill buttons. | Same. |
| Smooth scroll | Lenis. | `lenis` (MIT) — disabled under `prefers-reduced-motion`. |
| Reveal motion | Elements enter from `opacity 0, blur(5px), translateY(1rem)`. Headings split into lines/words and rise. | Framer Motion `whileInView` variants with the same blur-rise; our own line splitter. All off under reduced motion. |
| Buttons | Pill, dark fill; hover swaps in a second label that slides up. | Same interaction, our own markup. |
| Cursor | Custom cursor dot on fine pointers. | Small dot cursor on `(pointer: fine)` only; off for reduced motion. |
| Scrollbar | Hidden. | Keep visible (accessibility); thin and tinted. |

### 1.2 Section-by-section map → Komorebi

| # | Reference section | Structure, layout and behaviour observed | Komorebi section (anchor) |
|---|---|---|---|
| 0 | **Fixed header** | Two-column grid: logo left; anchor links right, each with a dot that scales in on hover/active; pill CTA at far right. Mobile: logo + "Menu/Close" text toggle opening a full-screen sheet with links, CTA, socials, and an image card. | Logo "Komorebi" + 木漏れ日. Links: **Komorebi · Values · Stay · Journeys · A Night · Manners · Team · Words · FAQ**. CTA **Plan with us** → `/plan`. Active link dot driven by scroll position. |
| 1 | **Video hero** (`100vh`, sticky) | Full-bleed autoplay muted looped video, dark overlay + bottom blur band. Bottom row: two tag pairs left and right, then giant uppercase split title across full width ("Word / Word"). Hero is sticky; content scrolls up over it. | Video placeholder (light through maple leaves). Tags left "Private journeys · Seasonal", right "Slow · Japan". Title **KOMO / REBI**. Sticky, page scrolls over it. |
| 2 | **About + info panel** | H2 + lead paragraph. Below, 3-col grid: large image with text overlay (2 cols), right column = small map + spec list: country, avg temp, elevation, **live local time** with blinking colon and GMT offset. | **#komorebi**. "Japan, in its own time." intro + image-with-overlay text. Info panel (signature 1): **Country** Japan · **Micro-season** (today's, kanji + English, links to /seasons) · **Tokyo time** (live, blinking colon, GMT+9) · **Sunrise in Kyoto** today (computed client-side, no API). Mini map of Japan (own SVG). |
| 3 | **Values trio over full-bleed image** | Small centred label "Core Values"; full-bleed photo; each value (big serif word + 2-line description) appears centred over the image one at a time as you scroll (image sticky, values scroll through). | **#values**. **Shun 旬** · **Ma 間** · **Omotenashi おもてなし**, written fresh. |
| 4 | **Stay intro + image pair** | H2 "Stay…" + lead. Grid 1-2-1: small landscape image top-left, tall portrait image centre, short paragraph bottom-right. Small rotating badge on the tall image. | **#stay**. "Where you'll sleep" intro, same 1-2-1 pair. Badge: a slow-rotating 木漏れ日 seal (our SVG), not a review badge. |
| 5 | **Stacked feature cards** (the "feature tabs") | Sticky heading with one accent word that changes colour. Below, cards stack as you scroll: each card sticks at the same top offset over the previous one; grid 1fr·2fr·1fr = title / image / description, top hairline rule. | **"Included in every journey"** (accent word *every*). Six cards: Private guides · Seasonal dining · Tea & craft · Onsen · Luggage forwarding · Your specialist on call. |
| 6 | **Room slider with spec tables** | Small label "Rooms". Slide = large image left, centre column (big serif name, description, Book button, 2×2 spec table), small image right. Prev/next arrows + dot nav. | **Stays** slider (~10). Spec table: **Type** · **Bath** (private onsen / shared onsen / none) · **Sleeping** (futon / bed) · **Size** · **Guests**. Button "See this stay" → `/stays/[slug]`. Placeholder names. |
| 7 | **Sticky video title + four-card grid** (Yoga) | Giant word ("Yoga", 15vw) sits behind; a video scales from a small centred frame to full-bleed as you scroll, blur lifts. Then a 3-col grid: two text cards left, portrait image centre, two text cards right. | **#journeys**. Giant word **Journeys**, scaling video (Kumano Kodo cedar path). Four cards around a portrait: *Four cities, properly* · *Built around the season* · *Private, never rushed* · *Planned by people who live there*. Link to `/journeys`. |
| 8 | **Weekly schedule marquee** (events) | Large two-line H2. Then a horizontally auto-scrolling, drag-able loop of image cards (title top-left, day top-right, description bottom). Disabled auto-scroll on mobile, swipe instead. | **"Seven days in Kyoto & Nara"**. Seven day cards; each shows **Day n**, a title, and **Morning / Afternoon / Evening**. Auto-scroll pauses on hover/focus and is off under reduced motion; arrow keys work. |
| 9 | **Multi-video five-stage story** (cacao dance) | Dark band. A stack of full-screen videos that are sticky; each new stage scrolls in as a rounded (1rem) card and becomes full-bleed (radius 0) when it fills the screen. Intro panel (H2 + paragraph), then five stages each with big serif title + short paragraph, bottom-left. A sticky CTA block on the right. | **#a-night** — **"A Night in a Ryokan"**. Intro + 5 stages: Arrival · The bath · Kaiseki · Futon · Morning. Sticky right CTA: "Every journey includes at least one night like this." + **Plan with us**. Each video has a WebVTT caption track; under reduced motion, videos show posters only. |
| 10 | **Guidelines grid** | Small label; giant stacked uppercase lines ("BE FREE / BE PRESENT…"), centred, light weight; each line reveals a small description beside it with a dot on hover/scroll. | **#manners** — **"Manners, gently"**. Lines: NO TIPPING · SOAK, THEN SPEAK SOFTLY (onsen) · QUIET CARRIAGES · SHOES OFF · CARRY IT HOME · ASK FIRST (photos) · INK & ONSEN (tattoo policies vary). Kind one-line notes. |
| 11 | **Portrait quote** | Full-bleed portrait image; quote mark, quote text left in large sans whose words un-blur one by one on scroll; logo bottom-left; social icons bottom-right; CTA row below. | Placeholder quote from a ryokan okami or a potter, labelled **Placeholder**. Words un-blur on scroll. CTA "Plan with us". |
| 12 | **Team cards** | H2 left (sticky), 3-col grid of portrait cards on right; name above card, role inside bottom-left. Click opens a modal with photo, role, intro, long bio; Esc closes, background scroll locked. | **#team**. 5 placeholder specialists and local guides. Same card grid; bio opens in an accessible dialog (focus trap, Esc). |
| 13 | **Reviews marquee** | Centred H2; continuously scrolling row of text cards with left hairline; name + "5 star review from …" at the bottom; edges fade. | **#words**. 5 placeholder reviews, each marked **Placeholder**. No stars, no platform names or logos. Pause on hover/focus. |
| 14 | **FAQ with image pairs** | H2 left; accordion right; each item has title + plus icon; open state shows a large + small image pair beside the answer. | **#faq**. 13 questions from your list; each answer with an image pair; verify flags shown where required. |
| 15 | **Footer** | Dark band. Address left, big serif nav centre, socials right; giant uppercase wordmark across the bottom; copyright left, credit right. Footer is revealed (page lifts off it). | Placeholders: company name, address, travel agency registration / licensed Japanese partner, legal links. Wordmark **KOMOREBI**. |
| 16 | **Back to top** | Fixed small round button bottom-left; appears after the hero. | Same, with label and focus style. |

Notes on where I'll knowingly differ:
- **"Feature tabs"** in the reference are scroll-stacked cards, not clickable tabs. I'll match the reference (stacking cards); each card is also a focusable heading so keyboard users get a sensible order.
- **"Expandable bios"**: the reference opens bios in a modal. I'll match with an accessible dialog.
- The reference's **Yoga** block (§7) wasn't in your mapping; I've used it for **Journeys** so the menu item has a home.
- Scrollbar stays visible; custom cursor only on fine pointers.

---

## 2. Signature features

1. **72 micro-seasons** — `/data/seasons.ts` holds all 72 (kanji, romanisation, English, start/end dates, sekki parent, nature note, on the table, related journeys). `getCurrentMicroSeason(date)` powers the info panel and `/seasons` (scrolling calendar, today highlighted). File header and page footer: *"Verify against a reliable source before launch."*
2. **Blossom & Leaves** — `/data/blossom.ts` with ~10 regions (Okinawa, Kagoshima, Fukuoka, Hiroshima, Osaka/Kyoto, Tokyo, Kanazawa, Takayama, Sendai, Sapporo…), typical blossom and kōyō windows. Own SVG map of Japan; a month slider animates the north–south wave. Persistent note: *"Typical windows, not forecasts."* + placeholder link to the official forecast. Regions link to journeys.
3. **Quiet Japan** — `/data/quiet.ts` with ~20 pairings `{famous, quieter, betterTiming, region, why, verify: true}`. Map + filterable list; overtourism note and our guest principles. Each specific place carries a "verify" tag.

---

## 3. Folder structure

```
/app
  layout.tsx                 fonts, metadata, Lenis, header, footer, back-to-top
  page.tsx                   one-page homepage (sections below)
  journeys/page.tsx          + [slug]/page.tsx
  destinations/page.tsx      + [slug]/page.tsx
  stays/page.tsx             + [slug]/page.tsx
  seasons/page.tsx           The 72 Seasons
  blossom-and-leaves/page.tsx
  quiet-japan/page.tsx
  about/page.tsx
  journal/page.tsx           + [slug]/page.tsx (MDX)
  plan/page.tsx              planning form + confirmation state
  legal/page.tsx             (+ privacy, terms sections)
  api/enquiry/route.ts       validates (zod), logs payload, TODO: CRM
  sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
/components
  layout/   Header, MobileMenu, Footer, BackToTop, SmoothScroll, Cursor
  home/     Hero, AboutInfo, Values, StayIntro, IncludedStack, StaySlider,
            JourneysVideo, DayCarousel, RyokanStory, Manners, PortraitQuote,
            Team, Words, Faq
  ui/       Button, Reveal, SplitLines, Marquee, Dialog, Accordion, SpecTable,
            Price (currency-aware), CurrencySwitcher, VerifyTag, PlaceholderTag,
            Media (next/image), VideoPlayer (lazy, captions, reduced-motion)
  features/ LiveClock, MicroSeasonBadge, SunriseKyoto, SeasonCalendar,
            JapanMap, BlossomWave, QuietMap
/config     site.ts (brand, nav, contact placeholders, legal entity),
            currency.ts (rates + "as of" date), theme.ts
/data       types.ts, seasons.ts, blossom.ts, quiet.ts, destinations.ts,
            journeys.ts, stays.ts, included.ts, values.ts, manners.ts,
            team.ts, reviews.ts, faq.ts, kyoto-week.ts, ryokan-night.ts
/content/journal   4 × .mdx
/lib        seasons.ts (date logic), sun.ts (sunrise calc), currency.ts, seo.ts
/public     media/ (posters, placeholders), captions/*.vtt
```

## 4. Core data types (abridged)

```ts
type Slug = string;
type Month = 1|2|3|4|5|6|7|8|9|10|11|12;
type MonthDay = { m: Month; d: number };

interface MicroSeason { n: number; sekki: string; ja: string; romaji: string; en: string;
  start: MonthDay; end: MonthDay; nature: string; onTheTable: string;
  journeys: Slug[]; verify: true }

interface BlossomRegion { id: string; name: string; lat: number; lng: number;
  blossom: { from: MonthDay; to: MonthDay }; leaves: { from: MonthDay; to: MonthDay };
  journeys: Slug[] }

interface QuietPairing { id: string; region: string; famous: string; quieter: string;
  betterTiming?: string; why: string; coords: [number, number]; verify: true }

interface Destination { slug: Slug; name: string; ja?: string; region: string; intro: string;
  bestSeasons: string[]; quietTips: string[]; stays: Slug[]; journeys: Slug[]; image: Media }

type Bath = 'private onsen' | 'shared onsen' | 'none';
interface Stay { slug: Slug; name: string; type: 'ryokan'|'shukubo'|'machiya'|'onsen inn'|'design hotel';
  destination: Slug; bath: Bath; sleeping: 'futon'|'bed'|'futon or bed'; sizeM2: number;
  guests: string; description: string; images: Media[]; placeholder: true }

interface DayPlan { day: number; title: string; morning: string; afternoon: string; evening: string;
  stay?: Slug }
interface Journey { slug: Slug; title: string; summary: string; days: number; fromJPY: number;
  bestMonths: Month[]; destinations: Slug[]; itinerary: DayPlan[]; stays: Slug[];
  experiences: string[]; microSeasons: number[] /* derived from bestMonths */ }

interface TeamMember { name: string; role: string; base: string; intro: string; bio: string;
  image: Media; placeholder: true }
interface Review { quote: string; name: string; from: string; trip: string; placeholder: true }
interface FaqItem { q: string; a: string[]; images: [Media, Media]; verify?: string }
type Currency = 'JPY'|'USD'|'GBP'|'EUR'|'AUD';
```

## 5. Media, plumbing, deployment

- **Imagery & video:** I can't use the reference's media, and there's no photo library yet. Default plan: tasteful
  generated placeholders (gradient/texture SVG posters titled with what the shot should be, e.g. "Light through
  maple leaves, Kyoto, 7am"), and video slots that take a URL from `/config/media.ts` and fall back to the poster.
  Swapping in real footage is a one-file change. Each video slot gets a `.vtt` caption file.
- **Prices:** "from" in JPY in data; switcher converts with fixed rates in `/config/currency.ts` (dated, labelled
  approximate). Choice persisted in `localStorage`.
- **Form:** `/plan` posts to `/api/enquiry`; zod validation; logs payload; `// TODO: CRM integration`.
  Confirmation: "Thank you. We'll write soon."
- **SEO:** per-page metadata, OG images, JSON-LD (TravelAgency, TouristTrip for journeys, FAQPage, Article),
  sitemap, robots.
- **Accessibility:** semantic landmarks, skip link, focus-visible styles, reduced-motion fallbacks for every
  scroll effect, dialog focus trap, marquee pause controls, captions, contrast ≥ 4.5:1.
- **Deploy:** push to this branch, open a draft PR; Vercel deploys from the GitHub integration once you merge
  (or gives a preview per push). I'll confirm the deployment URL at the end.

## 6. Build order (as you specified)

1. ✅ This plan — **waiting for your OK**
2. Layout shell, anchor menu, footer, back-to-top
3. One-page homepage, screenshot-compared against the reference at 1440 / 768 / 390
4. 72 Seasons, Blossom & Leaves, Quiet Japan
5. Journeys, destinations, stays, about, journal, planning form
6. Polish, accessibility, SEO, Lighthouse

Each step checked in the dev server (Playwright screenshots) before the next.
