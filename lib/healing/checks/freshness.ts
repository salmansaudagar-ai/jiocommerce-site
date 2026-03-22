/**
 * Content Freshness Check
 * Flags stale metrics and blog posts
 */

import { sanityClient } from '@/lib/sanity/client';
import { addToQueue } from '@/lib/supabase/queue';
import { logAuditEntry } from '@/lib/supabase/audit';
import type { HealthIssue } from '../types';

const METRIC_FRESHNESS_DAYS = 30;
const BLOG_FRESHNESS_DAYS = 365;

/**
 * Check content age and flag stale items
 * Does NOT auto-fix (requires human review)
 */
export async function checkFreshness(): Promise<{
  found: number;
  fixed: number;
  issues: HealthIssue[];
}> {
  const found: HealthIssue[] = [];
  let fixed = 0;

  try {
    // Check metrics
    const metricsQuery = `
      *[_type == "metric"] {
        _id,
        title,
        updatedAt,
        value
      } | order(updatedAt asc)
    `;

    const metrics = (await sanityClient.fetch(metricsQuery)) as any[];

    for (const metric of metrics) {
      const updatedDate = new Date(metric.updatedAt);
      const daysOld = Math.floor(
        (Date.now() - updatedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysOld > METRIC_FRESHNESS_DAYS) {
        const issue: HealthIssue = {
          type: 'stale_metric',
          severity: 'high',
          description: `Metric is ${daysOld} days old (current value: ${metric.value})`,
          autoFixable: false,
          suggestedFix: 'Review and update metric value',
          targetId: metric._id,
          targetType: 'metric',
        };

        found.push(issue);

        // Create refresh suggestion in queue
        try {
          await addToQueue({
            action: 'update',
            target_schema: 'metric',
            target_id: metric._id,
            drafted_content: {
              title: metric.title,
              suggestedUpdate: true,
            },
            source: 'healing_engine_freshness_check',
            ai_confidence: 0.8,
            ai_reasoning: `Metric is ${daysOld} days old and may need updating`,
            status: 'pending',
          });

          // Log suggestion
          await logAuditEntry({
            action: 'flagged_stale_metric',
            target_schema: 'metric',
            target_id: metric._id,
            change_summary: `Flagged for refresh (${daysOld} days old)`,
            source: 'healing_engine',
          });
        } catch (error) {
          console.error('Error creating refresh suggestion:', error);
        }
      }
    }

    // Check blog posts
    const blogQuery = `
      *[_type == "post" && status == "published"] {
        _id,
        title,
        publishedAt
      } | order(publishedAt asc)
    `;

    const posts = (await sanityClient.fetch(blogQuery)) as any[];

    for (const post of posts) {
      const publishedDate = new Date(post.publishedAt);
      const daysOld = Math.floor(
        (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysOld > BLOG_FRESHNESS_DAYS) {
        const issue: HealthIssue = {
          type: 'stale_blog_post',
          severity: 'medium',
          description: `Blog post is ${daysOld} days old`,
          autoFixable: false,
          suggestedFix: 'Review for accuracy and update if needed',
          targetId: post._id,
          targetType: 'post',
        };

        found.push(issue);

        // Create refresh suggestion
        try {
          await addToQueue({
            action: 'update',
            target_schema: 'post',
            target_id: post._id,
            drafted_content: {
              title: post.title,
              needsRefresh: true,
            },
            source: 'healing_engine_freshness_check',
            ai_confidence: 0.7,
            ai_reasoning: `Blog post is ${daysOld} days old and may need updating`,
            status: 'pending',
          });

          await logAuditEntry({
            action: 'flagged_stale_post',
            target_schema: 'post',
            target_id: post._id,
            change_summary: `Flagged for refresh (${daysOld} days old)`,
            source: 'healing_engine',
          });
        } catch (error) {
          console.error('Error creating blog refresh suggestion:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error checking freshness:', error);
  }

  return {
    found: found.length,
    fixed,
    issues: found,
  };
}
