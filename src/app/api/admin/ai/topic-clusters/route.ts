import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
// import { suggestRelatedLinks } from '@/lib/openai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ContentCluster {
  topic: string;
  items: RelatedContentItem[];
  relevanceScore: number;
}

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

    // Use AI to generate topic clusters
    const clusters = await generateTopicClusters(content, availableContent);

    return NextResponse.json(clusters);
  } catch (error) {
    console.error('Error generating topic clusters:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateTopicClusters(
  content: string,
  availableContent: RelatedContentItem[]
): Promise<ContentCluster[]> {
  try {
    const prompt = `
Analyze the following content and the available content library to create topic clusters.
Group related content by thematic topics and provide relevance scores.

Current content: ${content}

Available content library:
${availableContent.map(item => `- ${item.type}: ${item.title} | Tags: ${item.tags?.join(', ')} | Categories: ${item.categories?.join(', ')}`).join('\n')}

Please organize the available content into thematic clusters based on the current content.
Consider:
- Topic similarity and thematic relationships
- Complementary content that adds value
- Natural content progression and learning paths
- Professional development themes

Return a JSON array of clusters with this structure:
[
  {
    "topic": "Topic Name (e.g., 'Product Strategy', 'Technical Implementation', 'Team Leadership')",
    "relevanceScore": 0.85,
    "items": [
      {
        "id": "content_id",
        "title": "Content Title",
        "slug": "content-slug",
        "type": "article|project|offer",
        "excerpt": "Brief description",
        "tags": ["tag1", "tag2"],
        "categories": ["category1"],
        "relevanceScore": 0.92
      }
    ]
  }
]

Only include items with relevance scores > 0.6. 
Limit to 5 clusters maximum.
Order clusters by relevance score (highest first).
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content curator and information architect. You specialize in organizing professional content into meaningful thematic clusters. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No clusters generated');
    }

    const clusters = JSON.parse(result);
    
    // Validate and sanitize the response
    if (!Array.isArray(clusters)) {
      throw new Error('Invalid cluster format');
    }

    return clusters.filter(cluster => 
      cluster.topic && 
      Array.isArray(cluster.items) && 
      cluster.items.length > 0 &&
      cluster.relevanceScore > 0.6
    );

  } catch (error) {
    console.error('Error in AI topic clustering:', error);
    
    // Fallback: simple clustering by categories/tags
    const fallbackClusters = createFallbackClusters(content, availableContent);
    return fallbackClusters;
  }
}

function createFallbackClusters(
  content: string,
  availableContent: RelatedContentItem[]
): ContentCluster[] {
  const clusters: ContentCluster[] = [];
  const contentLower = content.toLowerCase();

  // Group by categories first
  const categoryGroups: { [key: string]: RelatedContentItem[] } = {};
  
  availableContent.forEach(item => {
    if (item.categories && item.categories.length > 0) {
      item.categories.forEach(category => {
        if (!categoryGroups[category]) {
          categoryGroups[category] = [];
        }
        categoryGroups[category].push(item);
      });
    }
  });

  // Create clusters from category groups
  Object.entries(categoryGroups).forEach(([category, items]) => {
    if (items.length > 0) {
      // Calculate relevance based on keyword overlap
      const relevanceScore = calculateRelevanceScore(contentLower, items);
      
      if (relevanceScore > 0.3) {
        clusters.push({
          topic: category,
          items: items.map(item => ({
            ...item,
            relevanceScore: calculateItemRelevance(contentLower, item),
          })).filter(item => item.relevanceScore > 0.3),
          relevanceScore,
        });
      }
    }
  });

  // Sort by relevance and limit to top 5
  return clusters
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
}

function calculateRelevanceScore(content: string, items: RelatedContentItem[]): number {
  const contentWords = content.toLowerCase().split(/\s+/);
  let totalScore = 0;
  let itemCount = 0;

  items.forEach(item => {
    const itemWords = [
      ...item.title.toLowerCase().split(/\s+/),
      ...(item.excerpt?.toLowerCase().split(/\s+/) || []),
      ...(item.tags?.map(tag => tag.toLowerCase()) || []),
    ];

    const overlap = contentWords.filter(word => 
      word.length > 3 && itemWords.some(itemWord => itemWord.includes(word))
    ).length;

    const score = overlap / Math.max(contentWords.length, itemWords.length);
    totalScore += score;
    itemCount++;
  });

  return itemCount > 0 ? totalScore / itemCount : 0;
}

function calculateItemRelevance(content: string, item: RelatedContentItem): number {
  const contentWords = content.toLowerCase().split(/\s+/);
  const itemWords = [
    ...item.title.toLowerCase().split(/\s+/),
    ...(item.excerpt?.toLowerCase().split(/\s+/) || []),
    ...(item.tags?.map(tag => tag.toLowerCase()) || []),
  ];

  const overlap = contentWords.filter(word => 
    word.length > 3 && itemWords.some(itemWord => itemWord.includes(word))
  ).length;

  return overlap / Math.max(contentWords.length, itemWords.length);
}