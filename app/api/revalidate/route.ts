/**
 * POST /api/revalidate
 * Triggers ISR revalidation for specified paths
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

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
    const { path } = body;

    if (!path) {
      return NextResponse.json(
        { error: 'Missing required field: path' },
        { status: 400 }
      );
    }

    // Revalidate path
    revalidatePath(path);

    return NextResponse.json({
      success: true,
      message: `Revalidated path: ${path}`,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in revalidate route:', error);
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
