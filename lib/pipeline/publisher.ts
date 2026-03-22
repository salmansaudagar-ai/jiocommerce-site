/**
 * Content Publisher
 * Publishes approved queue items to Sanity
 */

import { updateQueueItem, getQueueItems } from '@/lib/supabase/queue';
import { logAuditEntry } from '@/lib/supabase/audit';
import { publishToSanity } from '@/lib/sanity/mutations';

/**
 * Publish a queue item to Sanity
 * Updates queue status and logs to audit trail
 */
export async function publishQueueItem(
  queueItemId: string,
  approvedBy: string
): Promise<void> {
  try {
    // Fetch the queue item
    const items = await getQueueItems();
    const queueItem = items.find((item: any) => item.id === queueItemId);

    if (!queueItem) {
      throw new Error(`Queue item ${queueItemId} not found`);
    }

    if (queueItem.status !== 'approved') {
      throw new Error(`Queue item ${queueItemId} is not approved for publishing`);
    }

    // Generate unique ID for the document
    const docId = `${queueItem.target_schema}_${Date.now()}`;

    // Publish to Sanity
    const result = await publishToSanity(
      queueItem.target_schema,
      docId,
      queueItem.drafted_content
    );

    // Update queue item status
    await updateQueueItem(queueItemId, {
      status: 'published',
      target_id: result._id,
    });

    // Log to audit trail
    await logAuditEntry({
      action: 'content_published',
      target_schema: queueItem.target_schema,
      target_id: result._id,
      change_summary: `Published by ${approvedBy}`,
      source: queueItem.source,
      ai_confidence: queueItem.ai_confidence,
      performed_by: approvedBy,
    });

    // Trigger ISR revalidation
    await triggerRevalidation(queueItem.target_schema);
  } catch (error) {
    console.error('Error publishing queue item:', error);
    throw error;
  }
}

/**
 * Trigger ISR revalidation for affected pages
 */
async function triggerRevalidation(schema: string): Promise<void> {
  const pathMap: Record<string, string[]> = {
    metric: ['/'],
    customer: ['/', '/solutions'],
    feature: ['/platform', '/solutions'],
    post: ['/blog'],
  };

  const paths = pathMap[schema] || ['/'];

  for (const path of paths) {
    try {
      await fetch(new URL('/api/revalidate', process.env.NEXTAUTH_URL).toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });
    } catch (error) {
      console.error(`Failed to revalidate path ${path}:`, error);
    }
  }
}
