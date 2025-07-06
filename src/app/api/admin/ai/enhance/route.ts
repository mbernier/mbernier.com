import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { enhanceContent } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['admin', 'editor'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, title } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Use OpenAI to enhance the content
    const enhancement = await enhanceContent(content, title);

    return NextResponse.json(enhancement);
  } catch (error) {
    console.error('Error enhancing content:', error);
    return NextResponse.json({ error: 'Failed to enhance content' }, { status: 500 });
  }
}