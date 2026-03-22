import { getSupabase } from './client';

export interface AuditEntry {
  action: string;
  target_schema?: string;
  target_id?: string;
  change_summary?: string;
  source: string;
  ai_confidence?: number;
  performed_by?: string;
}

export async function logAuditEntry(entry: AuditEntry) {
  const { data, error } = await (getSupabase() as any)
    .from('audit_log')
    .insert([entry] as any)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function getAuditLog(limit: number = 50, offset: number = 0) {
  const { data, error } = await (getSupabase() as any)
    .from('audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
}

export async function getAuditByTarget(
  targetSchema: string,
  targetId: string
) {
  const { data, error } = await (getSupabase() as any)
    .from('audit_log')
    .select('*')
    .eq('target_schema', targetSchema)
    .eq('target_id', targetId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
