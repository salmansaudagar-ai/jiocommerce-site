import { createClient } from 'next-sanity';

let sanityClient: ReturnType<typeof createClient> | null = null;
let sanityWriteClient: ReturnType<typeof createClient> | null = null;

export function getSanityClient() {
  if (!sanityClient) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    }

    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-22';

    sanityClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }

  return sanityClient;
}

export function getSanityWriteClient() {
  if (!sanityWriteClient) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    }

    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-22';

    sanityWriteClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }

  return sanityWriteClient;
}
