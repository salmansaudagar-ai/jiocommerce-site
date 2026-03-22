/**
 * POST /api/ingest
 * Scans Slack channels, classifies messages, routes to queue
 */

import { NextRequest, NextResponse } from 'next/server';
import { scanSlackChannels } from '@/lib/pipeline/slack';
import { classifySlackMessage } from '@/lib/ai/classifier';
import { generateSanityDocument } from '@/lib/ai/generator';
import { routeContent } from '@/lib/pipeline/router';

export const maxDuration = 60;

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

    // Check required environment variables
    if (!process.env.SLACK_BOT_TOKEN) {
      return NextResponse.json(
        { error: 'Missing SLACK_BOT_TOKEN configuration' },
        { status: 500 }
      );
    }

    // Scan Slack channels
    const messages = await scanSlackChannels();

    let itemsQueued = 0;
    const categoryCounts: Record<string, number> = {};

    // Process each message
    for (const message of messages) {
      try {
        // Classify message
        const classified = await classifySlackMessage(message.text);

        // Skip irrelevant messages
        if (classified.category === 'irrelevant') {
          continue;
        }

        // Count categories
        categoryCounts[classified.category] =
          (categoryCounts[classified.category] || 0) + 1;

        // Generate Sanity document
        const draftedContent = await generateSanityDocument(
          classified.category,
          message.text,
          message.id
        );

        // Route to queue
        await routeContent(
          classified,
          message.text,
          'slack',
          message.id,
          draftedContent as Record<string, unknown>
        );

        itemsQueued++;
      } catch (error) {
        console.error(
          `Error processing message ${message.id}:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      messagesScanned: messages.length,
      itemsQueued,
      categories: categoryCounts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in ingest route:', error);
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
