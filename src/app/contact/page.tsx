'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input, Label, Textarea, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Clock, CheckCircle2, Mail } from 'lucide-react';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budget: '',
    timeline: '',
    subject: '',
    message: '',
  });

  // Pre-fill service type from URL params
  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setFormData(prev => ({
        ...prev,
        serviceType: service === 'fractional-pm' ? 'Fractional Product Management' : 
                     service === 'technical-consulting' ? 'Technical Consulting' : 
                     service,
      }));
    }
  }, [searchParams]);

  const serviceTypes = [
    'Fractional Product Management',
    'Technical Consulting',
    'Product Strategy',
    'AI Integration',
    'Developer Experience',
    'Process Optimization',
    'Other',
  ];

  const budgetRanges = [
    'Under $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k - $100k',
    '$100k+',
    'Prefer to discuss',
  ];

  const timelineOptions = [
    'ASAP (Urgent)',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Just exploring',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceType: '',
        budget: '',
        timeline: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUrgent = formData.timeline === 'ASAP (Urgent)';

  if (submitted) {
    return (
      <>
        <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-teal-100/50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your message has been received successfully. I&apos;ll get back to you within 24 hours.
              </p>
              {isUrgent && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 font-medium">
                    I see this is urgent. I&apos;ll prioritize your request and reach out within 4 hours.
                  </p>
                </div>
              )}
              <Button size="lg" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-teal-100/50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-teal-200/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let&apos;s Work <span className="text-blue-600">Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to accelerate your product development or solve complex technical challenges? 
              Let&apos;s start a conversation about how I can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Get in Touch
                    </h2>
                    <p className="text-gray-600 mb-6">
                      I typically respond within 24 hours. For urgent requests, 
                      please mention it in your message.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-lg text-blue-600">
                            Response Times
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Standard</span>
                          <Badge variant="default">24 hours</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Urgent</span>
                          <Badge variant="warning">4 hours</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Emergency</span>
                          <Badge variant="error">1 hour</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-teal-600" />
                          <CardTitle className="text-lg text-teal-600">
                            Direct Contact
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Email</p>
                          <a href="mailto:hello@mbernier.com" className="text-blue-600 hover:text-blue-700">
                            hello@mbernier.com
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">LinkedIn</p>
                          <a href="https://linkedin.com/in/mattbernier" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                            /in/mattbernier
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Prefer a quick call?</strong> Include your preferred time zone and 
                        availability in your message, and I&apos;ll send you a calendar link.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">Send a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and I&apos;ll get back to you shortly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="serviceType">Service Type</Label>
                          <Select
                            id="serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                          >
                            <option value="">Select a service</option>
                            {serviceTypes.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="timeline">Timeline</Label>
                          <Select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                          >
                            <option value="">Select timeline</option>
                            {timelineOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief description of your project"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell me about your project, challenges, and goals..."
                        />
                      </div>

                      {isUrgent && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-yellow-800">
                            <strong>Urgent request detected.</strong> I&apos;ll prioritize this and respond within 4 hours during business hours.
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}