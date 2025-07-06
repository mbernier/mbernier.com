import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

async function validateApiKey(apiKey: string) {
  const clientApp = await prisma.clientApp.findUnique({
    where: { apiKey },
  });
  
  return clientApp;
}

async function logUsage(clientAppId: string, endpoint: string, ipAddress: string) {
  await prisma.clientAppUsage.create({
    data: {
      clientAppId,
      endpoint,
      ipAddress,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    const clientApp = await validateApiKey(apiKey);
    
    if (!clientApp) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Check if the client app has permission to create app updates
    if (!clientApp.permissions.includes('create:app_updates')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { app, projectId, link, summary, image } = body;

    if (!app || !summary) {
      return NextResponse.json({ error: 'Missing required fields: app, summary' }, { status: 400 });
    }

    // Log API usage
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    await logUsage(clientApp.id, '/api/integrations/app-updates', ipAddress);

    // Find the project if projectId is provided
    let project = null;
    if (projectId) {
      project = await prisma.project.findUnique({
        where: { id: projectId },
      });
    }

    // Create the app update
    const appUpdate = await prisma.appUpdate.create({
      data: {
        app,
        projectId: project?.id || null,
        link,
        summary,
      },
    });

    // Create an activity item for the app update
    await prisma.activityItem.create({
      data: {
        type: 'app_update',
        itemId: appUpdate.id,
        sourceUrl: link,
        contextJson: {
          app,
          summary,
          image,
          clientApp: clientApp.name,
          timestamp: new Date().toISOString(),
        },
      },
    });

    // Create a notification for the admin
    await prisma.notification.create({
      data: {
        type: 'app_update',
        relatedId: appUpdate.id,
        triggeredBy: clientApp.name,
      },
    });

    return NextResponse.json({
      success: true,
      appUpdate,
      message: 'App update created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating app update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    const clientApp = await validateApiKey(apiKey);
    
    if (!clientApp) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Check if the client app has permission to read app updates
    if (!clientApp.permissions.includes('read:app_updates')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const app = searchParams.get('app');
    const offset = (page - 1) * limit;

    const where = app ? { app } : {};

    // Log API usage
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    await logUsage(clientApp.id, '/api/integrations/app-updates', ipAddress);

    const [appUpdates, total] = await Promise.all([
      prisma.appUpdate.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        include: {
          project: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      }),
      prisma.appUpdate.count({ where }),
    ]);

    return NextResponse.json({
      appUpdates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Error fetching app updates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Health check endpoint
export async function HEAD() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}