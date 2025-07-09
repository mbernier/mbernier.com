import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  try {
    console.log('Test DB API called');
    console.log('Environment variables:', {
      SUPABASE_SESSION_POOLER_URL: !!process.env.SUPABASE_SESSION_POOLER_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    });

    const prisma = new PrismaClient();
    console.log('Prisma client created:', !!prisma);
    console.log('Has articles model:', !!prisma.articles);

    // Try a simple query
    const count = await prisma.articles.count();
    console.log('Article count:', count);

    return NextResponse.json({ 
      success: true, 
      count,
      env: {
        SUPABASE_SESSION_POOLER_URL: !!process.env.SUPABASE_SESSION_POOLER_URL,
        DATABASE_URL: !!process.env.DATABASE_URL,
      }
    });

  } catch (error) {
    console.error('Test DB error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 