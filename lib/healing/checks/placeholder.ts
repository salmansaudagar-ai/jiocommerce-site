/**
 * Placeholder Cleanup Check
 * Detects and removes placeholder text from content
 */

import { sanityClient, sanityWriteClient } from '@/lib/sanity/client';
import { logAuditEntry } from '@/lib/supabase/audit';
import type { HealthIssue } from '../types';

const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/gi,
  /TODO/g,
  /TBD/g,
  /_{3,}/g, // Three or more underscores
  /PLACEHOLDER/gi,
];

/**
 * Scan all Sanity documents for placeholder text
 * Auto-fixes by removing placeholders (low-risk operation)
 */
export async function checkPlaceholders(): Promise<{
  found: number;
  fixed: number;
  issues: HealthIssue[];
}> {
  const found: HealthIssue[] = [];
  let fixed = 0;

  try {
    // Fetch all documents with text content
    const query = `
      *[_type in ["page", "post", "metric", "feature", "customer"]] {
        _id,
        _type,
        title,
        content,
        excerpt,
        description,
        displayLabel,
        key
      }
    `;

    const documents = (await sanityClient.fetch(query)) as any[];

    for (const doc of documents) {
      const fieldsToCheck = [
        'title',
        'content',
        'excerpt',
        'description',
        'displayLabel',
        'key',
      ];

      for (const field of fieldsToCheck) {
        const value = doc[field];
        if (!value || typeof value !== 'string') continue;

        // Check for placeholders
        for (const pattern of PLACEHOLDER_PATTERNS) {
          if (pattern.test(value)) {
            const issue: HealthIssue = {
              type: 'placeholder_text',
              severity: 'low',
              description: `Placeholder text found in ${doc._type}.${field}`,
              autoFixable: true,
              suggestedFix: `Remove or replace placeholder text in field: ${field}`,
              targetId: doc._id,
              targetType: doc._type,
            };

            found.push(issue);

            // Auto-fix: remove placeholder text
            try {
              const cleaned = value
                .replace(/lorem ipsum/gi, '')
                .replace(/TODO/g, '')
                .replace(/TBD/g, '')
                .replace(/_{3,}/g, '')
                .replace(/PLACEHOLDER/gi, '')
                .trim();

              // Only update if content changed
              if (cleaned !== value && cleaned.length > 0) {
                const patch: any = {
                  _id: doc._id,
                  [field]: cleaned,
                };

                await sanityWriteClient
                  .patch(doc._id)
                  .set(patch)
                  .commit();

                fixed++;

                // Log fix
                await logAuditEntry({
                  action: 'auto_fix_placeholder',
                  target_schema: doc._type,
                  target_id: doc._id,
                  change_summary: `Removed placeholder text from ${field}`,
                  source: 'healing_engine',
                });
              }
            } catch (error) {
              console.error(
                `Error fixing placeholder in ${doc._id}:`,
                error
              );
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking placeholders:', error);
  }

  return {
    found: found.length,
    fixed,
    issues: found,
  };
}
