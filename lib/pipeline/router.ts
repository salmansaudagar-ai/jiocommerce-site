/**
 * Content Router
 * Routes classified content to the queue for review and publishing
 */

import { addToQueue, type QueueItem } from '@/lib/supabase/queue';
import { logAuditEntry } from '@/lib/supabase/audit';
import type { ClassifyResult } from '@/lib/ai/types';

/**
 * Route classified content to queue for approval
 * Creates a drafted Sanity document in the queue
 */
export async function routeContent(
  classified: ClassifyResult,
  rawContent: string,
  source: string,
  sourceRef: string,
  draftedContent?: Record<string, unknown>
): Promise<string> {
  // Determine target schema based on classification
  const targetSchema = getTargetSchema(classified.category);

  // Create queue item
  const queueItem: QueueItem = {
    action: 'create',
    target_schema: targetSchema,
    drafted_content: draftedContent || {
      title: 'AI Generated Content',
      content: rawContent,
    },
    source,
    source_ref: sourceRef,
    ai_confidence: classified.confidence,
    ai_reasoning: classified.reasoning,
    status: 'pending',
  };

  // Add to queue
  const result = await addToQueue(queueItem);

  if (!result || !result.id) {
    throw new Error('Failed to add content to queue');
  }

  // Log to audit trail
  await logAuditEntry({
    action: 'content_ingested',
    target_schema: targetSchema,
    change_summary: `Classified as ${classified.category} with ${(classified.confidence * 100).toFixed(0)}% confidence`,
    source,
    ai_confidence: classified.confidence,
  });

  return result.id;
}

/**
 * Map classification category to Sanity schema type
 */
function getTargetSchema(category: string): string {
  const schemaMap: Record<string, string> = {
    metric: 'metric',
    customer_win: 'customer',
    feature_announcement: 'feature',
    blog_content: 'post',
    irrelevant: 'unknown',
  };

  return schemaMap[category] || 'unknown';
}
