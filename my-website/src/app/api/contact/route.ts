import { NextRequest, NextResponse } from 'next/server';
import { SendGridProvider } from '@email-template-manager/core';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

async function sendContactEmail(data: ContactFormData) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY environment variable is not set');
  }

  const emailProvider = new SendGridProvider({
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: 'matt@mx.mbernier.com',
    fromName: 'Matt Bernier'
  });

  // Build the email content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
        ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
      </div>
      
      <div style="background: #fefefe; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #374151;">Message</h3>
        <div style="white-space: pre-wrap;">${data.message}</div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-left: 4px solid #2563eb; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px; color: #1e40af;">
          <strong>Reply to this email to respond directly to ${data.name}.</strong>
        </p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p>This message was sent from the contact form on mbernier.com</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Subject: ${data.subject}
${data.company ? `- Company: ${data.company}` : ''}
${data.budget ? `- Budget: ${data.budget}` : ''}
${data.timeline ? `- Timeline: ${data.timeline}` : ''}

Message:
${data.message}

---
Reply to this email to respond directly to ${data.name}.
This message was sent from the contact form on mbernier.com
Timestamp: ${new Date().toLocaleString()}
  `.trim();

  const result = await emailProvider.sendEmail({
    toEmail: 'matt@mx.mbernier.com',
    toName: 'Matt Bernier',
    subject: `Contact Form: ${data.subject}`,
    htmlContent: htmlContent,
    textContent: textContent,
    replyTo: data.email // This is the key part - replies go to the form submitter
  });

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, company, budget, timeline } = body as ContactFormData;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Send the email
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message,
      company,
      budget,
      timeline
    });

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully' 
        },
        { status: 200 }
      );
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Contact form API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process contact form submission'
      },
      { status: 500 }
    );
  }
} 