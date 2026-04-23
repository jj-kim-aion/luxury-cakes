import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="container-luxe text-center"
      style={{ paddingBlock: 'clamp(6rem, 12vw, 10rem)' }}
    >
      <span className="eyebrow">№ 404</span>
      <h1 className="mt-6 font-display text-display font-medium leading-[1.02] tracking-tight">
        This page is{' '}
        <em className="italic text-fg-muted">off the menu.</em>
      </h1>
      <p className="lead mt-8 mx-auto">
        Let us return you to the atelier.
      </p>
      <div className="mt-10 flex justify-center gap-3 flex-wrap">
        <Link href="/" className="btn-primary">Atelier</Link>
        <Link href="/shop" className="btn-secondary">Shop</Link>
      </div>
    </section>
  );
}
