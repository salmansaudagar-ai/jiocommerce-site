/**
 * POST /api/upload
 * Accepts PPTX file, processes slides, classifies content, routes to queue
 */

import { NextRequest, NextResponse } from 'next/server';
import { processPPTX } from '@/lib/pipeline/pptx';
import { generateSanityDocument } from '@/lib/ai/generator';
import { routeContent } from '@/lib/pipeline/router';

export const maxDuration = 120;

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

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.endsWith('.pptx')) {
      return NextResponse.json(
        { error: 'File must be a PPTX file' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Process PPTX
    const slides = await processPPTX(fileBuffer);

    let itemsQueued = 0;
    const categoryCounts: Record<string, number> = {};

    // Process each slide
    for (const slide of slides) {
      try {
        if (!slide.classified || slide.classified.category === 'irrelevant') {
          continue;
        }

        // Count categories
        categoryCounts[slide.classified.category] =
          (categoryCounts[slide.classified.category] || 0) + 1;

        // Generate Sanity document
        const draftedContent = await generateSanityDocument(
          slide.classified.category,
          slide.text,
          `pptx_slide_${slide.slideNumber}`
        );

        // Route to queue
        await routeContent(
          slide.classified,
          slide.text,
          'pptx_upload',
          `${file.name}_slide_${slide.slideNumber}`,
          draftedContent as Record<string, unknown>
        );

        itemsQueued++;
      } catch (error) {
        console.error(
          `Error processing slide ${slide.slideNumber}:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      slidesProcessed: slides.length,
      itemsQueued,
      categories: categoryCounts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in upload route:', error);
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
