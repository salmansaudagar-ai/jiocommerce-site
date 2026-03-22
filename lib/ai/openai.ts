/**
 * OpenAI Provider Implementation
 * Uses openai SDK for API interactions
 */

import OpenAI from 'openai';
import type { AIProvider, ClassifyResult, ValidateResult } from './types';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY environment variable');
    }
    this.client = new OpenAI({ apiKey });
  }

  /**
   * Classify content using OpenAI with classification rules
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

    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo',
      max_tokens: 256,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Classify this content:\n\n${input}`,
        },
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(content);
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
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: context
            ? `Context: ${context}\n\nPrompt: ${prompt}`
            : prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    return content;
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

    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Validate this content:\n\n${content}`,
        },
      ],
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(responseContent);
    return {
      issues: parsed.issues || [],
      score: parsed.score || 50,
    };
  }
}
