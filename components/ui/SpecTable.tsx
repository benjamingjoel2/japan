export function SpecTable({
  rows,
  className = '',
  cols = 2,
  dark = false,
}: {
  rows: { label: string; value: React.ReactNode }[];
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  dark?: boolean;
}) {
  const grid = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <dl className={`grid gap-x-5 gap-y-2.5 ${grid} ${className}`}>
      {rows.map((r) => (
        <div key={r.label} className="flex flex-col">
          <dt className={`text-label first-letter:uppercase ${dark ? 'text-moss-pale' : 'text-moss'}`}>{r.label}</dt>
          <dd className={`text-label first-letter:uppercase ${dark ? 'text-washi' : 'text-sumi'}`}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
