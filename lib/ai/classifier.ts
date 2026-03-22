/**
 * Content Classification Module
 * Classifies Slack messages and content into marketing categories
 */

import { getProvider } from './provider';
import type { ClassifyResult } from './types';

const CATEGORIES = [
  'metric',
  'customer_win',
  'feature_announcement',
  'blog_content',
  'irrelevant',
];

const METRIC_KEYWORDS = [
  'orders',
  'gmv',
  'revenue',
  'uptime',
  'crossed',
  'hit',
  'reached',
  'customers',
  'users',
  'transactions',
];

const CUSTOMER_WIN_KEYWORDS = [
  'signed',
  'onboarded',
  'launched',
  'partnered',
  'collaborated',
  'integrated',
  'adopted',
  'implemented',
];

const FEATURE_KEYWORDS = [
  'launching',
  'shipped',
  'releasing',
  'v2',
  'v3',
  'feature',
  'new',
  'beta',
  'available',
];

/**
 * Classify a Slack message into content categories
 * Uses LLM with pattern matching as fallback
 */
export async function classifySlackMessage(message: string): Promise<ClassifyResult> {
  const provider = getProvider();

  try {
    return await provider.classify(message, CATEGORIES);
  } catch (error) {
    console.error('LLM classification failed, falling back to pattern matching:', error);
    return classifyByPatterns(message);
  }
}

/**
 * Fallback classification using pattern matching
 * Implements tie-breaking: metric + customer name → customer_win
 */
function classifyByPatterns(message: string): ClassifyResult {
  const lowerMessage = message.toLowerCase();
  const wordCount = message.split(/\s+/).length;

  // Check for numbers (metric indicator)
  const hasNumbers = /\d+/.test(message);
  const hasMetricKeywords = METRIC_KEYWORDS.some((kw) =>
    lowerMessage.includes(kw)
  );

  // Check for customer/brand indicators
  const hasCustomerKeywords = CUSTOMER_WIN_KEYWORDS.some((kw) =>
    lowerMessage.includes(kw)
  );
  const hasCompanyName =
    /[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/.test(message);

  // Check for feature indicators
  const hasFeatureKeywords = FEATURE_KEYWORDS.some((kw) =>
    lowerMessage.includes(kw)
  );

  // Check for blog indicators
  const isBlogLength = wordCount > 200;
  const hasBlogIndicators =
    /\b(article|blog|post|guide|tutorial|case study|whitepaper)\b/i.test(
      message
    );

  // Tie-breaking: metric + customer name → customer_win
  if (
    hasMetricKeywords &&
    hasCustomerKeywords &&
    hasCompanyName &&
    hasNumbers
  ) {
    return {
      category: 'customer_win',
      confidence: 0.85,
      reasoning:
        'Contains numbers and customer/acquisition keywords with company name',
    };
  }

  // Classify by signal strength
  if (hasCustomerKeywords && hasCompanyName) {
    return {
      category: 'customer_win',
      confidence: 0.8,
      reasoning: 'Contains customer/acquisition keywords and company name',
    };
  }

  if (hasFeatureKeywords) {
    return {
      category: 'feature_announcement',
      confidence: 0.8,
      reasoning: 'Contains feature/launch keywords',
    };
  }

  if (hasMetricKeywords && hasNumbers) {
    return {
      category: 'metric',
      confidence: 0.85,
      reasoning: 'Contains numbers and metric keywords',
    };
  }

  if (isBlogLength || hasBlogIndicators) {
    return {
      category: 'blog_content',
      confidence: 0.7,
      reasoning: 'Long-form content or blog indicators detected',
    };
  }

  return {
    category: 'irrelevant',
    confidence: 0.6,
    reasoning: 'Does not match primary content categories',
  };
}
