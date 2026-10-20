import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://okrmuhvykmjpilhzingj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_F9D6fAyNRrOyTuqQy5Aliw_f9Q7Fbuw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
