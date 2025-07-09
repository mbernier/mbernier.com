'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formType, setFormType] = useState<'contact' | 'hire'>('contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    budget: '',
    timeline: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          company: '',
          budget: '',
          timeline: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Contact form error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    required = false, 
    placeholder = '',
    error,
    value,
    onChange,
    className = ''
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
  }) => (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        className={`
          w-full px-3 py-2 border rounded-md text-foreground bg-background
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-colors duration-200
          ${error ? 'border-red-500' : 'border-border'}
        `}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );

  const TextAreaField = ({ 
    label, 
    name, 
    required = false, 
    placeholder = '',
    error,
    value,
    onChange,
    rows = 4,
    className = ''
  }: {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    className?: string;
  }) => (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-md text-foreground bg-background
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-colors duration-200 resize-vertical
          ${error ? 'border-red-500' : 'border-border'}
        `}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );

  if (submitStatus === 'success') {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
        <Button 
          onClick={() => setSubmitStatus('idle')}
          variant="outline"
        >
          Send Another Message
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Form Type Toggle */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg bg-muted border border-border overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setFormType('contact')}
            className={`
              px-6 py-2 text-sm font-medium transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
              ${formType === 'contact' 
                ? 'bg-background text-primary border-b-2 border-primary shadow-sm' 
                : 'text-muted-foreground hover:text-primary bg-muted'
              }
            `}
          >
            Contact Matt
          </button>
          <button
            type="button"
            onClick={() => setFormType('hire')}
            className={`
              px-6 py-2 text-sm font-medium transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
              ${formType === 'hire' 
                ? 'bg-background text-primary border-b-2 border-primary shadow-sm' 
                : 'text-muted-foreground hover:text-primary bg-muted'
              }
            `}
          >
            Hire Matt
          </button>
        </div>
      </div>

      {/* Form Description */}
      <div className="text-center mb-6">
        <p className="text-muted-foreground text-base">
          {formType === 'contact' 
            ? 'Have a question or want to chat? Send me a message and I\'ll get back to you.'
            : 'Looking to work together? Tell me about your project and I\'ll respond with next steps.'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success/Error Messages */}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md mb-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Sorry, there was an error sending your message. Please try again or email me directly at matt@mbernier.com
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Required Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            name="name"
            required
            placeholder="Your full name"
            error={errors.name}
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            className="mb-2"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            required
            placeholder="your.email@example.com"
            error={errors.email}
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            className="mb-2"
          />
        </div>

        <InputField
          label="Subject"
          name="subject"
          required
          placeholder={formType === 'contact' ? "What's this about?" : "Project title or brief description"}
          error={errors.subject}
          value={formData.subject}
          onChange={(value) => handleInputChange('subject', value)}
          className="mb-2"
        />

        <TextAreaField
          label="Message"
          name="message"
          required
          placeholder={
            formType === 'contact' 
              ? "Tell me more about your question or how I can help..."
              : "Describe your project, goals, timeline, and any specific requirements..."
          }
          error={errors.message}
          value={formData.message}
          onChange={(value) => handleInputChange('message', value)}
          rows={6}
          className="mb-2"
        />

        {/* Optional Fields - Only show for "Hire Matt" */}
        {formType === 'hire' && (
          <div className="border-t border-border pt-6 mt-4 bg-muted/40 rounded-xl">
            <h3 className="text-lg font-medium text-foreground mb-4">Project Details (Optional)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <InputField
                label="Company"
                name="company"
                placeholder="Your company name"
                value={formData.company || ''}
                onChange={(value) => handleInputChange('company', value)}
                className="mb-2"
              />
              <InputField
                label="Budget Range"
                name="budget"
                placeholder="e.g., $5k-10k, $10k+"
                value={formData.budget || ''}
                onChange={(value) => handleInputChange('budget', value)}
                className="mb-2"
              />
              <InputField
                label="Timeline"
                name="timeline"
                placeholder="e.g., ASAP, 1-2 months"
                value={formData.timeline || ''}
                onChange={(value) => handleInputChange('timeline', value)}
                className="mb-2"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[140px] text-base font-semibold shadow-md"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </div>
            ) : (
              formType === 'contact' ? 'Send Message' : 'Send Project Details'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 