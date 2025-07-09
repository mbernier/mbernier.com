import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

interface SearchableContent {
  id: string;
  title: string;
  slug: string;
  type: 'article' | 'project' | 'offer';
  excerpt?: string;
  tags?: string[];
  categories?: string[];
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['admin', 'editor', 'viewer'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Fetch content from different sources
    const [articles, projects, offers] = await Promise.all([
      // Articles
              (type === 'all' || type === 'article') ? prisma.articles.findMany({
        where: {
          status: 'published',
          ...(query && {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { excerpt: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ],
          }),
        },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          tags: true,
          categories: true,
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      }) : [],

      // Projects
      (type === 'all' || type === 'project') ? prisma.project.findMany({
        where: {
          ...(query && {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          }),
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          features: true,
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      }) : [],

      // Offers
      (type === 'all' || type === 'offer') ? prisma.offer.findMany({
        where: {
          ...(query && {
            OR: [
              { offer: { contains: query, mode: 'insensitive' } },
              { company: { contains: query, mode: 'insensitive' } },
            ],
          }),
        },
        select: {
          id: true,
          offer: true,
          company: true,
          tags: true,
          link: true,
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      }) : [],
    ]);

    // Transform to unified format
    const content: SearchableContent[] = [
      // Transform articles
      ...articles.map(article => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        type: 'article' as const,
        excerpt: article.excerpt || undefined,
        tags: article.tags || [],
        categories: article.categories || [],
      })),

      // Transform projects
      ...projects.map(project => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        type: 'project' as const,
        excerpt: project.description || undefined,
        tags: project.features || [],
        categories: [],
      })),

      // Transform offers
      ...offers.map(offer => ({
        id: offer.id,
        title: offer.offer || 'Resource',
        slug: offer.link || '#',
        type: 'offer' as const,
        excerpt: offer.company || undefined,
        tags: offer.tags || [],
        categories: [],
      })),
    ];

    // Sort by relevance if there's a query
    let sortedContent = content;
    if (query) {
      sortedContent = content.sort((a, b) => {
        const aRelevance = calculateRelevance(a, query);
        const bRelevance = calculateRelevance(b, query);
        return bRelevance - aRelevance;
      });
    }

    return NextResponse.json({
      content: sortedContent.slice(0, limit),
      total: sortedContent.length,
      query,
      type,
    });

  } catch (error) {
    console.error('Error searching content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calculateRelevance(item: SearchableContent, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  // Title match (highest weight)
  if (item.title.toLowerCase().includes(lowerQuery)) {
    score += 10;
  }

  // Exact title match (bonus)
  if (item.title.toLowerCase() === lowerQuery) {
    score += 20;
  }

  // Excerpt match
  if (item.excerpt?.toLowerCase().includes(lowerQuery)) {
    score += 5;
  }

  // Tag match
  const tagMatches = item.tags?.filter(tag => 
    tag.toLowerCase().includes(lowerQuery)
  ).length || 0;
  score += tagMatches * 3;

  // Category match
  const categoryMatches = item.categories?.filter(category => 
    category.toLowerCase().includes(lowerQuery)
  ).length || 0;
  score += categoryMatches * 3;

  return score;
}