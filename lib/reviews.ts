import { createClient } from '@supabase/supabase-js';

export interface Review {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string;
  author: string;
  created_at: string;
}

export interface ReviewsResult {
  average: number;
  count: number;
  reviews: Review[];
}

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://okrmuhvykmjpilhzingj.supabase.co';
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_F9D6fAyNRrOyTuqQy5Aliw_f9Q7Fbuw';

/** Server-side helper shared by GET /api/products/[id]/reviews and the detail page. */
export async function getReviews(productId: number): Promise<ReviewsResult> {
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from('reviews')
    .select('id, user_id, product_id, rating, comment, author, created_at')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);

  const reviews = (data ?? []) as Review[];
  const count = reviews.length;
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  const average = count === 0 ? 0 : Math.round((sum / count) * 10) / 10;
  return { average, count, reviews };
}
