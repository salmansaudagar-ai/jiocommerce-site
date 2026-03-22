/**
 * POST /api/publish
 * Manually publish approved queue items to Sanity
 */

import { NextRequest, NextResponse } from 'next/server';
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
    const { queueItemId, approvedBy } = body;

    if (!queueItemId) {
      return NextResponse.json(
        { error: 'Missing required field: queueItemId' },
        { status: 400 }
      );
    }

    // Publish queue item
    await publishQueueItem(queueItemId, approvedBy || 'system');

    return NextResponse.json({
      success: true,
      message: 'Content published successfully',
      queueItemId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in publish route:', error);
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
