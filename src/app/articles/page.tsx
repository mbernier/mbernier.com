'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Input } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/lib/utils';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  categories: string[];
  tags: string[];
  readingTime?: number;
  createdAt: string;
  featured: boolean;
}

const ARTICLES_PER_PAGE = 9;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for now - replace with actual API call
  useEffect(() => {
    const mockArticles: Article[] = [
      {
        id: '1',
        slug: 'developer-experience-is-product-strategy',
        title: 'Developer Experience is Product Strategy',
        excerpt: 'How prioritizing developer experience can drive product success and business growth.',
        description: 'A deep dive into why developer experience should be treated as a core product strategy.',
        categories: ['Product Management', 'Developer Experience'],
        tags: ['Product Strategy', 'DX', 'Developer Tools'],
        readingTime: 8,
        createdAt: '2024-01-15T10:00:00Z',
        featured: true,
      },
      {
        id: '2',
        slug: 'api-pricing-is-developer-experience',
        title: 'API Pricing is Developer Experience',
        excerpt: 'Why your API pricing model is a crucial part of the developer experience.',
        description: 'Exploring the relationship between pricing strategy and developer adoption.',
        categories: ['Developer Experience', 'Pricing'],
        tags: ['API Design', 'Pricing Strategy', 'DX'],
        readingTime: 6,
        createdAt: '2024-01-10T14:30:00Z',
        featured: false,
      },
      {
        id: '3',
        slug: 'fractional-product-management-guide',
        title: 'Getting Started with Fractional Networking',
        excerpt: 'A comprehensive guide to building your fractional product management career.',
        description: 'Everything you need to know about becoming a fractional product manager.',
        categories: ['Product Management', 'Career'],
        tags: ['Fractional', 'Product Management', 'Career Advice'],
        readingTime: 12,
        createdAt: '2024-01-05T09:15:00Z',
        featured: true,
      },
      // Add more mock articles as needed
    ];

    setArticles(mockArticles);
    setFilteredArticles(mockArticles);
    
    // Extract unique tags
    const tags = Array.from(new Set(mockArticles.flatMap(article => [...article.categories, ...article.tags])));
    setAllTags(tags);
    setLoading(false);
  }, []);

  // Filter articles based on search and tags
  useEffect(() => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag =>
          article.categories.includes(tag) || article.tags.includes(tag)
        )
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedTags, articles]);

  const debouncedSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-20">
          <div className="text-center">Loading articles...</div>
        </div>
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
              Articles & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              In-depth articles on product management, technical leadership, and industry trends. 
              Practical insights from real-world experience.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Search articles..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full"
                size="lg"
              />
            </div>

            {/* Tag Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-graphite-500">Filter by Topic</h3>
                {(selectedTags.length > 0 || searchTerm) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Tag
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 text-gray-600">
              {filteredArticles.length === articles.length
                ? `Showing all ${articles.length} articles`
                : `Showing ${filteredArticles.length} of ${articles.length} articles`}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {currentArticles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-graphite-500 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentArticles.map((article) => (
                  <Card key={article.id} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-wrap gap-1">
                          {article.categories.slice(0, 2).map((category) => (
                            <Tag key={category} size="sm" variant="primary">
                              {category}
                            </Tag>
                          ))}
                        </div>
                        {article.featured && (
                          <Tag size="sm" variant="secondary">
                            Featured
                          </Tag>
                        )}
                      </div>
                      <CardTitle className="text-xl">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="hover:text-[var(--color-primary-500)] transition-colors"
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.excerpt || article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Tags */}
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag) => (
                              <Tag
                                key={tag}
                                size="sm"
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => handleTagToggle(tag)}
                              >
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <time>
                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          {article.readingTime && (
                            <span>{article.readingTime} min read</span>
                          )}
                        </div>

                        {/* Read More */}
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/articles/${article.slug}`}>
                            Read Article
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="justify-center"
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-primary-500)]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want More Insights?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest articles and insights delivered directly to your inbox. No spam, just valuable content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-[var(--color-primary-500)] hover:bg-gray-50" asChild>
              <Link href="/contact">Subscribe to Updates</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/services">Work with Me</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}