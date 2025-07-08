export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  category: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  type: 'client' | 'personal';
  url?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    company: string;
  };
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  logo?: string;
  achievements: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  service?: string;
}