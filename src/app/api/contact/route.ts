import { NextRequest, NextResponse } from 'next/server';
import { createContactSubmission } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create contact submission in database
    const submission = await createContactSubmission({
      name: body.name,
      email: body.email,
      company: body.company || null,
      serviceType: body.serviceType || null,
      budget: body.budget || null,
      timeline: body.timeline || null,
      subject: body.subject || null,
      message: body.message,
    });

    // TODO: Send email notification using SendGrid
    // This would be implemented in a future iteration
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully',
        id: submission.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}