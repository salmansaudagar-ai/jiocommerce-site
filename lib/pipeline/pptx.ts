/**
 * PPTX File Processing Pipeline
 * Extracts and classifies text from PowerPoint presentations
 */

import JSZip from 'jszip';
import { classifySlackMessage } from '@/lib/ai/classifier';
import type { SlideContent } from '@/lib/ai/types';

/**
 * Process PPTX file and extract classified slide content
 * PPTX files are ZIP archives containing XML files
 */
export async function processPPTX(fileBuffer: Buffer): Promise<SlideContent[]> {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(fileBuffer);

  const slides: SlideContent[] = [];
  let slideNumber = 1;

  // PowerPoint slide files are in ppt/slides/ directory
  const slideFiles = Object.keys(loadedZip.files)
    .filter((path) => path.startsWith('ppt/slides/slide') && path.endsWith('.xml'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)![0]);
      const numB = parseInt(b.match(/\d+/)![0]);
      return numA - numB;
    });

  // Process each slide
  for (const slideFile of slideFiles) {
    try {
      const content = await loadedZip.file(slideFile)!.async('text');
      const text = extractTextFromSlideXml(content);

      if (text.trim()) {
        const classification = await classifySlackMessage(text);

        slides.push({
          slideNumber,
          text,
          classified: classification,
        });

        slideNumber++;
      }
    } catch (error) {
      console.error(`Error processing ${slideFile}:`, error);
    }
  }

  return slides;
}

/**
 * Extract text from PowerPoint slide XML
 * PowerPoint stores text in <a:t> elements within the slide XML
 */
function extractTextFromSlideXml(xmlContent: string): string {
  const texts: string[] = [];

  // Regular expression to match text elements: <a:t>text</a:t>
  const textRegex = /<a:t>([^<]+)<\/a:t>/g;
  let match;

  while ((match = textRegex.exec(xmlContent)) !== null) {
    const text = match[1];
    // Decode XML entities
    const decoded = decodeXmlEntities(text);
    if (decoded.trim()) {
      texts.push(decoded);
    }
  }

  return texts.join(' ');
}

/**
 * Decode XML entities
 */
function decodeXmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }

  return decoded;
}
