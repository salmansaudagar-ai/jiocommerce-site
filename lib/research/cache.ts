/**
 * Research Cache Module
 * Caches research results with 7-day TTL
 */

import { getSupabaseAdmin } from '@/lib/supabase/client';

export interface CacheEntry {
  sourceUrl: string;
  content: string;
  fetchedAt: string;
  expiresAt: string;
}

const CACHE_TTL_DAYS = 7;

/**
 * Get cached research by source URL
 */
export async function getCachedResearch(
  sourceUrl: string
): Promise<CacheEntry | null> {
  try {
    const supabaseAdmin = getSupabaseAdmin() as any;
    const { data } = await supabaseAdmin
      .from('research_cache')
      .select('*')
      .eq('source_url', sourceUrl)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (!data) {
      return null;
    }

    return {
      sourceUrl: data.source_url,
      content: data.content,
      fetchedAt: data.fetched_at,
      expiresAt: data.expires_at,
    };
  } catch (error) {
    console.error('Error getting cached research:', error);
    return null;
  }
}

/**
 * Cache research result
 */
export async function cacheResearch(entry: CacheEntry): Promise<void> {
  try {
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + CACHE_TTL_DAYS);

    const supabaseAdmin = getSupabaseAdmin() as any;
    await supabaseAdmin.from('research_cache').insert({
      source_url: entry.sourceUrl,
      content: entry.content,
      fetched_at: entry.fetchedAt,
      expires_at: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error caching research:', error);
  }
}

/**
 * Clear expired cache entries
 */
export async function clearExpiredCache(): Promise<number> {
  try {
    const supabaseAdmin = getSupabaseAdmin() as any;
    const { count } = await supabaseAdmin
      .from('research_cache')
      .delete()
      .lt('expires_at', new Date().toISOString());

    return count || 0;
  } catch (error) {
    console.error('Error clearing expired cache:', error);
    return 0;
  }
}
