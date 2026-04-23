'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { CATEGORIES } from '@/lib/products';

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'name', label: 'A → Z' },
  { value: 'price-asc', label: 'Price — low' },
  { value: 'price-desc', label: 'Price — high' },
];

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = params.get('category') || '';
  const activeSort = params.get('sort') || 'featured';
  const currentSearch = params.get('q') || '';
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  function update(next: Record<string, string | null>) {
    const qp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === '') qp.delete(k);
      else qp.set(k, v);
    }
    const qs = qp.toString();
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ''}`);
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    update({ q: searchInput.trim() || null });
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => update({ category: null })}
          className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] border transition-all duration-300
            ${!activeCategory
              ? 'bg-[color:var(--fg)] text-[color:var(--bg)] border-[color:var(--fg)]'
              : 'border-[color:var(--rule)] hover:border-[color:var(--fg)]'}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => update({ category: c.value })}
            className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] border transition-all duration-300
              ${activeCategory === c.value
                ? 'bg-[color:var(--fg)] text-[color:var(--bg)] border-[color:var(--fg)]'
                : 'border-[color:var(--rule)] hover:border-[color:var(--fg)]'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <form onSubmit={onSubmit} className="flex-1">
          <label className="sr-only" htmlFor="shop-search">Search cakes</label>
          <div className="flex border border-[color:var(--rule)] focus-within:border-[color:var(--fg)] transition-colors">
            <input
              id="shop-search"
              type="search"
              placeholder="Search by flavour, name, occasion…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[color:var(--fg-muted)]"
            />
            <button
              type="submit"
              className="px-5 text-[11px] uppercase tracking-[0.22em] hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)] transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <label htmlFor="shop-sort" className="eyebrow">Sort</label>
          <select
            id="shop-sort"
            value={activeSort}
            onChange={(e) => update({ sort: e.target.value === 'featured' ? null : e.target.value })}
            className="bg-transparent border border-[color:var(--rule)] px-4 py-3 text-sm outline-none
                       focus:border-[color:var(--fg)] transition-colors"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {isPending && (
        <div className="eyebrow text-[color:var(--fg-muted)] animate-shimmer">Curating…</div>
      )}
    </div>
  );
}
