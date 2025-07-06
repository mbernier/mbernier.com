import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  projectType?: string;
  urgency?: string;
  budget?: string;
  timeline?: string;
  message: string;
  hearAbout?: string;
  submissionId?: string;
}

// Email templates
const createNotificationEmail = (data: ContactFormData) => {
  const urgencyEmoji = data.urgency === 'immediate' ? '🚨' : data.urgency === 'urgent' ? '⚡' : '📋';
  const priorityLabel = data.urgency === 'immediate' ? 'URGENT' : data.urgency === 'urgent' ? 'High Priority' : 'Standard';
  
  return {
    to: process.env.CONTACT_NOTIFICATION_EMAIL || 'matt@mbernier.com',
    from: process.env.SENDGRID_FROM_EMAIL || 'matt@mbernier.com',
    subject: `${urgencyEmoji} New Contact Form Submission - ${priorityLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #26547C; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          ${data.urgency === 'immediate' ? '<p style="margin: 10px 0 0 0; color: #FF715B; font-weight: bold;">🚨 URGENT REQUEST - IMMEDIATE RESPONSE NEEDED</p>' : ''}
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #26547C; margin-bottom: 15px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Name:</td>
              <td style="padding: 8px 0; color: #212529;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
              <td style="padding: 8px 0; color: #212529;"><a href="mailto:${data.email}" style="color: #26547C;">${data.email}</a></td>
            </tr>
            ${data.company ? `
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Company:</td>
              <td style="padding: 8px 0; color: #212529;">${data.company}</td>
            </tr>
            ` : ''}
          </table>
          
          <h2 style="color: #26547C; margin: 20px 0 15px 0;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Service Type:</td>
              <td style="padding: 8px 0; color: #212529;">${data.serviceType}</td>
            </tr>
            ${data.projectType ? `
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Project Type:</td>
              <td style="padding: 8px 0; color: #212529;">${data.projectType}</td>
            </tr>
            ` : ''}
            ${data.urgency ? `
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Urgency:</td>
              <td style="padding: 8px 0; color: #212529;">${data.urgency} ${urgencyEmoji}</td>
            </tr>
            ` : ''}
            ${data.budget ? `
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Budget:</td>
              <td style="padding: 8px 0; color: #212529;">${data.budget}</td>
            </tr>
            ` : ''}
            ${data.timeline ? `
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Timeline:</td>
              <td style="padding: 8px 0; color: #212529;">${data.timeline}</td>
            </tr>
            ` : ''}
          </table>
          
          <h2 style="color: #26547C; margin: 20px 0 15px 0;">Message</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #FF715B;">
            <p style="margin: 0; color: #212529; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          ${data.hearAbout ? `
          <h2 style="color: #26547C; margin: 20px 0 15px 0;">Additional Information</h2>
          <p style="margin: 0; color: #212529;"><strong>How they heard about you:</strong> ${data.hearAbout}</p>
          ` : ''}
          
          <div style="background: #26547C; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #FF715B;">Quick Actions</h3>
            <p style="margin: 0; font-size: 14px;">
              • <a href="mailto:${data.email}?subject=Re: Your inquiry about ${data.serviceType}" style="color: #FF715B;">Reply directly</a><br>
              • <a href="https://calendly.com/mkbernier/discovery-call" style="color: #FF715B;">Schedule a call</a><br>
              • Submission ID: ${data.submissionId || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission ${data.urgency === 'immediate' ? '(URGENT)' : ''}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || 'N/A'}

Project Details:
- Service Type: ${data.serviceType}
- Project Type: ${data.projectType || 'N/A'}
- Urgency: ${data.urgency || 'N/A'}
- Budget: ${data.budget || 'N/A'}
- Timeline: ${data.timeline || 'N/A'}

Message:
${data.message}

Additional Information:
- How they heard about you: ${data.hearAbout || 'N/A'}
- Submission ID: ${data.submissionId || 'N/A'}

Quick Actions:
- Reply: mailto:${data.email}
- Schedule: https://calendly.com/mkbernier/discovery-call
    `,
  };
};

