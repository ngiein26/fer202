import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const productId = body?.productId;
    if (productId) {
      revalidatePath('/products/' + productId);
      return NextResponse.json({ revalidated: true });
    }
  } catch (err) {
    console.error('Revalidation error:', err);
  }
  return NextResponse.json({ revalidated: false }, { status: 400 });
}

