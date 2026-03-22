/**
 * POST /api/health
 * Runs all health checks and returns health score + issues
 */

import { NextRequest, NextResponse } from 'next/server';
import { runHealthChecks } from '@/lib/healing/runner';

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

    // Run health checks
    const result = await runHealthChecks();

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in health route:', error);
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
