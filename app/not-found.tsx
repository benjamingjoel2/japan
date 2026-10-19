import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-start justify-center gap-6 px-gutter pt-[var(--header-h)]">
      <p className="label">404</p>
      <h1 className="max-w-[16ch] text-h2">This path isn&rsquo;t on the map.</h1>
      <p className="max-w-[40ch] text-lead">Even in Kyoto, the side streets sometimes end in a garden wall.</p>
      <Button href="/">Back to the beginning</Button>
    </div>
  );
}
