import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '../lib/data';
import { generateFallbackImage } from '../lib/utils';

export function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Client Work', 'Personal', 'Featured'];
  
  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Client Work') return project.type === 'client';
    if (selectedFilter === 'Personal') return project.type === 'personal';
    if (selectedFilter === 'Featured') return project.featured;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of products I've built, teams I've led, and problems I've solved. 
            From early-stage startups to enterprise solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <Card key={project.id} variant="interactive" className="h-full">
              <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
                <img 
                  src={project.image || generateFallbackImage(project.title)} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={project.type === 'client' ? 'primary' : 'outline'}>
                    {project.type === 'client' ? 'Client Work' : 'Personal'}
                  </Badge>
                  {project.featured && (
                    <Badge variant="accent">Featured</Badge>
                  )}
                </div>
                <CardTitle className="text-xl leading-tight">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-6 text-base leading-relaxed">
                  {project.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  {project.url && (
                    <Button variant="primary" size="sm" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Live
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filter criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedFilter('All')}
            >
              Show All Projects
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > 0 && (
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
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Build Something Great?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you need product leadership for your next big idea or technical expertise 
            to overcome challenges, I'm here to help turn your vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Start a Project</a>
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