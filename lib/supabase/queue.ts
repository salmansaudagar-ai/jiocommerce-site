import { getSupabase } from './client';

export interface QueueItem {
  id?: string;
  action: 'create' | 'update' | 'archive';
  target_schema: string;
  target_id?: string;
  drafted_content: Record<string, unknown>;
  source: string;
  source_ref?: string;
  ai_confidence: number;
  ai_reasoning?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'published';
  approved_by?: string;
  approved_at?: string;
}

export async function getQueueItems(status?: string) {
  const query = (getSupabase() as any)
    .from('content_queue')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function addToQueue(item: QueueItem) {
  const { data, error } = await (getSupabase() as any)
    .from('content_queue')
    .insert([item])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function updateQueueItem(
  id: string,
  updates: Partial<QueueItem>
) {
  const { data, error } = await (getSupabase() as any)
    .from('content_queue')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function getQueueStats() {
  const { data, error } = await (getSupabase() as any)
    .from('content_queue')
    .select('status', { count: 'exact' });

  if (error) throw error;

  const stats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    published: 0,
    total: 0,
  };

  if (data) {
    stats.total = data.length;
    data.forEach((item: any) => {
      if (item.status === 'pending') stats.pending++;
      if (item.status === 'approved') stats.approved++;
      if (item.status === 'rejected') stats.rejected++;
      if (item.status === 'published') stats.published++;
    });
  }

  return stats;
}
