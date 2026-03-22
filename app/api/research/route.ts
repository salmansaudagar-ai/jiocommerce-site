/**
 * POST /api/research
 * Fetches competitor sites and analyzes for gap analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { crawlCompetitors } from '@/lib/research/competitor';
import { getProvider } from '@/lib/ai/provider';
import { routeContent } from '@/lib/pipeline/router';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.API_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch competitor content
    const competitorContent = await crawlCompetitors();

    if (competitorContent.length === 0) {
      return NextResponse.json({
        success: true,
        suggestionsCount: 0,
        message: 'No competitor content found',
      });
    }

    // Analyze for gaps
    const provider = getProvider();
    const analysisPrompt = `Analyze these competitor approaches and suggest content gaps for Jio Commerce:

${competitorContent
  .map(
    (comp, i) =>
      `Competitor ${i + 1} (${comp.sourceUrl}):\n${comp.content.slice(0, 1000)}`
  )
  .join('\n\n')}

Provide 3-5 specific content ideas we should create to fill gaps. Format as JSON:
{
  "suggestions": [
    {
      "title": "...",
      "description": "...",
      "category": "blog_content|feature_announcement|metric"
    }
  ]
}`;

    const analysis = await provider.generate(analysisPrompt);
    const suggestions = JSON.parse(analysis).suggestions || [];

    let itemsQueued = 0;

    // Route suggestions to queue
    for (const suggestion of suggestions) {
      try {
        await routeContent(
          {
            category: suggestion.category,
            confidence: 0.7,
            reasoning: 'Generated from competitor analysis',
          },
          suggestion.description,
          'research_gap_analysis',
          `research_${Date.now()}_${Math.random()}`
        );
        itemsQueued++;
      } catch (error) {
        console.error('Error routing research suggestion:', error);
      }
    }

    return NextResponse.json({
      success: true,
      suggestionsCount: suggestions.length,
      itemsQueued,
      suggestions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in research route:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
