import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-luxe py-32 text-center">
      <span className="eyebrow">№ 404</span>
      <h1 className="mt-6 font-display text-5xl md:text-7xl">
        That cake is <span className="italic text-[color:var(--fg-muted)]">no longer on the board.</span>
      </h1>
      <p className="mt-6 text-[color:var(--fg-muted)] max-w-md mx-auto">
        Perhaps it was seasonal, or perhaps we retired it. The full collection awaits.
      </p>
      <div className="mt-10">
        <Link href="/shop" className="btn-primary">Back to the shop</Link>
      </div>
    </section>
  );
}
