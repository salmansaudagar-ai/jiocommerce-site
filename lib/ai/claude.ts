/**
 * Claude AI Provider Implementation
 * Uses @anthropic-ai/sdk for API interactions
 */

import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider, ClassifyResult, ValidateResult } from './types';

export class ClaudeProvider implements AIProvider {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Missing ANTHROPIC_API_KEY environment variable');
    }
    this.client = new Anthropic({ apiKey });
  }

  /**
   * Classify content using Claude with classification rules
   * Rules from spec Section 9:
   * - metric: Numbers + scale words (orders, GMV, revenue, uptime, crossed, hit, reached)
   * - customer_win: Brand name + acquisition words (signed, onboarded, launched, partnered)
   * - feature_announcement: Product name + launch words (launching, shipped, releasing, v2)
   * - blog_content: Long-form (>200 words) OR blog indicators
   * - irrelevant: Everything else
   */
  async classify(input: string, categories: string[]): Promise<ClassifyResult> {
    const systemPrompt = `You are a content classifier for a B2B SaaS marketing platform.
Classify the following content into one of these categories: ${categories.join(', ')}

Classification rules:
- metric: Contains numbers + scale words (orders, GMV, revenue, uptime, crossed, hit, reached)
- customer_win: Contains brand name + acquisition words (signed, onboarded, launched, partnered)
- feature_announcement: Contains product name + launch words (launching, shipped, releasing, v2)
- blog_content: Long-form content (>200 words) OR contains blog indicators (title, excerpt, outline)
- irrelevant: Does not fit above categories

Respond with JSON:
{
  "category": "...",
  "confidence": 0.0-1.0,
  "reasoning": "..."
}`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 256,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Classify this content:\n\n${input}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const parsed = JSON.parse(content.text);
    return {
      category: parsed.category || 'irrelevant',
      confidence: parsed.confidence || 0.5,
      reasoning: parsed.reasoning || 'Classification completed',
    };
  }

  /**
   * Generate content with brand context
   */
  async generate(prompt: string, context?: string): Promise<string> {
    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content: context
          ? `Context: ${context}\n\nPrompt: ${prompt}`
          : prompt,
      },
    ];

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages,
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    return content.text;
  }

  /**
   * Validate content against business rules
   */
  async validate(content: string, rules: string[]): Promise<ValidateResult> {
    const systemPrompt = `You are a content quality validator for a B2B SaaS marketing platform.
Validate the following content against these rules:
${rules.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Respond with JSON:
{
  "issues": [
    {
      "type": "...",
      "severity": "critical|high|medium|low",
      "description": "...",
      "autoFixable": boolean,
      "suggestedFix": "..."
    }
  ],
  "score": 0-100
}`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Validate this content:\n\n${content}`,
        },
      ],
    });

    const responseContent = response.content[0];
    if (responseContent.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const parsed = JSON.parse(responseContent.text);
    return {
      issues: parsed.issues || [],
      score: parsed.score || 50,
    };
  }
}
