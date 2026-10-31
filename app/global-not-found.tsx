/* eslint-disable @next/next/no-html-link-for-pages -- this page sits outside the layouts; plain links reload into the right one */
import './globals.css';
import type { Metadata } from 'next';
import { display, geist } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Page not found · Komorebi',
  robots: { index: false },
};

// Unmatched URLs in any language. Bypasses the layouts, so it carries its own <html>.
export default function GlobalNotFound() {
  return (
    <html lang="en-GB" className={`${display.variable} ${geist.variable}`}>
      <body>
        <main className="flex min-h-svh flex-col items-start justify-center gap-6 bg-washi px-gutter">
          <p className="label">404</p>
          <h1 className="max-w-[16ch] text-h2">This path isn&rsquo;t on the map.</h1>
          <p className="max-w-[40ch] text-lead">Even in Kyoto, the side streets sometimes end in a garden wall.</p>
          <p className="flex flex-wrap gap-4 text-label">
            <a href="/" className="underline underline-offset-4">Back to the beginning</a>
            <a href="/fr" lang="fr" className="underline underline-offset-4">Français</a>
            <a href="/de" lang="de" className="underline underline-offset-4">Deutsch</a>
            <a href="/es" lang="es" className="underline underline-offset-4">Español</a>
          </p>
        </main>
      </body>
    </html>
  );
}
