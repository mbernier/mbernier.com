'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Pagination } from '@/components/ui/Pagination';

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
    // Fallback image based on project type
    return project.projectType === 'Client' 
      ? '/images/default-project.jpg' 
      : '/images/default-project.jpg';
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-20">
          <div className="text-center">Loading projects...</div>
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
              Projects & <span className="text-gradient">Work</span>
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
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-graphite-500">Filter Projects</h3>
              <div className="text-gray-600">
                {filteredProjects.length === projects.length
                  ? `Showing all ${projects.length} projects`
                  : `Showing ${filteredProjects.length} of ${projects.length} projects`}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['All', 'Client', 'Personal'] as const).map((type) => (
                <Tag
                  key={type}
                  variant={selectedType === type ? 'primary' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType(type)}
                >
                  {type} Work
                  {type !== 'All' && (
                    <span className="ml-1 text-xs">
                      ({projects.filter(p => p.projectType === type).length})
                    </span>
                  )}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {currentProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-graphite-500 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filter selection.
              </p>
              <Button variant="outline" onClick={() => setSelectedType('All')}>
                Show All Projects
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentProjects.map((project) => (
                  <Card key={project.id} className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                    {/* Project Image */}
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={getProjectImage(project)}
                        alt={project.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to a solid color background if image fails
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Project Type Badge */}
                      <div className="absolute top-4 left-4">
                        <Tag
                          size="sm"
                          variant={project.projectType === 'Client' ? 'primary' : 'secondary'}
                        >
                          {project.projectType}
                        </Tag>
                      </div>

                      {/* Recently Updated Badge */}
                      {project.recentlyUpdated && (
                        <div className="absolute top-4 right-4">
                          <Tag size="sm" variant="success">
                            Updated
                          </Tag>
                        </div>
                      )}

                      {/* External Link Icon */}
                      {project.url && (
                        <div className="absolute bottom-4 right-4">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                            aria-label="View live project"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15,3 21,3 21,9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-[var(--color-primary-500)] transition-colors"
                        >
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Features */}
                        {project.features.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-graphite-500">Key Features</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.features.slice(0, 4).map((feature, index) => (
                                <Tag key={index} size="sm" variant="outline">
                                  {feature}
                                </Tag>
                              ))}
                                                             {project.features.length > 4 && (
                                 <Tag size="sm" variant="default">
                                   +{project.features.length - 4} more
                                 </Tag>
                               )}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack */}
                        {project.tech.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-graphite-500">Tech Stack</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.slice(0, 3).map((tech, index) => (
                                <Tag key={index} size="sm" variant="secondary">
                                  {tech}
                                </Tag>
                              ))}
                                                             {project.tech.length > 3 && (
                                 <Tag size="sm" variant="default">
                                   +{project.tech.length - 3} more
                                 </Tag>
                               )}
                            </div>
                          </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-200">
                          <time>
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </time>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.slug}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
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
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help bring your product vision to life with strategic planning and technical expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-[var(--color-primary-500)] hover:bg-gray-50" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}