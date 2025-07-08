import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { projects } from '../../lib/data';
import { generateFallbackImage } from '../../lib/utils';

export function FeaturedProjects() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Work</h2>
            <p className="text-gray-600">Recent projects showcasing product leadership and technical expertise</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/projects">View All Projects <ArrowRight className="h-4 w-4 ml-1" /></a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.id} variant="interactive" className="h-full">
              <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
                <img 
                  src={project.image || generateFallbackImage(project.title)} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={project.type === 'client' ? 'primary' : 'outline'}>
                    {project.type === 'client' ? 'Client Work' : 'Personal'}
                  </Badge>
                  {project.featured && (
                    <Badge variant="accent">Featured</Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-3">
                  {project.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {project.url && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button variant="ghost" size="sm" asChild>
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

        {/* Project CTA */}
        <div className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Have a Project in Mind?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you need help bringing an idea to life or optimizing an existing product, 
            I'd love to discuss how I can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Start a Conversation</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/services">Explore Services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}