const createAutoResponseEmail = (data: ContactFormData) => {
  const serviceDetails = {
    'fractional-pm': {
      name: 'Fractional Product Management',
      description: 'Strategic product leadership and roadmap optimization',
      nextSteps: '1. Brief discovery call (30 min)\n2. Product audit and assessment\n3. Tailored proposal with engagement options'
    },
    'technical-consulting': {
      name: 'Technical Consulting',
      description: 'Codebase optimization and AI workflow integration',
      nextSteps: '1. Technical requirements discussion\n2. System architecture review\n3. Implementation roadmap and timeline'
    },
    'both': {
      name: 'Fractional PM + Technical Consulting',
      description: 'Combined product strategy and technical implementation',
      nextSteps: '1. Comprehensive needs assessment\n2. Integrated product and technical roadmap\n3. Flexible engagement proposal'
    },
    'other': {
      name: 'Custom Engagement',
      description: 'Tailored solution based on your specific needs',
      nextSteps: '1. Detailed requirements discovery\n2. Custom solution design\n3. Flexible engagement proposal'
    }
  };

  const service = serviceDetails[data.serviceType as keyof typeof serviceDetails] || serviceDetails.other;
  
  return {
    to: data.email,
    from: process.env.SENDGRID_FROM_EMAIL || 'matt@mbernier.com',
    subject: `Thanks for reaching out about ${service.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #26547C; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out, ${data.name}!</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
          <p style="color: #212529; font-size: 16px; line-height: 1.6;">
            I've received your inquiry about <strong>${service.name}</strong> and will get back to you within 1 business day.
          </p>
          
          ${data.urgency === 'immediate' ? `
          <div style="background: #FF715B; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">⚡ Urgent Request Acknowledged</h3>
            <p style="margin: 0; font-size: 14px;">
              I understand this is urgent. I'll prioritize your request and respond within 4 hours during business hours (9 AM - 6 PM EST).
            </p>
          </div>
          ` : ''}
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FF715B; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #26547C;">About ${service.name}</h3>
            <p style="margin: 0; color: #212529; line-height: 1.6;">${service.description}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #26547C; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #26547C;">What Happens Next</h3>
            <p style="margin: 0; color: #212529; line-height: 1.6; white-space: pre-line;">${service.nextSteps}</p>
          </div>
          
          <div style="background: #26547C; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #FF715B;">While You Wait</h3>
            <p style="margin: 0 0 10px 0; font-size: 14px;">Feel free to explore:</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
              <li style="margin-bottom: 8px;"><a href="https://mbernier.com/projects" style="color: #FF715B;">Recent projects and case studies</a></li>
              <li style="margin-bottom: 8px;"><a href="https://mbernier.com/articles" style="color: #FF715B;">Latest articles and insights</a></li>
              <li style="margin-bottom: 8px;"><a href="https://mbernier.com/credentialing" style="color: #FF715B;">Experience and credentials</a></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              Best regards,<br>
              <strong style="color: #26547C;">Matt Bernier</strong><br>
              <span style="color: #FF715B;">Fractional Product Management & Technical Consulting</span>
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Thanks for reaching out, ${data.name}!

I've received your inquiry about ${service.name} and will get back to you within 1 business day.

${data.urgency === 'immediate' ? 'URGENT REQUEST ACKNOWLEDGED: I understand this is urgent. I\'ll prioritize your request and respond within 4 hours during business hours (9 AM - 6 PM EST).\n\n' : ''}

About ${service.name}:
${service.description}

What Happens Next:
${service.nextSteps}

While You Wait:
- Recent projects: https://mbernier.com/projects
- Latest articles: https://mbernier.com/articles  
- Experience: https://mbernier.com/credentialing

Best regards,
Matt Bernier
Fractional Product Management & Technical Consulting
    `,
  };
};

// Main email sending functions
export async function sendContactNotification(data: ContactFormData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured. Email notification skipped.');
      return false;
    }

    const emailData = createNotificationEmail(data);
    await sgMail.send(emailData);
    
    console.log('Contact notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    return false;
  }
}

export async function sendAutoResponse(data: ContactFormData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured. Auto-response skipped.');
      return false;
    }

    const emailData = createAutoResponseEmail(data);
    await sgMail.send(emailData);
    
    console.log('Auto-response sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send auto-response:', error);
    return false;
  }
}

// Send both notification and auto-response
export async function sendContactEmails(data: ContactFormData): Promise<{ notification: boolean; autoResponse: boolean }> {
  const results = await Promise.allSettled([
    sendContactNotification(data),
    sendAutoResponse(data)
  ]);

  return {
    notification: results[0].status === 'fulfilled' ? results[0].value : false,
    autoResponse: results[1].status === 'fulfilled' ? results[1].value : false,
  };
}