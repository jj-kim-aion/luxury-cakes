'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className="container-luxe text-center"
      style={{ paddingBlock: 'clamp(6rem, 12vw, 10rem)' }}
    >
      <span className="eyebrow">Oven trouble</span>
      <h1 className="mt-6 font-display text-h1 font-medium leading-tight tracking-tight">
        Something{' '}
        <em className="italic text-fg-muted">burned.</em>
      </h1>
      <p className="lead mt-8 mx-auto">
        The page failed to render. Try again, or step back into the atelier.
      </p>
      <div className="mt-10 flex justify-center gap-3 flex-wrap">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-secondary">Back to home</Link>
      </div>
    </section>
  );
}
