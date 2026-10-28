import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { getReviews } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = Number(id);
  if (!products.some((p) => p.id === productId)) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  try {
    const result = await getReviews(productId);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
