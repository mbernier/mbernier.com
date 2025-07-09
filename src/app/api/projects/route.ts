import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const projectType = searchParams.get('type') || '';
    const featured = searchParams.get('featured') === 'true';
    const showOnOffers = searchParams.get('showOnOffers') === 'true';
    
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any = {};

    if (showOnOffers) {
      whereConditions.showOnOffersPage = true;
    }

    // Get projects and total count
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: whereConditions,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          features: true,
          image: true,
          url: true,
          createdAt: true,
          updatedAt: true,
          showOnOffersPage: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.project.count({ where: whereConditions }),
    ]);

    // For now, just return basic filter options
    const projectTypes = ['All'];

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
      filters: {
        projectTypes: ['All', ...projectTypes.map(p => p.projectType)],
      },
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 