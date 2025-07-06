import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { socialMediaManager } from '@/lib/social-media';
import { prisma } from '@/lib/db';
import { logAdminAction } from '@/lib/admin-actions';

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { platform } = params;
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.json({ error: 'OAuth authorization failed' }, { status: 400 });
    }

    if (!code || !state) {
      // Generate OAuth URL
      const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/social/auth/${platform}`;
      const authUrl = await socialMediaManager.generateOAuthUrl(platform, redirectUri);
      
      return NextResponse.redirect(authUrl);
    }

    // Exchange code for token
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/social/auth/${platform}`;
    const config = await socialMediaManager.exchangeCodeForToken(platform, code, redirectUri);

    // Store configuration in database
    await prisma.socialMediaConfig.upsert({
      where: {
        platform_userId: {
          platform,
          userId,
        },
      },
      create: {
        platform,
        userId,
        accessToken: config.accessToken,
        refreshToken: config.refreshToken,
        expiresAt: config.expiresAt,
        isActive: true,
      },
      update: {
        accessToken: config.accessToken,
        refreshToken: config.refreshToken,
        expiresAt: config.expiresAt,
        isActive: true,
      },
    });

    // Log the action
    await logAdminAction(userId, 'SOCIAL_AUTH', `Connected ${platform} account`);

    // Redirect to admin with success message
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/social-media?success=connected&platform=${platform}`
    );
  } catch (error) {
    console.error('Social media auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { platform } = params;

    // Remove configuration from database
    await prisma.socialMediaConfig.delete({
      where: {
        platform_userId: {
          platform,
          userId,
        },
      },
    });

    // Log the action
    await logAdminAction(userId, 'SOCIAL_AUTH', `Disconnected ${platform} account`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Social media disconnect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}