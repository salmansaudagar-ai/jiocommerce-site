/**
 * SEO Health Check
 * Validates SEO fields (metaDescription, title, sections)
 */

import { getSanityClient } from '@/lib/sanity/client';
import { addToQueue } from '@/lib/supabase/queue';
import { logAuditEntry } from '@/lib/supabase/audit';
import { getProvider } from '@/lib/ai/provider';
import type { HealthIssue } from '../types';

/**
 * Check SEO requirements
 * Flags missing/incomplete SEO fields (does NOT auto-fix)
 */
export async function checkSEO(): Promise<{
  found: number;
  fixed: number;
  issues: HealthIssue[];
}> {
  const found: HealthIssue[] = [];
  let fixed = 0;

  try {
    // Check all content pages
    const query = `
      *[_type in ["page", "post", "feature"]] {
        _id,
        _type,
        title,
        metaDescription,
        content,
        sections
      }
    `;

    const documents = (await getSanityClient().fetch(query)) as any[];
    const provider = getProvider();

    for (const doc of documents) {
      // Check title
      if (!doc.title || doc.title.length === 0) {
        found.push({
          type: 'missing_title',
          severity: 'critical',
          description: `${doc._type} is missing title`,
          autoFixable: false,
          suggestedFix: 'Add descriptive title (30-60 characters)',
          targetId: doc._id,
          targetType: doc._type,
        });
      }

      // Check metaDescription
      if (!doc.metaDescription || doc.metaDescription.length === 0) {
        found.push({
          type: 'missing_meta_description',
          severity: 'high',
          description: `${doc._type} is missing SEO meta description`,
          autoFixable: false,
          suggestedFix: 'Add meta description (150-160 characters)',
          targetId: doc._id,
          targetType: doc._type,
        });

        // Generate suggestion using LLM
        try {
          const generationPrompt = `Generate a compelling SEO meta description for this content:

Title: ${doc.title}
Content: ${doc.content?.slice(0, 500) || 'N/A'}

Meta description should be 150-160 characters, include the main keyword, and be compelling.`;

          const suggestion = await provider.generate(generationPrompt);

          // Queue for review
          await addToQueue({
            action: 'update',
            target_schema: doc._type,
            target_id: doc._id,
            drafted_content: {
              title: doc.title,
              suggestedMetaDescription: suggestion,
            },
            source: 'healing_engine_seo_check',
            ai_confidence: 0.7,
            ai_reasoning: 'Generated suggested meta description',
            status: 'pending',
          });

          await logAuditEntry({
            action: 'seo_suggestion_created',
            target_schema: doc._type,
            target_id: doc._id,
            change_summary: 'Generated suggested meta description',
            source: 'healing_engine',
          });
        } catch (error) {
          console.error('Error generating meta description:', error);
        }
      }

      // Check for content sections
      if (
        !doc.sections ||
        (Array.isArray(doc.sections) && doc.sections.length === 0)
      ) {
        found.push({
          type: 'missing_sections',
          severity: 'medium',
          description: `${doc._type} has no content sections`,
          autoFixable: false,
          suggestedFix: 'Organize content into sections for better SEO',
          targetId: doc._id,
          targetType: doc._type,
        });
      }

      // Check meta description length
      if (
        doc.metaDescription &&
        doc.metaDescription.length > 160
      ) {
        found.push({
          type: 'seo_description_too_long',
          severity: 'low',
          description: `Meta description is ${doc.metaDescription.length} characters (max 160)`,
          autoFixable: false,
          suggestedFix: 'Trim meta description to 150-160 characters',
          targetId: doc._id,
          targetType: doc._type,
        });
      }
    }
  } catch (error) {
    console.error('Error checking SEO:', error);
  }

  return {
    found: found.length,
    fixed,
    issues: found,
  };
}
