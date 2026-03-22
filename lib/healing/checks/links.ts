/**
 * Link Health Check
 * Validates internal links and removes/flags dead links
 */

import { getSanityClient, getSanityWriteClient } from '@/lib/sanity/client';
import { logAuditEntry } from '@/lib/supabase/audit';
import type { HealthIssue } from '../types';

// Known valid page slugs
const VALID_SLUGS = [
  '/',
  'home',
  'blog',
  'platform',
  'solutions',
  'platform/core-commerce',
  'platform/fulfillment',
  'platform/marketplace',
];

/**
 * Extract and validate internal links from content
 * Auto-fixes by removing dead links (keeps text)
 */
export async function checkLinks(): Promise<{
  found: number;
  fixed: number;
  issues: HealthIssue[];
}> {
  const found: HealthIssue[] = [];
  let fixed = 0;

  try {
    // Fetch all documents with content
    const query = `
      *[_type in ["page", "post", "feature"]] {
        _id,
        _type,
        title,
        content
      }
    `;

    const documents = (await getSanityClient().fetch(query)) as any[];

    for (const doc of documents) {
      if (!doc.content || typeof doc.content !== 'string') continue;

      // Extract links from markdown or HTML
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      const deadLinks: string[] = [];

      while ((match = linkRegex.exec(doc.content)) !== null) {
        const [fullMatch, text, href] = match;

        // Skip external links
        if (href.startsWith('http://') || href.startsWith('https://')) {
          continue;
        }

        // Check if internal link is valid
        const slug = href.startsWith('/') ? href.slice(1) : href;

        if (!isValidSlug(slug)) {
          const issue: HealthIssue = {
            type: 'dead_internal_link',
            severity: 'medium',
            description: `Dead internal link in ${doc._type}: ${href}`,
            autoFixable: true,
            suggestedFix: `Remove link, keep text: "${text}"`,
            targetId: doc._id,
            targetType: doc._type,
          };

          found.push(issue);
          deadLinks.push(fullMatch);
        }
      }

      // Auto-fix: remove dead links but keep text
      if (deadLinks.length > 0) {
        try {
          let updated = doc.content;

          for (const deadLink of deadLinks) {
            // Extract text from [text](url) and replace with just text
            const textMatch = deadLink.match(/\[([^\]]+)\]/);
            const text = textMatch ? textMatch[1] : '';
            updated = updated.replace(deadLink, text);
          }

          await getSanityWriteClient()
            .patch(doc._id)
            .set({ content: updated })
            .commit();

          fixed += deadLinks.length;

          // Log fix
          await logAuditEntry({
            action: 'auto_fix_dead_links',
            target_schema: doc._type,
            target_id: doc._id,
            change_summary: `Removed ${deadLinks.length} dead internal links`,
            source: 'healing_engine',
          });
        } catch (error) {
          console.error(
            `Error fixing links in ${doc._id}:`,
            error
          );
        }
      }
    }
  } catch (error) {
    console.error('Error checking links:', error);
  }

  return {
    found: found.length,
    fixed,
    issues: found,
  };
}

/**
 * Check if a slug is valid (exists in known pages)
 */
function isValidSlug(slug: string): boolean {
  // Normalize slug
  const normalized = slug
    .toLowerCase()
    .split('#')[0] // Remove hash fragments
    .split('?')[0]; // Remove query params

  return VALID_SLUGS.some(
    (valid) =>
      normalized === valid ||
      normalized === `/${valid}` ||
      normalized.startsWith(valid + '/')
  );
}
