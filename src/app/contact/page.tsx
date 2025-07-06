'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input, Label, Textarea, Select } from '@/components/ui/Input';
import { Tag } from '@/components/ui/Tag';

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
      <Layout>
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-graphite-500 mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your message has been received successfully. I'll get back to you within 24 hours.
              </p>
              {isUrgent && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 font-medium">
                    I see this is urgent. I'll prioritize your request and reach out within 4 hours.
                  </p>
                </div>
              )}
              <Button asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-graphite-500 mb-6">
              Let's Work <span className="text-gradient">Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to accelerate your product development or solve complex technical challenges? 
              Let's start a conversation about how I can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-graphite-500 mb-4">
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
                        <CardTitle className="text-lg text-[var(--color-primary-600)]">
                          Response Times
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Regular inquiries</span>
                            <span className="font-medium">24 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Urgent requests</span>
                            <span className="font-medium text-orange-600">4 hours</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-secondary-600">
                          What to Include
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Brief description of your challenge</li>
                          <li>• Current team size and structure</li>
                          <li>• Desired timeline</li>
                          <li>• Budget range (if known)</li>
                          <li>• Any specific requirements</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Start a Conversation</CardTitle>
                    <CardDescription>
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-100 border border-red-300 rounded-xl p-4">
                          <p className="text-red-800">{error}</p>
                        </div>
                      )}

                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
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

                      {/* Service Details */}
                      <div className="grid md:grid-cols-2 gap-4">
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
                          <Label htmlFor="budget">Budget Range</Label>
                          <Select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((budget) => (
                              <option key={budget} value={budget}>
                                {budget}
                              </option>
                            ))}
                          </Select>
                        </div>
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
                          {timelineOptions.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </Select>
                        {isUrgent && (
                          <div className="mt-2 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                            <p className="text-yellow-800 text-sm font-medium">
                              Urgent request noted. I'll prioritize your inquiry and respond within 4 hours.
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief summary of your request"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please describe your challenge, goals, and how I can help. Include any relevant details about your current situation."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite-500 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about working together
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do you structure engagements?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    I offer flexible engagement models from short-term projects to ongoing fractional arrangements. 
                    We'll find the structure that best fits your needs and budget.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's your typical response time?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    I respond to all inquiries within 24 hours. For urgent requests, 
                    I aim to respond within 4 hours during business days.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you work with early-stage companies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! I work with companies of all sizes, from startups to enterprises. 
                    My fractional model is particularly well-suited for growing companies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can you help with specific technical challenges?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Absolutely. From architecture decisions to AI integration, 
                    I provide hands-on technical consulting to solve complex challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}