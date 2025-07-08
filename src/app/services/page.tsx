import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { getTestimonials } from '@/lib/db';

export default async function ServicesPage() {
  const testimonials = await getTestimonials();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-graphite-500 mb-8 animate-slide-up">
              Services That Drive{' '}
              <span className="text-gradient">Real Results</span>
            </h1>
            <p className="text-xl text-graphite-600 mb-10 max-w-3xl mx-auto text-balance animate-slide-up">
              Strategic product management and technical consulting designed to accelerate your growth. 
              Get the expertise you need without the full-time commitment.
            </p>
            <Button size="lg" className="animate-slide-up" asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Two-Lane Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Fractional Product Management */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-6">
                  Fractional Product Management
                </h2>
                <p className="text-xl text-graphite-600 text-balance">
                  Strategic product leadership without the full-time commitment
                </p>
              </div>

              {/* Problem */}
              <div className="card shadow-card bg-white rounded-2xl p-6 border-l-4 border-error-500">
                <h3 className="text-xl font-semibold text-error-600 mb-4">The Challenge</h3>
                <p className="text-graphite-600 text-balance">
                  You need senior product management expertise but can't justify a full-time hire. 
                  Your product roadmap lacks clarity, feature prioritization is chaotic, and your team 
                  is building without strategic direction.
                </p>
              </div>

              {/* Solution */}
              <div className="card shadow-card bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">The Solution</h3>
                <p className="text-graphite-600 mb-6 text-balance">
                  Get seasoned product management leadership on a fractional basis. I'll work directly 
                  with your team to establish product strategy, optimize processes, and drive execution.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-pill bg-primary-100 text-primary-700">Product Strategy</span>
                  <span className="tag-pill bg-primary-100 text-primary-700">User Research</span>
                  <span className="tag-pill bg-primary-100 text-primary-700">Roadmap Planning</span>
                  <span className="tag-pill bg-primary-100 text-primary-700">Team Leadership</span>
                  <span className="tag-pill bg-primary-100 text-primary-700">Stakeholder Management</span>
                  <span className="tag-pill bg-primary-100 text-primary-700">Metrics & Analytics</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="card shadow-card bg-white rounded-2xl p-6 border-l-4 border-success-500">
                <h3 className="text-xl font-semibold text-success-600 mb-4">The Benefits</h3>
                <ul className="space-y-3 text-graphite-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Clear product vision and strategic direction</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Improved feature prioritization and roadmap clarity</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Better cross-functional team collaboration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Data-driven decision making processes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Faster time-to-market for new features</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button asChild>
                  <Link href="/contact?service=fractional-pm">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Technical Consulting */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-600 mb-6">
                  Technical Consulting
                </h2>
                <p className="text-xl text-graphite-600 text-balance">
                  Expert technical guidance for complex development challenges
                </p>
              </div>

              {/* Problem */}
              <div className="card shadow-card bg-white rounded-2xl p-6 border-l-4 border-error-500">
                <h3 className="text-xl font-semibold text-error-600 mb-4">The Challenge</h3>
                <p className="text-graphite-600 text-balance">
                  Your team is stuck on technical decisions, architecture choices are causing delays, 
                  and you need expertise in areas like AI integration, developer tooling, or process optimization.
                </p>
              </div>

              {/* Solution */}
              <div className="card shadow-card bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border-l-4 border-secondary-500">
                <h3 className="text-xl font-semibold text-secondary-600 mb-4">The Solution</h3>
                <p className="text-graphite-600 mb-6 text-balance">
                  Get hands-on technical consulting to solve complex challenges. I'll work directly 
                  with your engineering team to architect solutions, implement best practices, and optimize your development process.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-pill bg-secondary-100 text-secondary-700">Architecture Review</span>
                  <span className="tag-pill bg-secondary-100 text-secondary-700">AI Integration</span>
                  <span className="tag-pill bg-secondary-100 text-secondary-700">Developer Tools</span>
                  <span className="tag-pill bg-secondary-100 text-secondary-700">Process Optimization</span>
                  <span className="tag-pill bg-secondary-100 text-secondary-700">Code Review</span>
                  <span className="tag-pill bg-secondary-100 text-secondary-700">Technical Strategy</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="card shadow-card bg-white rounded-2xl p-6 border-l-4 border-success-500">
                <h3 className="text-xl font-semibold text-success-600 mb-4">The Benefits</h3>
                <ul className="space-y-3 text-graphite-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Faster resolution of technical blockers</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Improved code quality and architecture</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Enhanced developer productivity and tooling</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Successful AI and modern tech integration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-success-500 mt-1 text-lg">✓</span>
                    <span>Reduced technical debt and maintenance costs</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button variant="secondary" asChild>
                  <Link href="/contact?service=technical-consulting">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite-500 mb-4">
                What Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real feedback from companies that have benefited from our services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial: any) => (
                <Card key={testimonial.id} className="h-full">
                  <CardContent className="pt-6">
                    <blockquote className="text-gray-600 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <footer className="text-sm text-gray-500">
                      <cite className="font-semibold text-graphite-500">
                        {testimonial.author}
                      </cite>
                      {testimonial.company && (
                        <span> • {testimonial.company}</span>
                      )}
                      {testimonial.title && (
                        <span> • {testimonial.title}</span>
                      )}
                    </footer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite-500 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A straightforward process to get you the expertise you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
                              <div className="w-16 h-16 bg-[var(--color-primary-500)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-graphite-500 mb-2">
                Initial Consultation
              </h3>
              <p className="text-gray-600">
                We discuss your challenges, goals, and determine the best approach for your specific needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-graphite-500 mb-2">
                Tailored Engagement
              </h3>
              <p className="text-gray-600">
                We create a customized plan and begin working directly with your team to drive results.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-graphite-500 mb-2">
                Ongoing Success
              </h3>
              <p className="text-gray-600">
                Regular check-ins and adjustments ensure continued progress and measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how fractional product management or technical consulting can help your team achieve more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-[var(--color-primary-500)] hover:bg-gray-50" asChild>
              <Link href="/contact">Schedule a Call</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/articles">Read Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}