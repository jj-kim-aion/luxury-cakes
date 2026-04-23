import { NextResponse } from 'next/server';
import { getProductBySlug, getRelatedProducts } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const product = getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    const related = getRelatedProducts(product.slug, product.category, 3);
    return NextResponse.json(
      { product, related },
      { headers: { 'Cache-Control': 'public, max-age=3600' } },
    );
  } catch (err) {
    console.error(`GET /api/products/${params.slug} failed`, err);
    return NextResponse.json(
      { error: 'Failed to load product', details: String(err) },
      { status: 500 },
    );
  }
}
