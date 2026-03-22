import { createClient } from '@supabase/supabase-js';

let supabase: ReturnType<typeof createClient> | null = null;
let supabaseAdmin: ReturnType<typeof createClient> | null = null;

/**
 * Get Supabase client (lazy initialization)
 */
export function getSupabase() {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase configuration');
    }

    supabase = createClient(url, key);
  }
  return supabase;
}

/**
 * Get Supabase admin client (lazy initialization)
 */
export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || (!serviceKey && !anonKey)) {
      throw new Error('Missing Supabase configuration');
    }

    supabaseAdmin = createClient(url, serviceKey || anonKey!);
  }
  return supabaseAdmin;
}
