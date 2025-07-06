# Contact Form Setup Guide

## Environment Variables

### Local Development
Create a `.env.local` file in the `my-website` directory with:

```bash
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### Production (Vercel)
Add the following environment variable in your Vercel dashboard:

- **Name:** `SENDGRID_API_KEY`
- **Value:** Your SendGrid API key

## SendGrid Configuration

### Sender Identity
- **From Email:** `matt@mx.mbernier.com`
- **From Name:** `Matt Bernier`
- **Reply-To:** Set dynamically to the form submitter's email

### Domain Authentication
Make sure `mx.mbernier.com` is authenticated in your SendGrid account for proper deliverability.

## How It Works

1. **Form Submission:** User fills out contact form at `/contact`
2. **API Processing:** `/api/contact` validates and processes the submission
3. **Email Sending:** Uses SendGrid to send email to `matt@mx.mbernier.com`
4. **Reply-To:** Email has reply-to set to the form submitter's email
5. **Direct Reply:** You can reply directly to the email and it goes to the person who contacted you

## Form Types

### Contact Matt
- Simple form for general questions
- Fields: Name, Email, Subject, Message

### Hire Matt  
- Extended form for project inquiries
- Fields: Name, Email, Subject, Message + Company, Budget, Timeline

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/contact`
3. Fill out the form and submit
4. Check your email at `matt@mx.mbernier.com`
5. Reply to test the reply-to functionality 