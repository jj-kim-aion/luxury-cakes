import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/mock-data';

type ProductCategory = 'signature' | 'seasonal' | 'wedding' | 'bespoke';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

const CATEGORIES: ProductCategory[] = ['signature', 'seasonal', 'wedding', 'bespoke'];
const SORTS = ['price-asc', 'price-desc', 'name', 'featured'] as const;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryRaw = searchParams.get('category') || undefined;
    const category =
      categoryRaw && (CATEGORIES as string[]).includes(categoryRaw)
        ? (categoryRaw as ProductCategory)
        : undefined;

    const sortRaw = searchParams.get('sort') || undefined;
    const sort = sortRaw && (SORTS as readonly string[]).includes(sortRaw)
      ? (sortRaw as typeof SORTS[number])
      : undefined;

    const search = searchParams.get('q')?.trim() || undefined;

    const products = getAllProducts({ category: category, search, sort });

    return NextResponse.json(
      { count: products.length, products },
      { headers: { 'Cache-Control': 'public, max-age=3600' } },
    );
  } catch (err) {
    console.error('GET /api/products failed', err);
    return NextResponse.json(
      { error: 'Failed to load products' },
      { status: 500 },
    );
  }
}
