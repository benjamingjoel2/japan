import '../globals.css';
import { SiteShell, shellMetadata } from '@/components/layout/SiteShell';
import { setLocale } from '@/lib/i18n/server';

export { viewport } from '@/components/layout/SiteShell';

export function generateMetadata() {
  setLocale('en');
  return shellMetadata();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  setLocale('en');
  return <SiteShell>{children}</SiteShell>;
}
