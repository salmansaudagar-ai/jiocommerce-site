/**
 * Spelling Check
 * Validates spelling using LLM with brand term whitelist
 */

import { getSanityClient } from '@/lib/sanity/client';
import { getSupabaseAdmin } from '@/lib/supabase/client';
import { logAuditEntry } from '@/lib/supabase/audit';
import { getProvider } from '@/lib/ai/provider';
import type { HealthIssue } from '../types';

/**
 * Check spelling in all content
 * FLAGS ONLY - never auto-corrects
 * Respects brand term whitelist
 */
export async function checkSpelling(): Promise<{
  found: number;
  fixed: number;
  issues: HealthIssue[];
}> {
  const found: HealthIssue[] = [];

  try {
    // Get brand terms whitelist from Supabase
    const brandTerms = await getBrandTermsWhitelist();

    // Fetch all documents with text content
    const query = `
      *[_type in ["page", "post", "feature", "metric"]] {
        _id,
        _type,
        title,
        content,
        excerpt,
        description,
        displayLabel
      }
    `;

    const documents = (await getSanityClient().fetch(query)) as any[];
    const provider = getProvider();

    for (const doc of documents) {
      const textFields = [
        'title',
        'content',
        'excerpt',
        'description',
        'displayLabel',
      ];
      const allText = textFields
        .map((field) => doc[field])
        .filter(Boolean)
        .join(' ');

      if (!allText) continue;

      try {
        // Check spelling using LLM
        const spellCheckPrompt = `Check spelling in this text. Ignore these brand terms: ${brandTerms.join(', ')}

Text:
${allText}

Respond with JSON listing only actual spelling errors (not brand terms):
{
  "errors": [
    {
      "word": "misspelled",
      "position": 0,
      "suggestion": "correct"
    }
  ]
}`;

        const result = await provider.generate(spellCheckPrompt);
        const parsed = JSON.parse(result);

        if (parsed.errors && parsed.errors.length > 0) {
          for (const error of parsed.errors) {
            found.push({
              type: 'spelling_error',
              severity: 'low',
              description: `Possible spelling error in ${doc._type}: "${error.word}"`,
              autoFixable: false,
              suggestedFix: `Replace with: "${error.suggestion}"`,
              targetId: doc._id,
              targetType: doc._type,
            });
          }

          // Log findings
          await logAuditEntry({
            action: 'spelling_issues_flagged',
            target_schema: doc._type,
            target_id: doc._id,
            change_summary: `Found ${parsed.errors.length} potential spelling issues`,
            source: 'healing_engine',
          });
        }
      } catch (error) {
        console.error(`Error checking spelling for ${doc._id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in spelling check:', error);
  }

  return {
    found: found.length,
    fixed: 0, // Never auto-fix
    issues: found,
  };
}

/**
 * Get brand terms whitelist from Supabase kv store
 */
async function getBrandTermsWhitelist(): Promise<string[]> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data } = await supabaseAdmin
      .from('kv_store')
      .select('value')
      .eq('key', 'brand_terms_whitelist')
      .single();

    if (data && 'value' in data) {
      const value = (data as any).value;
      if (value) {
        return JSON.parse(value);
      }
    }
  } catch (error) {
    console.error('Error loading brand terms whitelist:', error);
  }

  // Default brand terms
  return [
    'Jio',
    'Jio Commerce',
    'JioCom',
    'DRF',
    'SaaS',
    'API',
    'OAuth',
    'IPv4',
  ];
}
