import React from 'react';
import HeroSection from '@/components/HeroSection';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Rocket, Settings, ArrowRight, Clock } from 'lucide-react';
import { getFeaturedContent } from '@/lib/db';

export default async function HomePage() {
  // Temporarily disable database call to test if that's causing the issue
  // const { featuredArticles, recentProjects } = await getFeaturedContent();
  const featuredArticles: any[] = [];
  const recentProjects: any[] = [];

  return (
    <Layout>
      <HeroSection />
      
      {/* Services Preview */}
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

      {/* Featured Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Insights</h2>
              <p className="text-gray-600">Thoughts on product management, technology, and building great things</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/articles">View All Articles <ArrowRight className="h-4 w-4 ml-1" /></a>
            </Button>
          </div>

          {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} variant="interactive" className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category || 'Article'}</Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readingTime || '5 min read'}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                      <a href={`/articles/${article.slug}`}>{article.title}</a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-3 mb-4">
                      {article.excerpt || article.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</span>
                      <a 
                        href={`/articles/${article.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                      >
                        Read more <ArrowRight className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Articles coming soon! In the meantime, check out my services.</p>
              <Button asChild>
                <a href="/services">View Services</a>
              </Button>
            </div>
          )}

          {/* Article CTA */}
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Get insights delivered</h3>
            <p className="text-blue-700 mb-4">
              Want practical advice on product management and technical leadership? Follow along for regular insights.
            </p>
            <Button variant="primary" size="sm" asChild>
              <a href="/contact">Subscribe to Updates</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Projects</h2>
              <p className="text-gray-600">A showcase of recent work and technical achievements</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/projects">View All Projects <ArrowRight className="h-4 w-4 ml-1" /></a>
            </Button>
          </div>

          {recentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map((project) => (
                <Card key={project.id} variant="interactive" className="h-full">
                  <CardContent className="pt-6">
                    <CardTitle className="text-lg mb-3">
                      <a href={`/projects/${project.slug}`} className="hover:text-blue-600 transition-colors">
                        {project.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {project.description}
                    </CardDescription>
                    {project.features && project.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.features.slice(0, 3).map((feature: any, index: any) => (
                          <Badge key={index} variant="default">{feature}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</span>
                      <a 
                        href={`/projects/${project.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                      >
                        View project <ArrowRight className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Featured projects coming soon! In the meantime, let's discuss your project.</p>
              <Button asChild>
                <a href="/contact">Start a Project</a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
