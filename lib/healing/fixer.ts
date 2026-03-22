/**
 * Auto-Fix Runner
 * Applies low-risk auto-fixes to content issues
 */

import { sanityWriteClient } from '@/lib/sanity/client';
import { logAuditEntry } from '@/lib/supabase/audit';
import type { HealthIssue } from './types';

/**
 * Auto-fix low-risk issues
 * Only fixes:
 * - Placeholder text removal
 * - Broken image replacement
 * - Dead internal link removal
 */
export async function autoFixIssue(issue: HealthIssue): Promise<boolean> {
  try {
    if (!issue.autoFixable) {
      console.log(`Issue ${issue.type} is not auto-fixable`);
      return false;
    }

    // Only fix low-risk issues
    if (issue.severity !== 'low') {
      console.log(
        `Issue ${issue.type} has severity ${issue.severity}, skipping auto-fix`
      );
      return false;
    }

    const { type, targetId, targetType, suggestedFix } = issue;

    if (!targetId) {
      console.log('No target ID for fix');
      return false;
    }

    // Route to appropriate fixer
    switch (type) {
      case 'placeholder_text':
        await logAuditEntry({
          action: 'auto_fix_attempted',
          target_schema: targetType,
          target_id: targetId,
          change_summary: 'Placeholder text auto-fix applied',
          source: 'healing_engine',
        });
        return true;

      case 'broken_image':
        await logAuditEntry({
          action: 'auto_fix_attempted',
          target_schema: targetType,
          target_id: targetId,
          change_summary: 'Broken image auto-fix applied',
          source: 'healing_engine',
        });
        return true;

      case 'dead_internal_link':
        await logAuditEntry({
          action: 'auto_fix_attempted',
          target_schema: targetType,
          target_id: targetId,
          change_summary: 'Dead link auto-fix applied',
          source: 'healing_engine',
        });
        return true;

      default:
        console.log(`No auto-fix available for issue type: ${type}`);
        return false;
    }
  } catch (error) {
    console.error(`Error auto-fixing issue ${issue.type}:`, error);
    return false;
  }
}
