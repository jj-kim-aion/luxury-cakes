'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '@/lib/products';

const SORTS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'name',       label: 'A → Z' },
  { value: 'price-asc',  label: 'Price — low' },
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
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    update({ q: searchInput.trim() || null });
  }

  return (
    <div className="space-y-6">
      {/* Category chips */}
      <div
        role="tablist"
        aria-label="Cake categories"
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!activeCategory}
          onClick={() => update({ category: null })}
          className="chip"
          data-active={!activeCategory}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            role="tab"
            aria-selected={activeCategory === c.value}
            onClick={() => update({ category: c.value })}
            className="chip"
            data-active={activeCategory === c.value}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <form onSubmit={onSubmit} className="flex-1">
          <label className="sr-only" htmlFor="shop-search">
            Search cakes
          </label>
          <div
            className="flex items-center gap-3 input-luxe px-4"
            style={{ padding: 0, height: 56 }}
          >
            <Search size={16} strokeWidth={1.5} className="ml-4 text-fg-muted flex-shrink-0" aria-hidden="true" />
            <input
              id="shop-search"
              type="search"
              placeholder="Search by flavour, name, occasion…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-fg-muted"
            />
            <button
              type="submit"
              className="h-full px-5 text-[11px] uppercase tracking-luxe font-medium
                         transition-colors duration-base hover:bg-ink hover:text-cream
                         focus-visible:outline-none"
              style={{
                borderLeft: '1px solid var(--border-soft)',
                color: 'var(--fg-primary)',
              }}
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <label htmlFor="shop-sort" className="eyebrow">
            Sort
          </label>
          <div
            className="relative rounded-md"
            style={{ border: '1px solid var(--border-soft)' }}
          >
            <select
              id="shop-sort"
              value={activeSort}
              onChange={(e) =>
                update({ sort: e.target.value === 'featured' ? null : e.target.value })
              }
              className="appearance-none bg-transparent pl-4 pr-10 h-12 text-sm outline-none font-medium
                         focus-visible:outline-none"
              style={{ color: 'var(--fg-primary)' }}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
              aria-hidden="true"
            >
              <polyline points="1,1 5,5 9,1" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="eyebrow text-fg-muted animate-shimmer">Curating…</div>
      )}
    </div>
  );
}
