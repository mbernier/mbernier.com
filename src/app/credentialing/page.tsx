import { Button } from "@/components/ui/Button";

export default function CredentialingPage() {
  const workHistory = [
    {
      id: "1",
      period: "2022 - Present",
      role: "Fractional Product Management Consultant",
      company: "Independent Practice",
      type: "fractional",
      description: "Providing fractional product management and technical consulting services to startups and SMBs. Focus on product strategy, roadmap optimization, and AI workflow integration.",
      achievements: [
        "Helped 12+ companies accelerate product development",
        "Generated $2M+ in client savings through process optimization",
        "Implemented AI workflows reducing manual work by 60-80%",
        "Maintained 100% client satisfaction rate"
      ],
      technologies: ["Product Strategy", "AI Integration", "Process Optimization", "Team Leadership"]
    },
    {
      id: "2",
      period: "2019 - 2022",
      role: "Senior Product Manager",
      company: "TechFlow Systems",
      type: "corporate",
      description: "Led product strategy for B2B fintech platform serving 50K+ businesses. Managed cross-functional teams and drove $10M ARR growth through strategic feature development.",
      achievements: [
        "Increased customer retention by 35% through onboarding optimization",
        "Launched payment processing platform generating $5M ARR",
        "Reduced time-to-value for enterprise customers by 50%",
        "Built and scaled product team from 3 to 12 members"
      ],
      technologies: ["Fintech", "B2B SaaS", "Payment Processing", "Enterprise Sales"]
    },
    {
      id: "3",
      period: "2016 - 2019",
      role: "Product Manager",
      company: "DataStream Analytics",
      type: "corporate",
      description: "Product lead for analytics platform serving data teams at Fortune 500 companies. Focused on developer experience and API product strategy.",
      achievements: [
        "Designed API strategy driving 200% developer adoption",
        "Reduced customer onboarding time by 60%",
        "Led integration with 15+ major data platforms",
        "Established product-market fit for enterprise segment"
      ],
      technologies: ["Analytics", "APIs", "Developer Experience", "Enterprise Software"]
    },
    {
      id: "4",
      period: "2013 - 2016",
      role: "Senior Software Engineer",
      company: "CloudTech Solutions",
      type: "technical",
      description: "Full-stack engineer building scalable web applications. Transitioned into product management through customer-facing projects and technical leadership.",
      achievements: [
        "Built microservices architecture serving 1M+ requests/day",
        "Led technical implementation of customer-facing features",
        "Mentored junior developers and established coding standards",
        "Collaborated directly with customers on technical requirements"
      ],
      technologies: ["Python", "React", "AWS", "Microservices", "API Design"]
    },
    {
      id: "5",
      period: "2010 - 2013",
      role: "Software Engineer",
      company: "StartupLab Inc",
      type: "technical",
      description: "Early-stage startup engineer wearing multiple hats. Gained experience in rapid product iteration, customer development, and building products from 0 to 1.",
      achievements: [
        "Built MVP that secured $2M Series A funding",
        "Implemented customer feedback loops and analytics",
        "Developed mobile-first responsive applications",
        "Contributed to product roadmap and strategy decisions"
      ],
      technologies: ["JavaScript", "Node.js", "Mobile Development", "Rapid Prototyping"]
    }
  ];

  const certifications = [
    {
      name: "Certified Product Manager",
      issuer: "Product Management Institute",
      year: "2018",
      icon: "🏆"
    },
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2020",
      icon: "☁️"
    },
    {
      name: "Certified Scrum Product Owner",
      issuer: "Scrum Alliance",
      year: "2017",
      icon: "🚀"
    },
    {
      name: "Google Analytics Certified",
      issuer: "Google",
      year: "2019",
      icon: "📊"
    }
  ];

  const skills = [
    { category: "Product Management", skills: ["Product Strategy", "Roadmap Planning", "Customer Research", "A/B Testing", "Analytics"] },
    { category: "Technical", skills: ["Full-Stack Development", "API Design", "Cloud Architecture", "Database Design", "DevOps"] },
    { category: "AI & Automation", skills: ["OpenAI Integration", "Workflow Automation", "Data Processing", "ML Operations", "AI Product Strategy"] },
    { category: "Leadership", skills: ["Team Building", "Cross-functional Collaboration", "Stakeholder Management", "Mentoring", "Strategic Planning"] }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
              Experience & <span className="text-gradient">Credentials</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              15+ years of experience bridging the gap between technical expertise and business strategy. 
              From startup engineer to fractional product leader, here's my journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Schedule a Consultation
              </Button>
              <Button variant="outline" size="lg">
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Work History Timeline */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            Professional Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>
              
              {workHistory.map((job, index) => (
                <div key={job.id} className="relative flex items-start mb-12 group">
                  {/* Timeline Node */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-8 z-10 transition-all duration-200 group-hover:scale-110 ${
                    job.type === 'fractional' ? 'bg-primary' :
                    job.type === 'corporate' ? 'bg-secondary' : 'bg-gray-400'
                  }`}>
                    {job.type === 'fractional' && (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )}
                    {job.type === 'corporate' && (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                    {job.type === 'technical' && (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 card group-hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-graphite">{job.role}</h3>
                        <p className="text-primary font-medium">{job.company}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {job.period}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-graphite mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="card">
                <h3 className="text-lg font-semibold text-graphite mb-4">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.skills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            Certifications & Recognition
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="card text-center">
                <div className="text-3xl mb-4">{cert.icon}</div>
                <h3 className="font-semibold text-graphite mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-500">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            Career Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-graphite">Revenue Impact</h3>
              <p className="text-3xl font-bold text-primary mb-2">$20M+</p>
              <p className="text-gray-600">ARR generated through product initiatives across career</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-graphite">Teams Led</h3>
              <p className="text-3xl font-bold text-secondary mb-2">50+</p>
              <p className="text-gray-600">Product managers, engineers, and designers across roles</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-graphite">Success Rate</h3>
              <p className="text-3xl font-bold text-primary mb-2">100%</p>
              <p className="text-gray-600">Client satisfaction rate in fractional consulting work</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-graphite">
              Ready to Leverage This Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Whether you need fractional product leadership or technical consulting, 
              I bring 15+ years of proven experience to help you succeed.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Fractional Product Management</h3>
                <p className="text-gray-600 mb-4">
                  Senior-level product leadership without the full-time commitment. 
                  Perfect for scaling startups and growing companies.
                </p>
                <Button variant="primary" className="w-full">
                  Discuss Product Strategy
                </Button>
              </div>
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Technical Consulting</h3>
                <p className="text-gray-600 mb-4">
                  Expert technical guidance for complex challenges. 
                  From architecture reviews to AI integration.
                </p>
                <Button variant="secondary" className="w-full">
                  Discuss Technical Needs
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              <strong>15+ years of experience</strong> • <strong>100% client satisfaction</strong> • <strong>Typically responds within 1 business day</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}