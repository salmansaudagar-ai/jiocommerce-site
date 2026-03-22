/**
 * Image Health Check
 * Validates image URLs and replaces broken images with placeholders
 */

import { getSanityClient, getSanityWriteClient } from '@/lib/sanity/client';
import { logAuditEntry } from '@/lib/supabase/audit';
import type { HealthIssue } from '../types';

const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/1200x630?text=Missing+Image';

/**
 * Check all image URLs for availability
 * Auto-fixes broken images by replacing with placeholder
 */
export async function checkImages(): Promise<{
  found: number;
  fixed: number;
  issues: HealthIssue[];
}> {
  const found: HealthIssue[] = [];
  let fixed = 0;

  try {
    // Fetch all documents with image references
    const query = `
      *[_type in ["page", "post", "feature", "customer"]] {
        _id,
        _type,
        title,
        coverImage,
        ogImage,
        logo,
        "images": [
          title,
          coverImage,
          ogImage,
          logo
        ]
      }
    `;

    const documents = (await getSanityClient().fetch(query)) as any[];

    for (const doc of documents) {
      const imageFields = ['coverImage', 'ogImage', 'logo'];

      for (const field of imageFields) {
        const imageRef = doc[field];
        if (!imageRef) continue;

        const imageUrl =
          typeof imageRef === 'string'
            ? imageRef
            : imageRef.url || imageRef.asset;

        if (!imageUrl) continue;

        // Check if URL is accessible
        try {
          const response = await fetch(imageUrl, {
            method: 'HEAD',
          });

          if (response.status === 404 || response.status >= 500) {
            const issue: HealthIssue = {
              type: 'broken_image',
              severity: 'high',
              description: `Broken image URL in ${doc._type}.${field}: ${response.status}`,
              autoFixable: true,
              suggestedFix: `Replace broken image with placeholder`,
              targetId: doc._id,
              targetType: doc._type,
            };

            found.push(issue);

            // Auto-fix: replace with placeholder
            try {
              const patch: any = {
                [field]: PLACEHOLDER_IMAGE,
              };

              await getSanityWriteClient()
                .patch(doc._id)
                .set(patch)
                .commit();

              fixed++;

              // Log fix
              await logAuditEntry({
                action: 'auto_fix_broken_image',
                target_schema: doc._type,
                target_id: doc._id,
                change_summary: `Replaced broken image in ${field} with placeholder`,
                source: 'healing_engine',
              });
            } catch (error) {
              console.error(
                `Error fixing image in ${doc._id}:`,
                error
              );
            }
          }
        } catch (error) {
          const issue: HealthIssue = {
            type: 'unreachable_image',
            severity: 'high',
            description: `Cannot reach image URL in ${doc._type}.${field}`,
            autoFixable: true,
            suggestedFix: 'Replace with placeholder',
            targetId: doc._id,
            targetType: doc._type,
          };

          found.push(issue);

          // Auto-fix: replace with placeholder
          try {
            const patch: any = {
              [field]: PLACEHOLDER_IMAGE,
            };

            await getSanityWriteClient()
              .patch(doc._id)
              .set(patch)
              .commit();

            fixed++;
          } catch (patchError) {
            console.error(
              `Error fixing unreachable image in ${doc._id}:`,
              patchError
            );
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking images:', error);
  }

  return {
    found: found.length,
    fixed,
    issues: found,
  };
}
