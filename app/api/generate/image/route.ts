/**
 * POST /api/generate/image
 * Generates images using DALL-E 3
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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
    const { prompt, contentId } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return placeholder if not configured
      return NextResponse.json({
        success: true,
        url: 'https://via.placeholder.com/1200x630?text=Generated+Image',
        contentId,
        placeholder: true,
        message: 'Image generation not configured. Using placeholder.',
      });
    }

    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Add style prefix if configured
    const stylePrefix = process.env.IMAGE_STYLE_PROMPT || '';
    const fullPrompt = stylePrefix
      ? `${stylePrefix}. ${prompt}`
      : prompt;

    // Generate image with DALL-E 3
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: imageUrl,
      contentId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in image generation route:', error);

    // Return placeholder on error
    return NextResponse.json({
      success: true,
      url: 'https://via.placeholder.com/1200x630?text=Image+Generation+Error',
      error: error instanceof Error ? error.message : 'Generation failed',
      placeholder: true,
    });
  }
}
