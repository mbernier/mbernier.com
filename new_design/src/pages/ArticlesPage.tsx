import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowRight, Clock, Search, Filter } from 'lucide-react';
import { articles } from '../lib/data';
import { formatDate } from '../lib/utils';

export function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...new Set(articles.map(a => a.category))];
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Articles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thoughts, ideas, and insights on product management, technology, and building great things. 
            Real-world lessons from the trenches of product development.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article) => (
            <Card key={article.id} variant="interactive" className="h-full">
              {article.image && (
                <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readingTime}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                  <a href={`/articles/${article.slug}`}>{article.title}</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3 mb-4">
                  {article.excerpt}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{article.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{formatDate(article.publishedAt)}</span>
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

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-gray-600">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Found something interesting?
          </h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            If you're dealing with similar challenges or want to discuss these topics further, 
            I'd love to hear from you. Let's explore how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Get In Touch</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/services">Explore Services</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}