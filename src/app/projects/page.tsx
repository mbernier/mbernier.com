import { Button } from "@/components/ui/Button";

export default function ProjectsPage() {
  // Sample projects data - in real implementation, this would come from database
  const projects = [
    {
      id: "1",
      title: "AI-Powered Content Processing Pipeline",
      description: "Built an automated content processing system that reduced manual work by 80% for a growing SaaS company. Integrated OpenAI APIs with custom validation and workflow automation.",
      category: "Client Work",
      type: "Technical Consulting",
      technologies: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Webhooks"],
      status: "Completed",
      duration: "3 months",
      impact: "80% reduction in manual work, $50K/year savings",
      featured: true,
      liveUrl: null,
      githubUrl: null // Client work - private
    },
    {
      id: "2", 
      title: "Product Strategy & Roadmap Optimization",
      description: "Led product strategy transformation for a B2B fintech startup. Implemented OKRs, customer feedback loops, and feature prioritization framework that doubled release velocity.",
      category: "Client Work",
      type: "Fractional Product Management",
      technologies: ["Product Strategy", "OKRs", "Customer Research", "Roadmap Planning"],
      status: "Completed",
      duration: "6 months",
      impact: "2x release velocity, 40% increase in customer satisfaction",
      featured: true,
      liveUrl: null,
      githubUrl: null
    },
    {
      id: "3",
      title: "Developer Experience Platform",
      description: "Architected and led development of internal developer platform that streamlined deployment processes and reduced time-to-production by 60% for engineering teams.",
      category: "Client Work", 
      type: "Technical Consulting",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Internal Tools", "Developer Experience"],
      status: "Completed",
      duration: "4 months",
      impact: "60% faster deployments, improved developer satisfaction",
      featured: false,
      liveUrl: null,
      githubUrl: null
    },
    {
      id: "4",
      title: "Customer Onboarding Optimization",
      description: "Redesigned customer onboarding flow for enterprise SaaS product. Implemented progressive disclosure, in-app guidance, and success metrics tracking.",
      category: "Client Work",
      type: "Fractional Product Management", 
      technologies: ["UX Design", "Analytics", "A/B Testing", "Customer Success"],
      status: "Completed",
      duration: "2 months",
      impact: "45% improvement in trial-to-paid conversion",
      featured: false,
      liveUrl: null,
      githubUrl: null
    },
    {
      id: "5",
      title: "API Pricing Strategy Framework",
      description: "Developed comprehensive API pricing strategy and implementation for developer-focused platform. Balanced adoption with revenue through tiered pricing model.",
      category: "Client Work",
      type: "Fractional Product Management",
      technologies: ["Pricing Strategy", "API Design", "Developer Experience", "Revenue Optimization"],
      status: "Completed", 
      duration: "3 months",
      impact: "35% increase in API revenue, improved developer adoption",
      featured: false,
      liveUrl: null,
      githubUrl: null
    },
    {
      id: "6",
      title: "Personal Portfolio Website",
      description: "Complete rebuild of personal website with modern design system, dynamic content management, and conversion optimization. Built with Next.js and Tailwind CSS.",
      category: "Personal",
      type: "Full-Stack Development",
      technologies: ["Next.js", "Tailwind CSS", "Prisma", "Supabase", "TypeScript"],
      status: "In Progress",
      duration: "1 month",
      impact: "Showcases technical expertise and design skills",
      featured: false,
      liveUrl: "https://mbernier.com",
      githubUrl: "https://github.com/mbernier/mbernier.com"
    }
  ];

  const categories = ["All", "Client Work", "Personal"];
  const types = ["All", "Fractional Product Management", "Technical Consulting", "Full-Stack Development"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
              Featured <span className="text-gradient">Work & Projects</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A selection of client work and personal projects showcasing expertise in product management, 
              technical consulting, and full-stack development. Real results for real businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Discuss Your Project
              </Button>
              <Button variant="outline" size="lg">
                View My Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm font-medium text-gray-600 mr-2">Category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === "All" 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm font-medium text-gray-600 mr-2">Type:</span>
              {types.map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    type === "All" 
                      ? "bg-secondary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <article key={project.id} className={`card group transition-all duration-200 hover:scale-[1.02] ${project.featured ? 'ring-2 ring-primary ring-opacity-20' : ''}`}>
                {project.featured && (
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">Featured Project</span>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag-pill">
                      {project.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{project.type}</span> • {project.duration}
                  </p>
                </div>

                <h2 className="text-xl font-semibold text-graphite mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Impact/Results */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-primary">Impact:</span> {project.impact}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded-md">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                      >
                        View Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
                      >
                        GitHub →
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="text-gray-500 text-sm">
                        {project.category === 'Client Work' ? 'Confidential Client Work' : 'Private Repository'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.type === 'Fractional Product Management' && (
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    )}
                    {project.type === 'Technical Consulting' && (
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    )}
                    {project.type === 'Full-Stack Development' && (
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-graphite">
              Project Impact by the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">$2M+</div>
                <p className="text-gray-600">Client Savings Generated</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <p className="text-gray-600">Average Efficiency Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                <p className="text-gray-600">Client Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-graphite">
              Ready to See Similar Results?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Whether you need fractional product management or technical consulting, 
              I bring the same strategic thinking and execution excellence to every project.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Fractional Product Management</h3>
                <p className="text-gray-600 mb-4">
                  Like the product strategy and roadmap optimization projects above, 
                  I help teams build better products faster.
                </p>
                <Button variant="primary" className="w-full">
                  Discuss Product Strategy
                </Button>
              </div>
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Technical Consulting</h3>
                <p className="text-gray-600 mb-4">
                  Like the AI pipeline and developer platform projects above, 
                  I solve complex technical challenges efficiently.
                </p>
                <Button variant="secondary" className="w-full">
                  Discuss Technical Needs
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Each project is unique, but the approach is consistent: understand the problem, build the right solution, measure the impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}