# Komorebi content brief (for anyone writing /data or /content)

Komorebi: private, slow journeys in Japan, planned around the seasons and away from the crowds.
Promise: "Japan, in its own time." Audience: curious, unhurried travellers from the US, UK, Europe and
Australia, often on a first or second trip. They want depth, craft, food, nature and calm, not a checklist.

## Voice
Gentle, precise, observant, quietly poetic. Like a good haiku: concrete details, nothing wasted.
Short sentences. Specific times, textures, foods, sounds. Second person ("you") is fine. British spelling
("travellers", "colour"). Examples of the voice:
- "Kyoto at 7am belongs to the monks and the gardeners. We'll get you there at 6:45."
- "The menu changes when the season does. In Japan, that's about every five days."
- "Take your shoes off. You'll be surprised how much else comes off with them."
- "We don't do Japan in ten cities. We do it in four, properly."

Never use: "zen" as an adjective, "exotic", "land of the rising sun", "kawaii", geisha clichés,
"hidden gem", "must-see", "bucket list", "nestled", "breathtaking", "vibrant", "tapestry", "delve".
No exclamation marks. No emoji.

## Honesty rules
- Stays, team members, reviews and quotes are PLACEHOLDERS with invented names. Never use a real hotel,
  ryokan, temple lodging or real person's name for them.
- Real public places (temples, gardens, towns, trails) may be named in itineraries and Quiet Japan tips,
  but anything specific (opening times, prices, rules, policies) must be framed as typical and carry a
  verify flag where the type supports it.
- Prices, rail passes, entry rules and taxes change: say so and mark them for verification.

## Canonical slugs (use exactly these)
Destinations: tokyo, kyoto, nara, kanazawa, takayama-alps, hakone-fuji, kiso-valley, koyasan,
kumano-kodo, naoshima, hiroshima-miyajima, hokkaido, okinawa, kyushu

Journeys: kyoto-nara-slowly ("Kyoto & Nara, Slowly"), the-old-roads ("The Old Roads: Nakasendō &
Kumano Kodo"), art-islands-inland-sea ("Art, Islands & the Inland Sea"), blossom-season ("Blossom
Season"), autumn-in-the-alps ("Autumn in the Alps"), snow-and-onsen ("Snow & Onsen: Hokkaido in
Winter"), first-time-done-well ("First Time, Done Well" — Tokyo, Hakone, Kyoto, Kanazawa), craft-japan
("Craft Japan" — potters, indigo, lacquer, sake)

Stays (placeholder names, invented):
| slug | name | type | destination |
|---|---|---|---|
| yuzuriha | Yuzuriha | ryokan | kyoto |
| kinari-machiya | Kinari Machiya | machiya | kyoto |
| hoshi-no-in | Hoshi-no-in | shukubo | koyasan |
| kumo-no-yu | Kumo-no-yu | onsen inn | takayama-alps |
| shirakaba | Shirakaba | onsen inn | hokkaido |
| sumi-house | Sumi House | design hotel | tokyo |
| nagi | Nagi | ryokan | hakone-fuji |
| tsuta-machiya | Tsuta Machiya | machiya | kanazawa |
| shiosai | Shiosai | design hotel | naoshima |
| hinoki-juku | Hinoki-juku | ryokan | kiso-valley |

## Placeholder media
`Media = { subject: string; tone: Tone; alt?: string }` where Tone is one of
'leaf' | 'mist' | 'dusk' | 'night' | 'blossom' | 'maple' | 'snow' | 'sea' | 'stone' | 'cedar' | 'lantern' | 'paper'.
`subject` describes the photograph we want, concretely, e.g. "Light through maple leaves, Tōfuku-ji, 7am".
`alt` is a short accessible description of the same.

Types live in /data/types.ts. Import with `import type { ... } from './types'`.
