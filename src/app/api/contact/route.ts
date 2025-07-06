import { NextRequest, NextResponse } from 'next/server';
import { createContactSubmission } from '@/lib/db';
import { sendContactEmails } from '@/lib/email';
import { trackContactFormSubmission } from '@/components/Analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, serviceType, message } = body;
    
    if (!name || !email || !serviceType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Save to database
    const submission = await createContactSubmission({
      name: body.name,
      email: body.email,
      company: body.company,
      serviceType: body.serviceType,
      projectType: body.projectType,
      urgency: body.urgency,
      budget: body.budget,
      timeline: body.timeline,
      message: body.message,
      hearAbout: body.hearAbout,
    });
    
    // Send emails (notification and auto-response)
    const emailResults = await sendContactEmails({
      name: body.name,
      email: body.email,
      company: body.company,
      serviceType: body.serviceType,
      projectType: body.projectType,
      urgency: body.urgency,
      budget: body.budget,
      timeline: body.timeline,
      message: body.message,
      hearAbout: body.hearAbout,
      submissionId: submission.id,
    });
    
    // Track the submission for analytics
    if (typeof window !== 'undefined') {
      trackContactFormSubmission(body.serviceType, body.urgency);
    }
    
    // Return success response with email status
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      submissionId: submission.id,
      emailStatus: {
        notificationSent: emailResults.notification,
        autoResponseSent: emailResults.autoResponse,
      },
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return different error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes('database')) {
        return NextResponse.json(
          { error: 'Database error. Please try again later.' },
          { status: 500 }
        );
      }
      if (error.message.includes('email')) {
        return NextResponse.json(
          { error: 'Email service error. Your message was saved but notification may be delayed.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}