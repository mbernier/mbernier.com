import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Contact - Matt Bernier',
  description: 'Get in touch with Matt Bernier for consulting, collaboration, or just to say hello.',
  keywords: ['contact', 'consulting', 'collaboration', 'matt bernier'],
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 flex flex-col items-center justify-start py-12 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Let's Connect
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for consulting, collaboration, or just want to say hello, I'd love to hear from you. Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8 sm:p-10 md:p-12">
          <ContactForm />
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground">matt@mx.mbernier.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Location</h3>
            <p className="text-muted-foreground">Denver, Colorado</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
            <p className="text-muted-foreground">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
} 