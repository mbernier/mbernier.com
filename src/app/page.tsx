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
      <section className="hero-gradient py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6 px-4">
          <img
            src="/matt.hat.jpg"
            alt="Matt Bernier"
            className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-graphite-800">
            Fractional Product Management &{' '}
            <span className="text-gradient">Technical Consulting</span>
          </h1>
          <p className="text-lg text-graphite-600">
            Product Management Leader, Developer, writer, and creator. I help companies build better products through strategic product management and technical expertise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a href="/services" className="btn-primary">Explore Services</a>
            <a href="/contact" className="btn-secondary">Get Started</a>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite-500 mb-6">
              How I Can Help Your Business
            </h2>
            <p className="text-xl text-graphite-600 max-w-2xl mx-auto text-balance">
              Two core service areas designed to accelerate your product development and technical capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Fractional Product Management */}
            <div className="card shadow-card hover:shadow-card-hover transition-all duration-300 bg-white rounded-2xl p-8 animate-fade-in">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-primary-600 mb-3">
                  Fractional Product Management
                </h3>
                <p className="text-graphite-600 text-lg mb-4">
                  Strategic product leadership without the full-time commitment
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="tag-pill bg-primary-50 text-primary-600">Product Strategy</span>
                  <span className="tag-pill bg-primary-50 text-primary-600">User Research</span>
                  <span className="tag-pill bg-primary-50 text-primary-600">Roadmap Planning</span>
                  <span className="tag-pill bg-primary-50 text-primary-600">Team Leadership</span>
                </div>
                <p className="text-graphite-600 text-balance">
                  Get senior product management expertise to guide your product vision, strategy, and execution. Perfect for growing companies that need strategic product leadership.
                </p>
                <Link href="/services#fractional-pm" className="btn-outline w-full text-center">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Technical Consulting */}
            <div className="card shadow-card hover:shadow-card-hover transition-all duration-300 bg-white rounded-2xl p-8 animate-fade-in">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-secondary-600 mb-3">
                  Technical Consulting
                </h3>
                <p className="text-graphite-600 text-lg mb-4">
                  Expert technical guidance for complex development challenges
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="tag-pill bg-secondary-50 text-secondary-600">Architecture Review</span>
                  <span className="tag-pill bg-secondary-50 text-secondary-600">AI Integration</span>
                  <span className="tag-pill bg-secondary-50 text-secondary-600">Developer Tools</span>
                  <span className="tag-pill bg-secondary-50 text-secondary-600">Process Optimization</span>
                </div>
                <p className="text-graphite-600 text-balance">
                  Solve technical challenges with hands-on consulting. From architecture decisions to AI implementation, get the expertise you need to move forward.
                </p>
                <Link href="/services#technical-consulting" className="btn-outline w-full text-center">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-gray-50">
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
            <Link href="/articles" className="btn-outline">
              View All Articles
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <div key={article.id} className="card shadow-card hover:shadow-card-hover transition-all duration-300 bg-white rounded-2xl p-6 h-full">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.categories?.slice(0, 2).map((category: any) => (
                      <span key={category} className="tag-pill bg-gray-100 text-gray-700">{category}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-graphite-700 mb-2">
                    <Link href={`/articles/${article.slug}`} className="hover:text-primary-500 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-graphite-600 text-sm text-balance">
                    {article.excerpt || article.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <time>{new Date(article.createdAt).toLocaleDateString()}</time>
                  {article.readingTime && <span>{article.readingTime} min read</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 bg-white">
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
            <Link href="/projects" className="btn-outline">
              View All Projects
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div key={project.id} className="card shadow-card hover:shadow-card-hover transition-all duration-300 bg-white rounded-2xl p-6 h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-graphite-700 mb-3">
                    <Link href={`/projects/${project.slug}`} className="hover:text-primary-500 transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-graphite-600 text-sm text-balance mb-4">
                    {project.description}
                  </p>
                  {project.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features?.slice(0, 3).map((feature: any, index: any) => (
                        <span key={index} className="tag-pill bg-gray-100 text-gray-700">{feature}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <time>{new Date(project.createdAt).toLocaleDateString()}</time>
                  {project.appUpdates.length > 0 && (
                    <span className="text-success-600 font-medium">Recently Updated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto text-balance animate-fade-in">
            Let's discuss how I can help accelerate your product development and technical capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/contact" className="bg-white text-primary-500 hover:bg-gray-50 py-4 px-8 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              Start a Conversation
            </Link>
            <Link href="/services" className="text-white hover:bg-white/10 py-4 px-8 rounded-xl font-semibold transition-all duration-200 border-2 border-white/20 hover:border-white/40">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
