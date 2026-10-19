export function PlaceholderTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/30 px-2 py-0.5 text-[11px] tracking-wide uppercase ${className}`}
    >
      Placeholder
    </span>
  );
}

export function VerifyTag({ note, className = '' }: { note?: string; className?: string }) {
  return (
    <span
      title={note ?? 'Verify before launch'}
      className={`inline-flex items-center gap-1 rounded-full bg-beni/10 px-2 py-0.5 text-[11px] tracking-wide text-[#8a3420] uppercase ${className}`}
    >
      <span aria-hidden="true">●</span> Verify{note ? <span className="sr-only">: {note}</span> : null}
    </span>
  );
}
