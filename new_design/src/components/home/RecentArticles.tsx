import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRight, Clock } from 'lucide-react';
import { articles } from '../../lib/data';
import { formatDate } from '../../lib/utils';

export function RecentArticles() {
  const recentArticles = articles.slice(0, 3);

  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
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

        {/* Article CTA */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Get insights delivered</h3>
          <p className="text-blue-700 mb-4">
            Want practical advice on product management and technical leadership? Follow along for regular insights.
          </p>
          <Button variant="primary" size="sm">
            Subscribe to Updates
          </Button>
        </div>
      </div>
    </section>
  );
}