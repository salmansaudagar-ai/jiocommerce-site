/**
 * Self-Healing Engine Types
 */

export interface HealthIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  autoFixable: boolean;
  suggestedFix?: string;
  targetId?: string;
  targetType?: string;
}

export interface HealthCheckDetail {
  name: string;
  passed: boolean;
  issuesFound: number;
  issuesFixed: number;
  issuesFlagged: number;
}

export interface HealthCheckRunResult {
  issues_found: number;
  issues_fixed: number;
  issues_flagged: number;
  health_score: number;
  checks: HealthCheckDetail[];
  details?: Record<string, unknown>;
}
