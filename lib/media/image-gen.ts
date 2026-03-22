/**
 * Image Generation Module
 * Generates images using DALL-E 3 API
 */

import OpenAI from 'openai';

let imageGenerationCount = 0;
const MAX_PER_RUN = parseInt(process.env.IMAGE_MAX_PER_RUN || '10');

/**
 * Generate image from prompt
 * Uses DALL-E 3 via OpenAI
 */
export async function generateImage(prompt: string): Promise<string> {
  // Check rate limit
  if (imageGenerationCount >= MAX_PER_RUN) {
    console.log(
      `Image generation limit reached (${MAX_PER_RUN} per run)`
    );
    return getPlaceholderUrl();
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OPENAI_API_KEY not configured, using placeholder');
    return getPlaceholderUrl();
  }

  try {
    const client = new OpenAI({ apiKey });

    // Add style prefix if configured
    const stylePrefix = process.env.IMAGE_STYLE_PROMPT || '';
    const fullPrompt = stylePrefix
      ? `${stylePrefix}. ${prompt}`
      : prompt;

    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    imageGenerationCount++;

    const url = response.data[0]?.url;

    if (!url) {
      console.error('No image URL in response');
      return getPlaceholderUrl();
    }

    return url;
  } catch (error) {
    console.error('Error generating image:', error);
    return getPlaceholderUrl();
  }
}

/**
 * Get placeholder image URL
 */
function getPlaceholderUrl(): string {
  return 'https://via.placeholder.com/1024x1024?text=Generated+Image';
}

/**
 * Reset count (call at start of each run)
 */
export function resetImageCount(): void {
  imageGenerationCount = 0;
}

/**
 * Get current image count
 */
export function getImageCount(): number {
  return imageGenerationCount;
}
