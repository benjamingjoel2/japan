'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { lockScroll } from '@/components/layout/SmoothScroll';

/** Native <dialog> (focus trap + Esc for free), with scroll lock and backdrop click to close. */
export function Dialog({
  open,
  onClose,
  label,
  children,
  className = '',
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) {
      d.showModal();
      lockScroll(true);
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) lockScroll(false);
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto max-h-[92svh] w-[min(100%-20px,1100px)] overflow-y-auto rounded-card bg-washi p-0 text-sumi backdrop:bg-sumi/60 backdrop:backdrop-blur-sm open:animate-[dialog-in_.5s_cubic-bezier(.22,1,.36,1)] ${className}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="sticky top-3 z-10 float-right mr-3 grid size-10 place-items-center rounded-full bg-sumi text-washi"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {children}
    </dialog>
  );
}
