import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ExternalLink, Filter, Star } from 'lucide-react';
import { resources } from '../lib/data';

export function LinksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(resources.map(r => r.category))];
  
  const filteredResources = resources.filter(resource => 
    selectedCategory === 'All' || resource.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tools & Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Curated tools and resources I actually use and recommend. 
            From productivity apps to development tools – things that make work better.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4" />
            <span>Some links may be affiliate links – I only recommend what I genuinely find useful</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map((resource) => (
            <Card key={resource.id} variant="interactive" className="h-full group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {resource.logo ? (
                      <img src={resource.logo} alt={resource.name} className="w-8 h-8" />
                    ) : (
                      resource.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{resource.category}</Badge>
                    {resource.featured && <Badge variant="accent">Featured</Badge>}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {resource.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-3 text-base">
                  {resource.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                  asChild
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit {resource.name}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">Try selecting a different category.</p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory('All')}
            >
              Show All Resources
            </Button>
          </div>
        )}

        {/* Featured Resources */}
        {selectedCategory === 'All' && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Most Recommended</h2>
              <p className="text-gray-600">The tools I use every single day</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.filter(r => r.featured).map((resource) => (
                <Card key={resource.id} variant="elevated" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {resource.logo ? (
                        <img src={resource.logo} alt={resource.name} className="w-10 h-10" />
                      ) : (
                        resource.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{resource.name}</h3>
                        <Badge variant="accent">⭐ Featured</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <Button size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Check it out
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-orange-900 mb-4">
            Have a tool recommendation?
          </h3>
          <p className="text-orange-700 mb-6 max-w-2xl mx-auto">
            I'm always looking for better tools and workflows. If you've found something amazing 
            that you think I should know about, drop me a line!
          </p>
          <Button variant="accent" size="lg" asChild>
            <a href="/contact">Share a Recommendation</a>
          </Button>
        </div>
      </div>
    </div>
  );
}