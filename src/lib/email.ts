import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/**
 * Send an email using SendGrid
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - Email HTML content
 * @param from - Sender email address (optional, defaults to process.env.SENDGRID_FROM)
 */
async function sendEmail({
  to,
  subject,
  html,
  from,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  await sgMail.send({
    to,
    from: from || process.env.SENDGRID_FROM!,
    subject,
    html,
  });
}

/**
 * Track an email event (stub for now)
 * @param trackingId - The unique tracking ID for the email
 */
async function trackEmail(trackingId: string) {
  // Implement tracking logic if needed (e.g., log to DB, call SendGrid API, etc.)
  return { status: 'tracked', trackingId };
}

export const emailService = {
  sendEmail,
  trackEmail,
};