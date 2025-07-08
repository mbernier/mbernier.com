'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Search, Clock, User } from 'lucide-react';
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
        title: 'Getting Started with Fractional Product Management',
        excerpt: 'A comprehensive guide to building your fractional product management career.',
        description: 'Everything you need to know about becoming a fractional product manager.',
        categories: ['Product Management', 'Career'],
        tags: ['Fractional', 'Product Management', 'Career Advice'],
        readingTime: 12,
        createdAt: '2024-01-05T09:15:00Z',
        featured: true,
      },
      {
        id: '4',
        slug: 'ai-integration-best-practices',
        title: 'AI Integration Best Practices for Product Teams',
        excerpt: 'Practical approaches to successfully integrate AI capabilities into your product.',
        description: 'A guide to AI integration without the hype.',
        categories: ['Technical Consulting', 'AI'],
        tags: ['AI Integration', 'Product Strategy', 'Technical Leadership'],
        readingTime: 10,
        createdAt: '2024-01-01T12:00:00Z',
        featured: true,
      },
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-teal-100/50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-teal-200/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Articles & <span className="text-blue-600">Insights</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search articles..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full pl-10 text-lg py-3"
              />
            </div>

            {/* Tag Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filter by Topic</h3>
                {(selectedTags.length > 0 || searchTerm) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
                    className="cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-6 text-sm text-gray-600">
              {searchTerm || selectedTags.length > 0 ? (
                <p>
                  Showing {filteredArticles.length} of {articles.length} articles
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedTags.length > 0 && ` tagged with ${selectedTags.join(', ')}`}
                </p>
              ) : (
                <p>Showing all {articles.length} articles</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-xl transition-all duration-200 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-1">
                        {article.categories.slice(0, 2).map((category) => (
                          <Badge key={category} variant="default" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {article.featured && (
                          <Badge variant="primary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                      <Link href={`/articles/${article.slug}`} className="block">
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt || article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readingTime} min read</span>
                      </div>
                      <span>{formatDate(article.createdAt)}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Link 
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-2 transition-all"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Get notified when I publish new articles on product management, technical leadership, and industry insights.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Subscribe to Updates</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}