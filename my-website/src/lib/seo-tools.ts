import { EnhancedContentItem } from './enhanced-metadata';

export interface SEOValidationResult {
  isValid: boolean;
  score: number; // 0-100
  issues: SEOIssue[];
  recommendations: string[];
  socialPreview: SocialPreview;
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'images' | 'social' | 'technical';
  message: string;
  field?: string;
  severity: number; // 1-10
}

export interface SocialPreview {
  twitter: {
    title: string;
    description: string;
    image: string;
    card: string;
  };
  facebook: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  linkedin: {
    title: string;
    description: string;
    image: string;
  };
  whatsapp: {
    title: string;
    description: string;
    image: string;
  };
}

/**
 * Validates SEO requirements for an article or project
 */
export function validateSEO(content: EnhancedContentItem, type: 'article' | 'project' = 'article'): SEOValidationResult {
  const issues: SEOIssue[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Title validation
  if (!content.title) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Title is required',
      field: 'title',
      severity: 10
    });
    score -= 15;
  } else {
    if (content.title.length < 30) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Title is too short (< 30 characters). Consider making it more descriptive.',
        field: 'title',
        severity: 5
      });
      score -= 5;
    }
    if (content.title.length > 60) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Title is too long (> 60 characters). It may be truncated in search results.',
        field: 'title',
        severity: 6
      });
      score -= 8;
    }
  }

  // Description validation
  const description = content.description || content.excerpt;
  if (!description) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Meta description is required',
      field: 'description',
      severity: 9
    });
    score -= 12;
  } else {
    if (description.length < 120) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Meta description is too short (< 120 characters). Consider adding more detail.',
        field: 'description',
        severity: 4
      });
      score -= 4;
    }
    if (description.length > 160) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Meta description is too long (> 160 characters). It may be truncated.',
        field: 'description',
        severity: 5
      });
      score -= 6;
    }
  }

  // Focus keyword validation
  if (!content.focus_keyword) {
    issues.push({
      type: 'warning',
      category: 'meta',
      message: 'Focus keyword not set. This helps with SEO targeting.',
      field: 'focus_keyword',
      severity: 6
    });
    score -= 8;
    recommendations.push('Add a focus keyword that represents the main topic of your content');
  } else {
    // Check if focus keyword appears in title
    if (!content.title.toLowerCase().includes(content.focus_keyword.toLowerCase())) {
      issues.push({
        type: 'info',
        category: 'meta',
        message: 'Focus keyword not found in title. Consider including it for better SEO.',
        field: 'focus_keyword',
        severity: 3
      });
      score -= 3;
    }

    // Check if focus keyword appears in description
    if (description && !description.toLowerCase().includes(content.focus_keyword.toLowerCase())) {
      issues.push({
        type: 'info',
        category: 'meta',
        message: 'Focus keyword not found in description. Consider including it naturally.',
        field: 'focus_keyword',
        severity: 2
      });
      score -= 2;
    }
  }

  // Categories validation
  if (!content.categories || content.categories.length === 0) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: 'No categories assigned. Categories help with content organization and SEO.',
      field: 'categories',
      severity: 5
    });
    score -= 5;
  }

  // Tags validation
  if (!content.tags || content.tags.length === 0) {
    issues.push({
      type: 'info',
      category: 'content',
      message: 'No tags assigned. Tags can help with content discoverability.',
      field: 'tags',
      severity: 2
    });
    score -= 2;
  } else if (content.tags.length > 10) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: 'Too many tags (> 10). Consider using fewer, more targeted tags.',
      field: 'tags',
      severity: 3
    });
    score -= 3;
  }

  // Image validation
  if (!content.image) {
    issues.push({
      type: 'warning',
      category: 'images',
      message: 'No hero image set. Images improve social sharing and engagement.',
      field: 'image',
      severity: 6
    });
    score -= 6;
    recommendations.push('Add a hero image to improve social media sharing');
  } else {
    if (!content.image_alt) {
      issues.push({
        type: 'warning',
        category: 'images',
        message: 'Missing alt text for hero image. Alt text is important for accessibility and SEO.',
        field: 'image_alt',
        severity: 5
      });
      score -= 5;
    }
  }

  // Social media optimization
  if (!content.social_title && !content.og_image) {
    recommendations.push('Consider customizing social media title and image for better sharing');
  }

  if (!content.twitter_card) {
    issues.push({
      type: 'info',
      category: 'social',
      message: 'Twitter card type not specified. Will default to summary_large_image.',
      field: 'twitter_card',
      severity: 1
    });
  }

  // Technical SEO
  if (content.canonical_url) {
    try {
      new URL(content.canonical_url);
    } catch {
      issues.push({
        type: 'error',
        category: 'technical',
        message: 'Invalid canonical URL format',
        field: 'canonical_url',
        severity: 7
      });
      score -= 7;
    }
  }

  // Article-specific validations
  if (type === 'article') {
    if (!content.reading_time) {
      recommendations.push('Add reading time estimate to improve user experience');
    }

    if (!content.date) {
      issues.push({
        type: 'error',
        category: 'meta',
        message: 'Publication date is required for articles',
        field: 'date',
        severity: 8
      });
      score -= 10;
    }
  }

  // Generate social previews
  const socialPreview = generateSocialPreviews(content);

  // Final score adjustments
  score = Math.max(score, 0);
  score = Math.round(score);

  return {
    isValid: issues.filter(i => i.type === 'error').length === 0,
    score,
    issues: issues.sort((a, b) => b.severity - a.severity),
    recommendations,
    socialPreview
  };
}

/**
 * Generates social media previews for testing
 */
