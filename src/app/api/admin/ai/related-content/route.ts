import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { suggestRelatedLinks } from '@/lib/openai';

interface RelatedContentItem {
  id: string;
  title: string;
  slug: string;
  type: 'article' | 'project' | 'offer';
  excerpt?: string;
  tags?: string[];
  categories?: string[];
  relevanceScore?: number;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['admin', 'editor'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, availableContent } = await request.json();

    if (!content || !availableContent || !Array.isArray(availableContent)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Transform availableContent to the format expected by suggestRelatedLinks
    const transformedContent = availableContent.map((item: RelatedContentItem) => ({
      title: item.title,
      slug: item.slug,
      type: item.type as 'article' | 'project',
    }));

    // Use OpenAI to suggest related content
    const suggestions = await suggestRelatedLinks(content, transformedContent);

    // Enhance suggestions with additional metadata
    const enhancedSuggestions = suggestions.map(suggestion => {
      const originalItem = availableContent.find(
        (item: RelatedContentItem) => item.slug === suggestion.slug && item.type === suggestion.type
      );
      
      return {
        id: originalItem?.id || suggestion.slug,
        title: suggestion.title,
        slug: suggestion.slug,
        type: suggestion.type,
        excerpt: originalItem?.excerpt,
        tags: originalItem?.tags,
        categories: originalItem?.categories,
        relevanceScore: suggestion.relevanceScore,
      };
    });

    return NextResponse.json(enhancedSuggestions);
  } catch (error) {
    console.error('Error generating related content suggestions:', error);
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
  }
}