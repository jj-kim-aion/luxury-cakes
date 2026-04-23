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
    <section className="container-luxe py-32 text-center">
      <span className="eyebrow">Oven trouble</span>
      <h1 className="mt-6 font-display text-5xl md:text-6xl tracking-[-0.015em]">
        Something <span className="italic text-[color:var(--fg-muted)]">burned.</span>
      </h1>
      <p className="mt-6 text-[color:var(--fg-muted)] max-w-md mx-auto">
        The page failed to render. You can try again, or step back into the atelier.
      </p>
      <div className="mt-10 flex justify-center gap-3">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-ghost">Back to home</Link>
      </div>
    </section>
  );
}
