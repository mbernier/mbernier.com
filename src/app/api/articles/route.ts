import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

console.log('Prisma client imported:', !!prisma);
  console.log('Prisma client has articles model:', !!(prisma && prisma.articles));

export async function GET(request: NextRequest) {
  try {
    console.log('Articles API called');
    console.log('SUPABASE_SESSION_POOLER_URL exists:', !!process.env.SUPABASE_SESSION_POOLER_URL);
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const featured = searchParams.get('featured') === 'true';
    
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: {
      status: string;
      OR?: Array<{
        title?: { contains: string; mode: string };
        excerpt?: { contains: string; mode: string };
        content?: { contains: string; mode: string };
      }>;
      categories?: { has: string };
      tags?: { has: string };
      featured?: boolean;
    } = {
      status: 'published',
    };

    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      whereConditions.categories = {
        has: category,
      };
    }

    if (tag) {
      whereConditions.tags = {
        has: tag,
      };
    }

    if (featured) {
      whereConditions.featured = true;
    }

    console.log('About to query database...');

    // Get articles and total count
    const [articles, total] = await Promise.all([
      prisma.articles.findMany({
        where: whereConditions,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          description: true,
          categories: true,
          tags: true,
          readingTime: true,
          createdAt: true,
          updatedAt: true,
          featured: true,
          image: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
              prisma.articles.count({ where: whereConditions }),
    ]);

    console.log('Database query successful, found', articles.length, 'articles');

    // Get all unique categories and tags for filtering
          const allArticles = await prisma.articles.findMany({
      where: { status: 'published' },
      select: { categories: true, tags: true },
    });

    const allCategories = Array.from(new Set(allArticles.flatMap(a => a.categories || [])));
    const allTags = Array.from(new Set(allArticles.flatMap(a => a.tags || [])));

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
      filters: {
        categories: allCategories,
        tags: allTags,
      },
    });

  } catch (error) {
    console.error('Error fetching articles:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 