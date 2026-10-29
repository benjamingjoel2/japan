import { Media } from '@/components/ui/Media';
import { Reveal, SplitWords } from '@/components/ui/Reveal';

function Seal() {
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
      <defs>
        <path id="seal-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--color-beni)" />
      <text fontSize="11.5" letterSpacing="3.2" fill="var(--color-washi)" className="font-sans uppercase">
        <textPath href="#seal-circle">Komorebi · Japan, in its own time ·</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontSize="22" fill="var(--color-washi)" className="font-jp">
        木
      </text>
    </svg>
  );
}

/** Small image / tall image / text, the reference's 1-2-1 image pair. */
export function StayIntro() {
  return (
    <div className="px-gutter py-section">
      <header className="mb-14 max-w-[62rem] lg:mb-[3.5rem]">
        <SplitWords as="h2" text="Where you'll sleep" className="text-h2" />
        <Reveal as="p" className="mt-5 max-w-[36ch] text-lead lg:mt-[1.4vw]">
          Ryokan, temple lodgings, old wooden townhouses and mountain inns. Each one chosen for its people as much as its
          rooms.
        </Reveal>
      </header>
      <div className="grid grid-cols-4 gap-grid">
        <Reveal className="relative col-span-2 aspect-[3/2] self-start overflow-hidden rounded-media md:col-span-1">
          <Media media={{ subject: 'Machiya lattice at dusk, Kyoto', tone: 'lantern' }} ratio={3 / 2} sizes="(min-width: 768px) 25vw, 50vw" />
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative col-span-4 row-start-2 aspect-[4/5] md:col-span-2 md:col-start-2 md:row-start-1"
        >
          <div className="absolute inset-0 overflow-hidden rounded-media">
            <Media media={{ subject: 'Tatami room opening onto a moss garden, sliding doors drawn back', tone: 'paper' }} ratio={4 / 5} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="absolute -bottom-8 left-1/2 size-16 -translate-x-1/2 md:size-[5.5vw]">
            {/* Static on purpose: a continuously rotating seal cost noticeable scroll smoothness on phones. */}
            <Seal />
          </div>
        </Reveal>
        <Reveal delay={0.2} className="col-span-2 self-end md:col-span-1 md:row-start-1">
          <p className="text-body">
            A ryokan where the okami pours your first tea. A temple where you wake for the morning prayers, if you want to.
            A wooden townhouse with your own key and a cypress tub. We choose fewer places and stay longer, so the room
            becomes yours.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
