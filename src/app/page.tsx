import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Image
                src="/matt.hat.jpg"
                alt="Matt Bernier"
                width={120}
                height={120}
                className="mx-auto rounded-full"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-graphite-500 mb-6">
              Fractional Product Management &{' '}
              <span className="text-gradient">Technical Consulting</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Product Management Leader, Developer, writer, and creator. I help companies build better products through strategic product management and technical expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite-500 mb-4">
              How I Can Help Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Two core service areas designed to accelerate your product development and technical capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Fractional Product Management */}
            <Card variant="gradient" size="lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[var(--color-primary-600)]">
                  Fractional Product Management
                </CardTitle>
                <CardDescription className="text-base">
                  Strategic product leadership without the full-time commitment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="primary" size="sm">Product Strategy</Tag>
                    <Tag variant="primary" size="sm">User Research</Tag>
                    <Tag variant="primary" size="sm">Roadmap Planning</Tag>
                    <Tag variant="primary" size="sm">Team Leadership</Tag>
                  </div>
                  <p className="text-gray-600">
                    Get senior product management expertise to guide your product vision, strategy, and execution. Perfect for growing companies that need strategic product leadership.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/services#fractional-pm">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Technical Consulting */}
            <Card variant="gradient" size="lg">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary-600">
                  Technical Consulting
                </CardTitle>
                <CardDescription className="text-base">
                  Expert technical guidance for complex development challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="secondary" size="sm">Architecture Review</Tag>
                    <Tag variant="secondary" size="sm">AI Integration</Tag>
                    <Tag variant="secondary" size="sm">Developer Tools</Tag>
                    <Tag variant="secondary" size="sm">Process Optimization</Tag>
                  </div>
                  <p className="text-gray-600">
                    Solve technical challenges with hands-on consulting. From architecture decisions to AI implementation, get the expertise you need to move forward.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/services#technical-consulting">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-graphite-500 mb-2">
                Latest Articles
              </h2>
              <p className="text-gray-600">
                Insights on product management, technical leadership, and industry trends
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/articles">View All Articles</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="h-full">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.categories?.slice(0, 2).map((category: any) => (
                      <Tag key={category} size="sm">{category}</Tag>
                    ))}
                  </div>
                  <CardTitle className="text-lg">
                    <Link href={`/articles/${article.slug}`} className="hover:text-[var(--color-primary-500)] transition-colors">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {article.excerpt || article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
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
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-graphite-500 mb-2">
                Recent Projects
              </h2>
              <p className="text-gray-600">
                A showcase of recent work and technical achievements
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Card key={project.id} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href={`/projects/${project.slug}`} className="hover:text-[var(--color-primary-500)] transition-colors">
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.features?.slice(0, 3).map((feature: any, index: any) => (
                          <Tag key={index} variant="outline" size="sm">{feature}</Tag>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time>{new Date(project.createdAt).toLocaleDateString()}</time>
                      {project.appUpdates.length > 0 && (
                        <span className="text-green-600">Recently Updated</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help accelerate your product development and technical capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-[var(--color-primary-500)] hover:bg-gray-50" asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
