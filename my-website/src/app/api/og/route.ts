import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // For now, redirect to a default image while we set up proper OG image generation
  // You can use services like Vercel OG, Cloudinary, or build a custom solution
  const ogImageUrl = `/matt.hat.jpg`; // Default fallback
  
  // In production, you might want to:
  // 1. Use @vercel/og package
  // 2. Use a service like Bannerbear or Placid
  // 3. Generate images server-side with Canvas or Sharp
  
  return NextResponse.redirect(new URL(ogImageUrl, request.url));
} 