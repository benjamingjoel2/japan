'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { anchors, pages, site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { lockScroll } from './SmoothScroll';

function Logo({ light }: { light: boolean }) {
  return (
    <span className={`flex items-baseline gap-2 ${light ? 'text-washi' : 'text-sumi'}`}>
      <span className="font-display text-[26px] leading-none lg:text-[30px]">Komorebi</span>
      <span lang="ja" className="font-jp text-[11px] opacity-70 lg:text-xs">
        {site.ja}
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [overHero, setOverHero] = useState(isHome);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const reduce = useReducedMotion();

  // Hide on scroll down, reveal on scroll up; light text while over the hero video.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOverHero(isHome && y < window.innerHeight - 80);
      setHidden(y > 200 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 200) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Active anchor dot.
  useEffect(() => {
    if (!isHome) return;
    const els = anchors.map((a) => document.getElementById(a.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the menu on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const light = overHero && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-soft ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${light ? 'bg-transparent' : 'bg-washi/85 backdrop-blur-md'}`}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-gutter">
          <Link href={isHome ? '#top' : '/'} className="relative z-10">
            <Logo light={light} />
          </Link>

          <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-[1.4vw]">
              {anchors.map((a) => {
                const isActive = active === a.id;
                return (
                  <li key={a.id}>
                    <a
                      href={href(a.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group relative flex items-center gap-1.5 text-label ${light ? 'text-washi' : 'text-sumi'}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full bg-beni transition-transform duration-500 ease-soft ${
                          isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                        }`}
                      />
                      {a.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <Button href={site.cta.href} variant={light ? 'outline-light' : 'dark'}>
              {site.cta.label}
            </Button>
          </nav>

          <button
            type="button"
            className={`relative z-10 text-label lg:hidden ${light ? 'text-washi' : 'text-sumi'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-washi px-gutter pt-[calc(var(--header-h)+12px)] pb-6 lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Sections">
              <ul className="flex flex-col gap-1">
                {anchors.map((a, i) => (
                  <motion.li
                    key={a.id}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5 }}
                  >
                    <a
                      href={href(a.id)}
                      onClick={() => setOpen(false)}
                      className="font-display text-[11vw] leading-[1.05] sm:text-[8vw]"
                    >
                      {a.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <p className="label">Tell us when you&rsquo;d like to go. We&rsquo;ll do the rest.</p>
              <Button href={site.cta.href} className="w-full">
                {site.cta.label}
              </Button>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-4 pt-10">
              <div>
                <p className="label mb-2">More</p>
                <ul className="flex flex-col gap-1 text-[15px]">
                  {pages.slice(0, 6).map((p) => (
                    <li key={p.href}>
                      <Link href={p.href}>{p.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-media">
                <Media media={{ subject: 'Maple canopy, Kyoto, early morning', tone: 'maple' }} label={false} />
                <div className="absolute inset-0 bg-sumi/30" />
                <span className="absolute bottom-3 left-3 font-display text-xl text-washi">Komorebi</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
