/**
 * Sanity Document Generator
 * Generates properly structured Sanity documents based on classified content
 */

import { getProvider } from './provider';
import type { GeneratedDocument } from './types';

/**
 * Generate a Sanity document from classified content
 * Document structure depends on category
 */
export async function generateSanityDocument(
  category: string,
  content: string,
  sourceRef?: string
): Promise<GeneratedDocument> {
  const provider = getProvider();

  switch (category) {
    case 'metric':
      return generateMetricDocument(content, sourceRef, provider);
    case 'customer_win':
      return generateCustomerWinDocument(content, sourceRef, provider);
    case 'feature_announcement':
      return generateFeatureDocument(content, sourceRef, provider);
    case 'blog_content':
      return generateBlogDocument(content, sourceRef, provider);
    default:
      return { _type: 'unknown', source: sourceRef };
  }
}

/**
 * Generate metric document
 * Extracts: number + label
 */
async function generateMetricDocument(
  content: string,
  sourceRef?: string,
  provider?: any
): Promise<GeneratedDocument> {
  // Extract first number and context
  const numberMatch = content.match(/(\d+(?:,\d+)?(?:\.\d+)?)\s*([A-Za-z%]+)?/);
  const value = numberMatch ? numberMatch[1] : '0';
  const unit = numberMatch ? numberMatch[2] : '';

  // Extract label from content context
  const labelMatch = content.match(
    /(?:reached|hit|crossed|achieved)?\s*(.+?)(?:\d|$)/i
  );
  const displayLabel =
    labelMatch && labelMatch[1]
      ? labelMatch[1].trim().slice(0, 100)
      : 'New Metric';

  return {
    _type: 'metric',
    key: displayLabel.toLowerCase().replace(/\s+/g, '_'),
    value: isNaN(parseFloat(value.replace(/,/g, '')))
      ? value
      : parseFloat(value.replace(/,/g, '')),
    displayLabel: `${displayLabel} ${unit}`,
    displayLocation: ['home'],
    source: sourceRef || 'ai_generated',
  };
}

/**
 * Generate customer_win document
 * Extracts: brand name + metric
 */
async function generateCustomerWinDocument(
  content: string,
  sourceRef?: string,
  provider?: any
): Promise<GeneratedDocument> {
  // Extract company name (capitalized proper nouns)
  const companyMatch = content.match(
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:signed|onboarded|launched|partnered)/i
  );
  const companyName = companyMatch ? companyMatch[1] : 'New Customer';

  // Extract metric if available
  const metricMatch = content.match(/(\d+(?:,\d+)?(?:\.\d+)?)\s*%?/);
  const metric = metricMatch ? metricMatch[1] : '';

  const title = `${companyName} Success Story`;
  const slug = companyName.toLowerCase().replace(/\s+/g, '-');

  return {
    _type: 'customer',
    name: companyName,
    slug: { _type: 'slug', current: slug },
    title,
    highlightMetric: metric ? { _type: 'reference', _ref: 'metric_id' } : undefined,
    displayOn: ['home', 'solutions'],
    source: sourceRef || 'ai_generated',
  };
}

/**
 * Generate feature_announcement document
 * Extracts: title + description
 */
async function generateFeatureDocument(
  content: string,
  sourceRef?: string,
  provider?: any
): Promise<GeneratedDocument> {
  const provider_ = getProvider();

  // Use LLM to extract feature title and description
  const extractionPrompt = `From this content, extract:
1. Feature title (2-5 words)
2. Short description (1-2 sentences)

Content: ${content}

Respond as JSON: { "title": "...", "description": "..." }`;

  try {
    const extracted = await provider_.generate(extractionPrompt);
    const parsed = JSON.parse(extracted);

    const title = parsed.title || 'New Feature';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return {
      _type: 'feature',
      title,
      slug: { _type: 'slug', current: slug },
      description: parsed.description || content.slice(0, 200),
      category: 'platform',
      source: sourceRef || 'ai_generated',
    };
  } catch {
    // Fallback: extract first sentence as title
    const firstSentence = content.split('.')[0];
    const title = firstSentence.slice(0, 50);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return {
      _type: 'feature',
      title,
      slug: { _type: 'slug', current: slug },
      description: content.slice(0, 200),
      category: 'platform',
      source: sourceRef || 'ai_generated',
    };
  }
}

/**
 * Generate blog document
 * Generates: title, excerpt, slug, content outline
 */
async function generateBlogDocument(
  content: string,
  sourceRef?: string,
  provider?: any
): Promise<GeneratedDocument> {
  const provider_ = getProvider();

  const generationPrompt = `From this content, generate:
1. SEO-friendly blog title (5-8 words)
2. Compelling excerpt (1-2 sentences)
3. URL slug (lowercase, hyphens)
4. Content outline (3-5 key sections)

Original content: ${content.slice(0, 500)}

Respond as JSON: { "title": "...", "excerpt": "...", "slug": "...", "outline": [...] }`;

  try {
    const generated = await provider_.generate(generationPrompt);
    const parsed = JSON.parse(generated);

    return {
      _type: 'post',
      title: parsed.title || 'Untitled Post',
      slug: { _type: 'slug', current: parsed.slug || 'untitled-post' },
      excerpt: parsed.excerpt || content.slice(0, 100),
      content: content,
      metaDescription:
        parsed.excerpt || content.slice(0, 160),
      tags: extractTags(content),
      status: 'draft',
      source: sourceRef || 'ai_generated',
    };
  } catch {
    // Fallback: use first sentence as title
    const firstSentence = content.split('.')[0];
    const title = firstSentence.slice(0, 60);

    return {
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
      excerpt: content.slice(0, 100),
      content: content,
      status: 'draft',
      source: sourceRef || 'ai_generated',
    };
  }
}

/**
 * Extract tags from content using keyword analysis
 */
function extractTags(content: string): string[] {
  const keywords = [
    'ecommerce',
    'commerce',
    'merchant',
    'payment',
    'order',
    'customer',
    'sales',
    'marketing',
    'platform',
    'feature',
    'integration',
    'api',
  ];

  const foundTags = keywords.filter(
    (kw) =>
      content.toLowerCase().includes(kw) && content.split(kw).length > 1
  );

  return foundTags.slice(0, 5);
}
