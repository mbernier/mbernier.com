'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Github, Calendar, Zap } from 'lucide-react';
import { generateFallbackImage } from '@/lib/utils';

interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string;
  features: string[];
  image?: string;
  url?: string;
  projectType: 'Client' | 'Personal';
  tech: string[];
  createdAt: string;
  showOnOffersPage: boolean;
  recentlyUpdated?: boolean;
}

const PROJECTS_PER_PAGE = 9;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<'All' | 'Client' | 'Personal'>('All');
  const [loading, setLoading] = useState(true);

  // Mock data for now - replace with actual API call
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        slug: 'ai-image-recognition',
        title: 'AI Image Recognition Pipeline',
        description: 'Built a comprehensive AI-powered image recognition system for automated content tagging and categorization.',
        features: ['Computer Vision', 'Machine Learning', 'API Integration', 'Real-time Processing'],
        image: '/images/ai_images.jpg',
        url: 'https://example.com/ai-project',
        projectType: 'Client',
        tech: ['Python', 'TensorFlow', 'AWS', 'Docker'],
        createdAt: '2024-01-15T10:00:00Z',
        showOnOffersPage: true,
        recentlyUpdated: true,
      },
      {
        id: '2',
        slug: 'product-management-dashboard',
        title: 'Product Management Dashboard',
        description: 'A comprehensive dashboard for tracking product metrics, user feedback, and roadmap planning.',
        features: ['Analytics', 'Data Visualization', 'User Management', 'Reporting'],
        image: '/images/pm_dashboard.png',
        projectType: 'Personal',
        tech: ['React', 'TypeScript', 'Chart.js', 'Node.js'],
        createdAt: '2024-01-10T14:30:00Z',
        showOnOffersPage: false,
        recentlyUpdated: false,
      },
      {
        id: '3',
        slug: 'event-management-tool',
        title: 'Event Management Platform',
        description: 'Full-featured event management system with registration, payment processing, and attendee tracking.',
        features: ['Event Planning', 'Payment Processing', 'Attendee Management', 'Analytics'],
        image: '/images/event_management.jpg',
        projectType: 'Client',
        tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
        createdAt: '2024-01-05T09:15:00Z',
        showOnOffersPage: true,
        recentlyUpdated: true,
      },
      {
        id: '4',
        slug: 'developer-tools-cli',
        title: 'Developer Productivity CLI',
        description: 'Command-line tool to streamline common development workflows and automate repetitive tasks.',
        features: ['CLI Interface', 'Workflow Automation', 'Git Integration', 'Template Generation'],
        // No image - will use fallback
        projectType: 'Personal',
        tech: ['Go', 'CLI', 'Git', 'Shell Scripting'],
        createdAt: '2023-12-20T16:45:00Z',
        showOnOffersPage: false,
        recentlyUpdated: false,
      },
      {
        id: '5',
        slug: 'api-pricing-calculator',
        title: 'API Pricing Calculator',
        description: 'Interactive tool to help developers understand and calculate API pricing across different usage tiers.',
        features: ['Pricing Models', 'Usage Calculation', 'Comparison Tool', 'Export Features'],
        image: '/images/api-pricing-experience.png',
        url: 'https://example.com/pricing-calculator',
        projectType: 'Personal',
        tech: ['React', 'TypeScript', 'Recharts', 'Vercel'],
        createdAt: '2023-12-15T11:20:00Z',
        showOnOffersPage: true,
        recentlyUpdated: false,
      },
      {
        id: '6',
        slug: 'vehicle-identification-system',
        title: 'Vehicle Identification System',
        description: 'Computer vision system for automatic vehicle identification and tracking in parking facilities.',
        features: ['Computer Vision', 'License Plate Recognition', 'Real-time Tracking', 'Database Integration'],
        image: '/images/vehicle_id.jpg',
        projectType: 'Client',
        tech: ['Python', 'OpenCV', 'PostgreSQL', 'Redis'],
        createdAt: '2023-11-30T13:10:00Z',
        showOnOffersPage: true,
        recentlyUpdated: false,
      },
    ];

    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
    setLoading(false);
  }, []);

  // Filter projects based on type
  useEffect(() => {
    let filtered = projects;

    if (selectedType !== 'All') {
      filtered = filtered.filter(project => project.projectType === selectedType);
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [selectedType, projects]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const getProjectImage = (project: Project) => {
    if (project.image) {
      return project.image;
    }
    // Use fallback from utils
    return generateFallbackImage(project.title);
  };

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
            <p className="mt-4 text-gray-600">Loading projects...</p>
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
              Projects & <span className="text-blue-600">Work</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A showcase of recent projects and technical achievements. From client work to personal experiments, 
              these projects demonstrate expertise across product management and technical domains.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
              <div className="text-gray-600">
                {filteredProjects.length === projects.length
                  ? `Showing all ${projects.length} projects`
                  : `Showing ${filteredProjects.length} of ${projects.length} projects`}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['All', 'Client', 'Personal'] as const).map((type) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? 'primary' : 'outline'}
                  className="cursor-pointer hover:bg-blue-100 transition-colors px-4 py-2"
                  onClick={() => setSelectedType(type)}
                >
                  {type} {type === 'All' ? `(${projects.length})` : `(${projects.filter(p => p.projectType === type).length})`}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filter criteria
                </p>
                <Button variant="outline" onClick={() => setSelectedType('All')}>
                  Show all projects
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant={project.projectType === 'Client' ? 'primary' : 'secondary'}>
                        {project.projectType}
                      </Badge>
                    </div>
                    
                    {/* Recently Updated Badge */}
                    {project.recentlyUpdated && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="accent" className="bg-green-100 text-green-800">
                          Updated
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {project.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="default" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge variant="default" className="text-xs">
                            +{project.tech.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(project.createdAt)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {project.url && (
                        <Button variant="default" size="sm" asChild className="flex-1">
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            View Live
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/projects/${project.slug}`} className="flex items-center gap-1">
                          Details
                        </Link>
                      </Button>
                    </div>
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you need product management leadership or technical consulting, 
              let's discuss how I can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}