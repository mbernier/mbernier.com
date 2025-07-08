import { Article, Project, Service, Resource, WorkExperience } from './types';

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Art of Disagree and Commit is crap without follow up',
    slug: 'disagree-commit-follow-up',
    excerpt: 'Exploring why the popular "disagree and commit" principle fails without proper follow-through and accountability.',
    content: 'Full article content...',
    publishedAt: '2025-05-18',
    readingTime: '5 min read',
    tags: ['leadership', 'product-management', 'team-dynamics'],
    category: 'Product Management',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Building AI Workflows That Actually Work',
    slug: 'ai-workflows-that-work',
    excerpt: 'A practical guide to implementing AI automation in your business processes without the hype.',
    content: 'Full article content...',
    publishedAt: '2025-05-10',
    readingTime: '8 min read',
    tags: ['ai', 'automation', 'workflows'],
    category: 'Technical',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Fractional Leadership: When Part-Time Beats Full-Time',
    slug: 'fractional-leadership-benefits',
    excerpt: 'Why startups and SMBs are increasingly choosing fractional executives over traditional full-time hires.',
    content: 'Full article content...',
    publishedAt: '2025-04-28',
    readingTime: '6 min read',
    tags: ['fractional', 'leadership', 'startups'],
    category: 'Product Management',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Technical Debt: The Silent Product Killer',
    slug: 'technical-debt-product-impact',
    excerpt: 'How technical debt accumulates and why product managers need to care about it as much as engineers.',
    content: 'Full article content...',
    publishedAt: '2025-04-15',
    readingTime: '7 min read',
    tags: ['technical-debt', 'product-strategy', 'engineering'],
    category: 'Technical',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'SaaS Product Turnaround',
    description: 'Led product strategy and team restructure for struggling B2B SaaS, resulting in 300% user growth and Series A funding.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Product Strategy', 'Team Leadership', 'B2B SaaS'],
    type: 'client',
    featured: true
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Platform',
    description: 'Built machine learning pipeline and dashboard for real-time business intelligence, processing 10M+ events daily.',
    tags: ['Machine Learning', 'Python', 'React', 'AWS'],
    type: 'client',
    url: '#',
    featured: true
  },
  {
    id: '3',
    title: 'Mobile App MVP Development',
    description: 'Full-stack development of React Native app with Node.js backend, from concept to App Store launch in 12 weeks.',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React Native', 'Node.js', 'Mobile Development'],
    type: 'client',
    url: '#'
  },
  {
    id: '4',
    title: 'Open Source Workflow Tool',
    description: 'Created and maintain popular workflow automation tool with 2k+ GitHub stars and active community.',
    tags: ['Open Source', 'TypeScript', 'Automation'],
    type: 'personal',
    url: '#',
    repoUrl: 'https://github.com'
  }
];

export const services: Service[] = [
  {
    id: 'fractional-pm',
    name: 'Fractional Product Management',
    title: 'Your On-Demand Product Leader',
    description: 'Get senior product leadership without the full-time commitment. I step in as your part-time CPO to drive strategy, align teams, and accelerate product development.',
    features: [
      'Product strategy & roadmap development',
      'Cross-functional team leadership',
      'OKR/KPI establishment and tracking',
      'User research and market analysis',
      'Go-to-market strategy',
      'Team mentoring and process optimization'
    ],
    benefits: [
      'Top-tier product leadership at a fraction of the cost',
      'Immediate impact without lengthy hiring processes',
      'Flexible engagement that scales with your needs',
      'Knowledge transfer that empowers your team'
    ],
    testimonial: {
      quote: "Matt quickly identified our product bottlenecks and got our team shipping features 3x faster. His fractional approach was perfect for our stage.",
      author: "Sarah Chen",
      title: "CEO",
      company: "TechFlow Startup"
    }
  },
  {
    id: 'technical-consulting',
    name: 'Technical Consulting',
    title: 'Expert Technical Problem Solving',
    description: 'Overcome technical challenges and scale your systems with hands-on expertise in architecture, automation, and AI integration.',
    features: [
      'Architecture review and optimization',
      'AI workflow design and implementation',
      'Automation and process improvement',
      'Technical mentoring and code reviews',
      'Performance optimization and scaling',
      'Technology stack evaluation'
    ],
    benefits: [
      'Solve complex problems without growing headcount',
      'Leverage 15+ years of engineering experience',
      'Get practical solutions, not just recommendations',
      'Accelerate development while reducing technical risk'
    ],
    testimonial: {
      quote: "Matt's technical consulting helped us integrate AI into our workflow seamlessly. What seemed impossible became our competitive advantage.",
      author: "David Rodriguez",
      title: "CTO",
      company: "DataCorp Industries"
    }
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    name: 'Linear',
    description: 'The best project management tool for modern product teams. Clean interface, powerful features.',
    url: 'https://linear.app',
    category: 'Productivity',
    tags: ['project-management', 'planning'],
    featured: true
  },
  {
    id: '2',
    name: 'Vercel',
    description: 'Deploy web applications instantly with the best developer experience and performance.',
    url: 'https://vercel.com',
    category: 'Development',
    tags: ['deployment', 'hosting'],
    featured: true
  },
  {
    id: '3',
    name: 'Figma',
    description: 'Collaborative design tool that bridges the gap between design and development teams.',
    url: 'https://figma.com',
    category: 'Design',
    tags: ['design', 'collaboration']
  },
  {
    id: '4',
    name: 'Supabase',
    description: 'Open source Firebase alternative with PostgreSQL. Perfect for rapid prototyping.',
    url: 'https://supabase.com',
    category: 'Development',
    tags: ['database', 'backend']
  },
  {
    id: '5',
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management. My second brain.',
    url: 'https://notion.so',
    category: 'Productivity',
    tags: ['documentation', 'planning']
  },
  {
    id: '6',
    name: 'Claude',
    description: 'AI assistant that excels at reasoning and coding. My go-to for technical discussions.',
    url: 'https://claude.ai',
    category: 'AI Tools',
    tags: ['ai', 'productivity']
  }
];

export const workExperience: WorkExperience[] = [
  {
    id: '1',
    company: 'TechCorp',
    role: 'Senior Product Manager',
    duration: '2020-2023',
    description: 'Led product strategy for enterprise SaaS platform serving 50,000+ users.',
    achievements: [
      'Increased user engagement by 150% through data-driven feature development',
      'Reduced churn by 40% via improved onboarding and user experience',
      'Managed cross-functional team of 12 engineers, designers, and analysts'
    ]
  },
  {
    id: '2',
    company: 'StartupXYZ',
    role: 'Technical Lead',
    duration: '2018-2020',
    description: 'Full-stack development and architecture for fast-growing fintech startup.',
    achievements: [
      'Built scalable architecture handling 1M+ transactions per day',
      'Led team of 6 engineers through rapid growth phase',
      'Implemented CI/CD pipeline reducing deployment time by 80%'
    ]
  },
  {
    id: '3',
    company: 'BigCorp Industries',
    role: 'Software Engineer',
    duration: '2015-2018',
    description: 'Backend development for enterprise applications and API design.',
    achievements: [
      'Designed REST APIs serving 100+ internal applications',
      'Optimized database queries improving performance by 60%',
      'Mentored junior developers and established code review practices'
    ]
  }
];