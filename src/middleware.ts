import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isApiRoute = createRouteMatcher(['/api(.*)']);

export default clerkMiddleware(async (auth, request) => {
  // Protect admin routes
  if (isAdminRoute(request)) {
    const { userId, sessionClaims } = await auth();
    
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Check if user has admin role
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (!role || !['admin', 'editor'].includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Protect API routes that need authentication
  if (isApiRoute(request)) {
    const pathname = request.nextUrl.pathname;
    
    // Admin API routes require authentication
    if (pathname.startsWith('/api/admin')) {
      const { userId, sessionClaims } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const role = (sessionClaims?.metadata as { role?: string })?.role;
      if (!role || !['admin', 'editor'].includes(role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};