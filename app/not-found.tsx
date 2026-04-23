import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-luxe py-32 text-center">
      <span className="eyebrow">№ 404</span>
      <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-[-0.015em]">
        This page is <span className="italic text-[color:var(--fg-muted)]">off the menu.</span>
      </h1>
      <p className="mt-6 text-[color:var(--fg-muted)] max-w-md mx-auto">
        Let&apos;s return you to the atelier.
      </p>
      <div className="mt-10 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Atelier</Link>
        <Link href="/shop" className="btn-ghost">Shop</Link>
      </div>
    </section>
  );
}
