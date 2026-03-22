/**
 * POST /api/approve
 * Approve or reject queue items
 */

import { NextRequest, NextResponse } from 'next/server';
import { updateQueueItem, getQueueItems } from '@/lib/supabase/queue';
import { logAuditEntry } from '@/lib/supabase/audit';
import { publishQueueItem } from '@/lib/pipeline/publisher';

export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.API_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { queueItemId, action, approvedBy } = body;

    if (!queueItemId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: queueItemId, action' },
        { status: 400 }
      );
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be "approve" or "reject"' },
        { status: 400 }
      );
    }

    // Get queue item
    const items = await getQueueItems();
    const queueItem = items.find(
      (item: any) => item.id === queueItemId
    ) as any;

    if (!queueItem) {
      return NextResponse.json(
        { error: 'Queue item not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      // Update to approved status
      const updated = await updateQueueItem(queueItemId, {
        status: 'approved',
        approved_by: approvedBy || 'system',
        approved_at: new Date().toISOString(),
      });

      // Log approval
      await logAuditEntry({
        action: 'content_approved',
        target_schema: queueItem?.target_schema,
        change_summary: 'Content approved for publishing',
        source: queueItem?.source,
        performed_by: approvedBy || 'system',
      });

      // Automatically publish
      try {
        await publishQueueItem(queueItemId, approvedBy || 'system');
      } catch (error) {
        console.error('Error auto-publishing after approval:', error);
        // Still return success since item is approved
      }

      return NextResponse.json({
        success: true,
        action: 'approved',
        item: updated,
      });
    } else {
      // Reject
      const updated = await updateQueueItem(queueItemId, {
        status: 'rejected',
        approved_by: approvedBy || 'system',
        approved_at: new Date().toISOString(),
      });

      // Log rejection
      await logAuditEntry({
        action: 'content_rejected',
        target_schema: queueItem?.target_schema,
        change_summary: 'Content rejected',
        source: queueItem?.source,
        performed_by: approvedBy || 'system',
      });

      return NextResponse.json({
        success: true,
        action: 'rejected',
        item: updated,
      });
    }
  } catch (error) {
    console.error('Error in approve route:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
