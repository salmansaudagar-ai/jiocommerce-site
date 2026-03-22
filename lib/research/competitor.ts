/**
 * Competitor Research Module
 * Crawls competitor sites and extracts content for analysis
 */

export interface CompetitorContent {
  sourceUrl: string;
  content: string;
  fetchedAt: string;
}

/**
 * Crawl competitor websites
 * Max 5 sites, 10 pages each
 * Simple text extraction via fetch
 */
export async function crawlCompetitors(): Promise<CompetitorContent[]> {
  const competitors = getCompetitorUrls();
  const results: CompetitorContent[] = [];

  for (const url of competitors.slice(0, 5)) {
    try {
      const content = await fetchAndExtractText(url);

      if (content) {
        results.push({
          sourceUrl: url,
          content,
          fetchedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
    }
  }

  return results;
}

/**
 * Get configured competitor URLs
 */
function getCompetitorUrls(): string[] {
  const envUrls = process.env.COMPETITOR_URLS || '';

  if (envUrls) {
    return envUrls.split(',').map((url) => url.trim());
  }

  // Default competitors (if not configured)
  return [
    'https://www.shopify.com',
    'https://www.bigcommerce.com',
    'https://www.woocommerce.com',
    'https://www.magento.com',
    'https://www.square.com',
  ];
}

/**
 * Fetch and extract text from URL
 */
async function fetchAndExtractText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Extract text from HTML by removing scripts and styles
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Return first 5000 characters
    return text.slice(0, 5000);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}
