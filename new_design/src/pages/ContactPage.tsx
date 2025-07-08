import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Mail, MessageCircle, Clock, CheckCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-4">
              Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's Connect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'd love to hear about your project, challenges, or questions. 
            Drop me a note and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Send me a message
                </CardTitle>
                <CardDescription>
                  Tell me about your project and how I might be able to help.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    I'm interested in...
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service (optional)</option>
                    <option value="fractional-pm">Fractional Product Management</option>
                    <option value="technical-consulting">Technical Consulting</option>
                    <option value="both">Both Services</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project, challenges, or questions..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Send Message
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    Schedule a Call
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  * Required fields. I typically respond within 1 business day.
                </p>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="p-6">
              <CardTitle className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-blue-600" />
                Get in Touch
              </CardTitle>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Email</p>
                  <a href="mailto:hello@mbernier.com" className="text-blue-600 hover:text-blue-700">
                    hello@mbernier.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">LinkedIn</p>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    /in/mattbernier
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Twitter</p>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    @mattbernier
                  </a>
                </div>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="p-6">
              <CardTitle className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-green-600" />
                Response Time
              </CardTitle>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email inquiries</span>
                  <Badge variant="success">< 24 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Project proposals</span>
                  <Badge variant="success">1-2 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">General questions</span>
                  <Badge variant="success">Same day</Badge>
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <CardTitle className="mb-4">Quick Answers</CardTitle>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">What's your typical engagement length?</p>
                  <p className="text-sm text-gray-600">Fractional engagements: 3-12 months. Consulting projects: 2-8 weeks.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Do you work with early-stage startups?</p>
                  <p className="text-sm text-gray-600">Absolutely! I love helping early-stage companies build great products.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">What if I'm not sure which service I need?</p>
                  <p className="text-sm text-gray-600">No problem! We'll discuss your challenges and find the best fit.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Prefer to schedule a call?
          </h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Sometimes it's easier to discuss your needs over a quick call. 
            I'm happy to chat about your project and explore how I can help.
          </p>
          <Button variant="primary" size="lg">
            Schedule a 15-minute Call
          </Button>
        </div>
      </div>
    </div>
  )
  );
}