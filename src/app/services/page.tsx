import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Rocket, Settings, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

export default async function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-teal-100/50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-teal-200/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Services That Drive{' '}
              <span className="text-blue-600">Real Results</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              Strategic product management and technical consulting designed to accelerate your growth. 
              Get the expertise you need without the full-time commitment.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Two-Lane Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Fractional Product Management */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Rocket className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="primary">Most Popular</Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                  Fractional Product Management
                </h2>
                <p className="text-xl text-gray-600">
                  Strategic product leadership without the full-time commitment
                </p>
              </div>

              {/* Problem */}
              <Card className="border-l-4 border-red-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-xl text-red-600">The Challenge</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You need senior product management expertise but can't justify a full-time hire. 
                    Your product roadmap lacks clarity, feature prioritization is chaotic, and your team 
                    is building without strategic direction.
                  </p>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-xl text-blue-600">The Solution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    Get seasoned product management leadership on a fractional basis. I'll work directly 
                    with your team to establish product strategy, optimize processes, and drive execution.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Product Strategy</Badge>
                    <Badge variant="primary">User Research</Badge>
                    <Badge variant="primary">Roadmap Planning</Badge>
                    <Badge variant="primary">Team Leadership</Badge>
                    <Badge variant="primary">Stakeholder Management</Badge>
                    <Badge variant="primary">Metrics & Analytics</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-l-4 border-green-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-xl text-green-600">The Benefits</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Clear product vision and strategic direction</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Improved feature prioritization and roadmap clarity</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Better cross-functional team collaboration</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Data-driven decision making processes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Faster time-to-market for new features</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                <blockquote className="text-sm text-blue-900 italic">
                  "Matt quickly identified our product bottlenecks and got our team shipping features 3x faster."
                </blockquote>
                <cite className="text-xs text-blue-700 not-italic mt-2 block">
                  — Sarah Chen, CEO at TechFlow
                </cite>
              </div>

              <div className="text-center">
                <Button size="lg" asChild>
                  <Link href="/contact?service=fractional-pm">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Technical Consulting */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Settings className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-6">
                  Technical Consulting
                </h2>
                <p className="text-xl text-gray-600">
                  Expert technical guidance for complex development challenges
                </p>
              </div>

              {/* Problem */}
              <Card className="border-l-4 border-red-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-xl text-red-600">The Challenge</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your team is stuck on technical decisions, architecture choices are causing delays, 
                    and you need expertise in areas like AI integration, developer tooling, or process optimization.
                  </p>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-l-4 border-teal-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-teal-600" />
                    <CardTitle className="text-xl text-teal-600">The Solution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    Get hands-on technical consulting to solve complex challenges. I'll work directly 
                    with your engineering team to architect solutions, implement best practices, and optimize your development process.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Architecture Review</Badge>
                    <Badge variant="secondary">AI Integration</Badge>
                    <Badge variant="secondary">Developer Tools</Badge>
                    <Badge variant="secondary">Process Optimization</Badge>
                    <Badge variant="secondary">Code Review</Badge>
                    <Badge variant="secondary">Technical Strategy</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-l-4 border-green-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-xl text-green-600">The Benefits</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Faster resolution of technical blockers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Improved code quality and architecture</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Enhanced developer productivity and tooling</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Successful AI and modern tech integration</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>Reduced technical debt and maintenance costs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-6">
                <blockquote className="text-sm text-teal-900 italic">
                  "Matt's technical expertise helped us integrate AI seamlessly. What seemed impossible became our advantage."
                </blockquote>
                <cite className="text-xs text-teal-700 not-italic mt-2 block">
                  — David Rodriguez, CTO at DataCorp
                </cite>
              </div>

              <div className="text-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/contact?service=technical-consulting">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you need product leadership or technical expertise, let's discuss how 
              I can help accelerate your goals without the overhead of a full-time hire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}