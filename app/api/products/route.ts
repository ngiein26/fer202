import { products } from '@/data/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');

  let result = products;

  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  if (category) {
    const lower = category.toLowerCase();
    result = result.filter((p) => p.category.toLowerCase() === lower);
  }

  return NextResponse.json(result, { status: 200 });
}
