import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Rocket, Settings, ArrowRight } from 'lucide-react';

export function ServicesPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How I Can Help You</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you need strategic product leadership or hands-on technical expertise, 
            I offer flexible services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Fractional Product Management */}
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Rocket className="h-6 w-6 text-blue-600" />
                </div>
                <Badge variant="primary">Most Popular</Badge>
              </div>
              <CardTitle className="text-xl">Fractional Product Management</CardTitle>
              <CardDescription className="text-base">
                Your on-demand product leader without the full-time commitment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Get senior product leadership to drive strategy, align teams, and accelerate development. 
                Perfect for startups and SMBs who need expertise but can't afford a full-time CPO.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Product strategy & roadmap development</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Cross-functional team leadership</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">OKR/KPI establishment and tracking</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <blockquote className="text-sm text-blue-900 italic">
                  "Matt quickly identified our product bottlenecks and got our team shipping features 3x faster."
                </blockquote>
                <cite className="text-xs text-blue-700 not-italic mt-2 block">— Sarah Chen, CEO at TechFlow</cite>
              </div>

              <Button variant="primary" size="sm" asChild>
                <a href="/services#fractional-pm">Learn More <ArrowRight className="h-4 w-4 ml-1" /></a>
              </Button>
            </CardContent>
          </Card>

          {/* Technical Consulting */}
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Settings className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <CardTitle className="text-xl">Technical Consulting</CardTitle>
              <CardDescription className="text-base">
                Expert technical problem solving and architecture guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Overcome technical challenges and scale your systems with hands-on expertise in 
                architecture, automation, and AI integration.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Architecture review and optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">AI workflow design and implementation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Performance optimization and scaling</span>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-6">
                <blockquote className="text-sm text-teal-900 italic">
                  "Matt's technical expertise helped us integrate AI seamlessly. What seemed impossible became our advantage."
                </blockquote>
                <cite className="text-xs text-teal-700 not-italic mt-2 block">— David Rodriguez, CTO at DataCorp</cite>
              </div>

              <Button variant="secondary" size="sm" asChild>
                <a href="/services#technical-consulting">Learn More <ArrowRight className="h-4 w-4 ml-1" /></a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you need product leadership or technical expertise, let's discuss how I can help 
            accelerate your goals without the overhead of a full-time hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Contact Me</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/services">View All Services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}