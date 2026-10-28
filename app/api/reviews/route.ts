import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { products } from '@/data/products';
import { reviewSchema } from '@/lib/reviewSchema';
import { supabaseUrl, supabaseAnonKey } from '@/lib/reviews';

export async function POST(request: NextRequest) {
  // 1. Authentication
  const header = request.headers.get('authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  const token = match?.[1]?.trim();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Client created WITH the user's token so Row Level Security applies.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: 'Bearer ' + token } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Validation
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid input', issues: [{ message: 'Body must be valid JSON' }] },
      { status: 400 }
    );
  }
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { product_id, rating, comment } = parsed.data;

  // 3. Product check
  if (!products.some((p) => p.id === product_id)) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // 4. Insert (user_id and author come from DB defaults)
  const { data, error } = await supabase
    .from('reviews')
    .insert({ product_id, rating, comment })
    .select('id, product_id, rating, comment, author, created_at')
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'You already reviewed this product' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/products/' + product_id);
  return NextResponse.json(data, { status: 201 });
}