export function generateSocialPreviews(content: EnhancedContentItem): SocialPreview {
  const baseUrl = 'https://mbernier.com';
  const title = content.title;
  const description = content.description || content.excerpt || '';
  const image = content.og_image || content.image || '/matt.hat.jpg';
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    twitter: {
      title: content.social_title || title,
      description: (content.social_description || description).substring(0, 200),
      image: imageUrl,
      card: content.twitter_card || 'summary_large_image'
    },
    facebook: {
      title: content.social_title || title,
      description: (content.facebook_description || content.social_description || description).substring(0, 300),
      image: imageUrl,
      type: 'article'
    },
    linkedin: {
      title: content.social_title || title,
      description: (content.social_description || description).substring(0, 256),
      image: imageUrl
    },
    whatsapp: {
      title: title,
      description: description.substring(0, 160),
      image: imageUrl
    }
  };
}

/**
 * Generates SEO testing URLs for various tools
 */
export function generateSEOTestingUrls(url: string) {
  const encodedUrl = encodeURIComponent(url);
  
  return {
    // Social media debugging tools
    facebookDebugger: `https://developers.facebook.com/tools/debug/?q=${encodedUrl}`,
    twitterCardValidator: `https://cards-dev.twitter.com/validator`,
    linkedInPostInspector: `https://www.linkedin.com/post-inspector/inspect/${encodedUrl}`,
    
    // SEO tools
    googleSearchConsole: 'https://search.google.com/search-console',
    googleRichResults: `https://search.google.com/test/rich-results?url=${encodedUrl}`,
    googlePageSpeed: `https://pagespeed.web.dev/?url=${encodedUrl}`,
    
    // Structured data testing
    schemaMarkupValidator: `https://validator.schema.org/#url=${encodedUrl}`,
    googleStructuredData: `https://search.google.com/structured-data/testing-tool#url=${encodedUrl}`,
    
    // Meta tag analyzers
    metaTagsIo: `https://metatags.io/?url=${encodedUrl}`,
    openGraphCheck: `https://opengraphcheck.com/result.php?url=${encodedUrl}`,
    
    // Mobile testing
    googleMobileFriendly: `https://search.google.com/test/mobile-friendly?url=${encodedUrl}`,
    
    // Social media preview tools
    socialSharePreview: `https://socialsharepreview.com/?url=${encodedUrl}`,
    debugBear: `https://www.debugbear.com/test/website-speed?url=${encodedUrl}`
  };
}

/**
 * Generates a comprehensive SEO report
 */
export function generateSEOReport(content: EnhancedContentItem, type: 'article' | 'project' = 'article') {
  const validation = validateSEO(content, type);
  const url = `https://mbernier.com/${type === 'article' ? 'articles' : 'projects'}/${content.slug}`;
  const testingUrls = generateSEOTestingUrls(url);
  
  return {
    ...validation,
    url,
    testingUrls,
    checklist: generateSEOChecklist(content, type),
    nextSteps: generateNextSteps(validation)
  };
}

/**
 * Generates an SEO checklist for content creators
 */
export function generateSEOChecklist(content: EnhancedContentItem, type: 'article' | 'project') {
  return [
    { task: 'Title is between 30-60 characters', completed: content.title && content.title.length >= 30 && content.title.length <= 60 },
    { task: 'Meta description is between 120-160 characters', completed: !!(content.description || content.excerpt) && (content.description || content.excerpt)!.length >= 120 && (content.description || content.excerpt)!.length <= 160 },
    { task: 'Focus keyword is set', completed: !!content.focus_keyword },
    { task: 'Focus keyword appears in title', completed: !!(content.focus_keyword && content.title?.toLowerCase().includes(content.focus_keyword.toLowerCase())) },
    { task: 'Categories are assigned', completed: !!(content.categories && content.categories.length > 0) },
    { task: 'Hero image is set', completed: !!content.image },
    { task: 'Image alt text is provided', completed: !!content.image_alt },
    { task: 'Social media title is optimized', completed: !!content.social_title },
    { task: 'Open Graph image is set', completed: !!(content.og_image || content.image) },
    { task: 'Twitter card type is specified', completed: !!content.twitter_card },
    { task: 'Schema.org type is defined', completed: !!content.schema_type },
    ...(type === 'article' ? [
      { task: 'Publication date is set', completed: !!content.date },
      { task: 'Reading time is estimated', completed: !!content.reading_time },
      { task: 'Tags are assigned (3-8 recommended)', completed: !!(content.tags && content.tags.length >= 3 && content.tags.length <= 8) }
    ] : [])
  ];
}

/**
 * Generates recommended next steps based on validation results
 */
export function generateNextSteps(validation: SEOValidationResult): string[] {
  const steps: string[] = [];
  
  // Priority fixes based on errors
  const errors = validation.issues.filter(i => i.type === 'error');
  errors.forEach(error => {
    steps.push(`🔴 Fix: ${error.message}`);
  });
  
  // High priority warnings
  const highPriorityWarnings = validation.issues.filter(i => i.type === 'warning' && i.severity >= 6);
  highPriorityWarnings.forEach(warning => {
    steps.push(`🟡 Improve: ${warning.message}`);
  });
  
  // Add recommendations
  validation.recommendations.forEach(rec => {
    steps.push(`💡 Consider: ${rec}`);
  });
  
  // Score-based suggestions
  if (validation.score < 70) {
    steps.push('📊 Overall SEO score is below 70. Focus on fixing errors and high-priority warnings first.');
  } else if (validation.score < 85) {
    steps.push('📊 Good SEO foundation! Address remaining warnings to reach excellent score.');
  } else {
    steps.push('🎉 Excellent SEO optimization! Consider testing social media previews.');
  }
  
  return steps;
} 