"use client";

import Script from 'next/script';

interface AnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

export function GoogleAnalytics({ GA_MEASUREMENT_ID }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Event tracking utilities
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Conversion tracking for contact form
export const trackContactFormSubmission = (serviceType: string, urgency?: string) => {
  trackEvent('contact_form_submission', 'lead_generation', serviceType);
  
  if (urgency === 'immediate') {
    trackEvent('urgent_contact', 'high_priority_lead', serviceType);
  }
  
  // Track as conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual values
    });
  }
};

// Page view tracking for SPA navigation
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Button click tracking
export const trackButtonClick = (buttonText: string, location: string) => {
  trackEvent('button_click', 'engagement', `${buttonText} - ${location}`);
};

// Service interest tracking
export const trackServiceInterest = (serviceType: string, source: string) => {
  trackEvent('service_interest', 'lead_qualification', `${serviceType} from ${source}`);
};

// Article engagement tracking
export const trackArticleView = (articleTitle: string, category: string) => {
  trackEvent('article_view', 'content_engagement', articleTitle);
};

// Project view tracking
export const trackProjectView = (projectTitle: string, projectType: string) => {
  trackEvent('project_view', 'portfolio_engagement', `${projectTitle} - ${projectType}`);
};

// Newsletter signup tracking
export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', 'lead_generation', source);
};

// Add type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}