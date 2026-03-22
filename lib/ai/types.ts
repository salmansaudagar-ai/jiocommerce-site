/**
 * AI Provider Types and Interfaces
 */

export interface ClassifyResult {
  /** Classified category of content */
  category: 'metric' | 'customer_win' | 'feature_announcement' | 'blog_content' | 'irrelevant';
  /** Confidence score 0-1 */
  confidence: number;
  /** Reasoning for classification */
  reasoning: string;
}

export interface ValidateResult {
  /** Array of issues found in content */
  issues: Array<{
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    autoFixable: boolean;
    suggestedFix?: string;
  }>;
  /** Overall content quality score 0-100 */
  score: number;
}

/**
 * Abstract AI Provider interface
 * Implementations: Claude, OpenAI
 */
export interface AIProvider {
  /**
   * Classify content into predefined categories
   */
  classify(input: string, categories: string[]): Promise<ClassifyResult>;

  /**
   * Generate new content based on prompt and optional context
   */
  generate(prompt: string, context?: string): Promise<string>;

  /**
   * Validate content against business rules
   */
  validate(content: string, rules: string[]): Promise<ValidateResult>;
}

export interface SlideContent {
  slideNumber: number;
  text: string;
  classified?: ClassifyResult;
}

export interface GeneratedDocument {
  _type: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  metaDescription?: string;
  tags?: string[];
  displayLabel?: string;
  displayLocation?: string;
  value?: string | number;
  key?: string;
  source?: string;
  [key: string]: unknown;
}
