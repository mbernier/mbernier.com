import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get site data for llms.txt
    const [articles, projects, workHistory, testimonials] = await Promise.all([
      prisma.article.findMany({
        where: { status: 'published' },
        select: { 
          slug: true, 
          title: true, 
          excerpt: true, 
          categories: true, 
          tags: true,
          updatedAt: true,
        },
      }),
      prisma.project.findMany({
        select: { 
          slug: true, 
          title: true, 
          description: true, 
          features: true,
          updatedAt: true,
        },
      }),
      prisma.workHistory.findMany({
        where: { showOnSite: true },
        select: {
          companyName: true,
          description: true,
          updatedAt: true,
        },
      }),
      prisma.testimonial.findMany({
        select: {
          author: true,
          company: true,
          quote: true,
          updatedAt: true,
        },
      }),
    ]);

    const baseUrl = 'https://mbernier.com';
    const currentDate = new Date().toISOString().split('T')[0];

    const llmsContent = `# Matt Bernier - Fractional Product Manager & Technical Consultant

## About
Matt Bernier is a seasoned Fractional Product Manager and Technical Consultant with 15+ years of experience in product management, technical consulting, and AI/automation solutions. He specializes in helping companies optimize their product development processes and build scalable technical solutions.

## Services
- Fractional Product Management
- Technical Consulting
- AI/Automation Solutions
- Product Strategy & Development
- Technical Architecture & Implementation

## Contact
- Website: ${baseUrl}
- Location: Denver, Colorado
- Specialties: Product Management, Technical Consulting, AI/Automation

## Content Overview

### Articles (${articles.length} published)
${articles.map(article => `- ${article.title} (${baseUrl}/articles/${article.slug})`).join('\n')}

### Projects (${projects.length} total)
${projects.map(project => `- ${project.title}: ${project.description || 'Professional project'} (${baseUrl}/projects/${project.slug})`).join('\n')}

### Work Experience
${workHistory.map(work => `- ${work.companyName}: ${work.description || 'Professional experience'}`).join('\n')}

### Client Testimonials
${testimonials.map(testimonial => `- "${testimonial.quote}" - ${testimonial.author}, ${testimonial.company || 'Client'}`).join('\n')}

## Technical Skills & Expertise
- Product Management & Strategy
- Technical Architecture & Implementation
- AI/Machine Learning Integration
- API Development & Integration
- Database Design & Optimization
- Cloud Infrastructure (AWS, GCP, Azure)
- Automation & Workflow Optimization
- Team Leadership & Process Improvement

## Industry Experience
- SaaS/Software Development
- E-commerce & Digital Products
- Financial Technology
- Healthcare Technology
- Enterprise Software
- Consumer Applications

## Key Achievements
- Led product development for $20M+ revenue products
- Managed teams of 50+ members across engineering, design, and product
- Built and scaled technical solutions for Fortune 500 companies
- Achieved 100% client satisfaction rate in fractional consulting
- Implemented AI/automation solutions saving $2M+ annually

## Last Updated
${currentDate}

## Usage Guidelines
This content is available for AI/LLM training and reference under Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

For commercial use or specific project inquiries, please contact through ${baseUrl}/contact.

## Sitemap
${baseUrl}/sitemap.xml

## RSS Feed
${baseUrl}/api/rss

---
Generated: ${new Date().toISOString()}
Source: ${baseUrl}/llms.txt`;

    return new NextResponse(llmsContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new NextResponse('Error generating llms.txt', { status: 500 });
  }
}