import React from 'react';
import HeroSection from '@/components/HeroSection';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { getFeaturedContent } from '@/lib/db';

export default async function HomePage() {
  // Temporarily disable database call to test if that's causing the issue
  // const { featuredArticles, recentProjects } = await getFeaturedContent();
  const featuredArticles: any[] = [];
  const recentProjects: any[] = [];

  return (
    <Layout>
      <HeroSection />
      {/* The rest of the homepage remains unchanged below */}
      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-graphite-500 mb-6">
              How I Can Help Your Business
            </h2>
            <p className="text-xl text-graphite-600 max-w-2xl mx-auto text-balance">
              Two core service areas designed to accelerate your product development and technical capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Fractional Product Management */}
            <Card variant="elevated" size="lg" className="hover:shadow-xl transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-primary-600 text-2xl md:text-3xl">Fractional Product Management</CardTitle>
                <CardDescription className="text-lg">
                  Strategic product leadership without the full-time commitment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Tag variant="primary">Product Strategy</Tag>
                  <Tag variant="primary">User Research</Tag>
                  <Tag variant="primary">Roadmap Planning</Tag>
                  <Tag variant="primary">Team Leadership</Tag>
                </div>
                <p className="text-graphite-600 text-balance">
                  Get senior product management expertise to guide your product vision, strategy, and execution. Perfect for growing companies that need strategic product leadership.
                </p>
                <Button variant="primary" size="lg" className="w-full" asChild>
                  <a href="/services#fractional-pm">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            {/* Technical Consulting */}
            <Card variant="elevated" size="lg" className="hover:shadow-xl transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-secondary-600 text-2xl md:text-3xl">Technical Consulting</CardTitle>
                <CardDescription className="text-lg">
                  Expert technical guidance for complex development challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Tag variant="secondary">Architecture Review</Tag>
                  <Tag variant="secondary">AI Integration</Tag>
                  <Tag variant="secondary">Developer Tools</Tag>
                  <Tag variant="secondary">Process Optimization</Tag>
                </div>
                <p className="text-graphite-600 text-balance">
                  Solve technical challenges with hands-on consulting. From architecture decisions to AI implementation, get the expertise you need to move forward.
                </p>
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <a href="/services#technical-consulting">Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-graphite-500 mb-3">
                Latest Articles
              </h2>
              <p className="text-graphite-600 text-lg">
                Insights on product management, technical leadership, and industry trends
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <a href="/articles">View All Articles</a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} variant="interactive" className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.categories?.slice(0, 2).map((category: any) => (
                      <Tag key={category} variant="default">{category}</Tag>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-graphite-700 mb-2">
                    <a href={`/articles/${article.slug}`} className="hover:text-primary-500 transition-colors">
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-graphite-600 text-sm text-balance mb-4">
                    {article.excerpt || article.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <time>{new Date(article.createdAt).toLocaleDateString()}</time>
                    {article.readingTime && <span>{article.readingTime} min read</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-graphite-500 mb-3">
                Recent Projects
              </h2>
              <p className="text-graphite-600 text-lg">
                A showcase of recent work and technical achievements
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <a href="/projects">View All Projects</a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Card key={project.id} variant="interactive" className="h-full">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-graphite-700 mb-3">
                    <a href={`/projects/${project.slug}`} className="hover:text-primary-500 transition-colors">
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-graphite-600 text-sm text-balance mb-4">
                    {project.description}
                  </p>
                  {project.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features?.slice(0, 3).map((feature: any, index: any) => (
                        <Tag key={index} variant="default">{feature}</Tag>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <time>{new Date(project.createdAt).toLocaleDateString()}</time>
                    {project.appUpdates.length > 0 && (
                      <span className="text-success-600 font-medium">Recently Updated</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
