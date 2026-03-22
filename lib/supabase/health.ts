import { getSupabase } from './client';

export interface HealthCheckResult {
  issues_found: number;
  issues_fixed: number;
  issues_flagged: number;
  details?: Record<string, unknown>;
  health_score: number;
}

export async function saveHealthCheck(result: HealthCheckResult) {
  const { data, error } = await (getSupabase() as any)
    .from('health_checks')
    .insert([result])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function getLatestHealthCheck() {
  const { data, error } = await (getSupabase() as any)
    .from('health_checks')
    .select('*')
    .order('run_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data || null;
}

export async function getHealthHistory(limit: number = 10) {
  const { data, error } = await (getSupabase() as any)
    .from('health_checks')
    .select('*')
    .order('run_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getAverageHealthScore(daysBack: number = 7) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);

  const { data, error } = await (getSupabase() as any)
    .from('health_checks')
    .select('health_score')
    .gte('run_at', cutoffDate.toISOString());

  if (error) throw error;

  if (!data || data.length === 0) return 0;

  const sum = data.reduce((acc: number, item: any) => acc + item.health_score, 0);
  return sum / data.length;
}
