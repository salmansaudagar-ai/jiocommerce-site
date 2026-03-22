/**
 * AI Provider Factory
 * Returns configured provider based on AI_PROVIDER env var
 */

import type { AIProvider } from './types';
import { ClaudeProvider } from './claude';
import { OpenAIProvider } from './openai';

/**
 * Get configured AI provider
 * Defaults to 'claude' if not specified
 */
export function getProvider(): AIProvider {
  const providerName = process.env.AI_PROVIDER || 'claude';

  switch (providerName.toLowerCase()) {
    case 'openai':
      return new OpenAIProvider();
    case 'claude':
    default:
      return new ClaudeProvider();
  }
}
