import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="container-luxe text-center"
      style={{ paddingBlock: 'clamp(6rem, 12vw, 10rem)' }}
    >
      <span className="eyebrow">№ 404</span>
      <h1 className="mt-6 font-display text-display font-medium leading-[1.02] tracking-tight">
        That cake is{' '}
        <em className="italic text-fg-muted">no longer on the board.</em>
      </h1>
      <p className="lead mt-8 mx-auto">
        Perhaps it was seasonal. Perhaps we retired it. The full collection awaits.
      </p>
      <div className="mt-10">
        <Link href="/shop" className="btn-primary">
          Back to the shop
        </Link>
      </div>
    </section>
  );
}
