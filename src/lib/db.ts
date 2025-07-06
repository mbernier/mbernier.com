import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database utility functions
export async function createContactSubmission(data: {
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  projectType?: string;
  urgency?: string;
  budget?: string;
  timeline?: string;
  message: string;
  hearAbout?: string;
}) {
  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        serviceType: data.serviceType,
        projectType: data.projectType,
        urgency: data.urgency,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        hearAbout: data.hearAbout,
        status: 'new',
        priority: data.urgency === 'immediate' ? 'high' : 'normal',
      },
    });
    return submission;
  } catch (error) {
    console.error('Error creating contact submission:', error);
    throw new Error('Failed to save contact submission');
  }
}

export async function getPublishedArticles(limit?: number) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'published',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        categories: true,
        tags: true,
        publishedAt: true,
        readingTime: true,
        featured: true,
      },
    });
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getPublishedProjects(limit?: number) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'published',
      },
      orderBy: {
        completedAt: 'desc',
      },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        type: true,
        technologies: true,
        status: true,
        duration: true,
        impact: true,
        featured: true,
        liveUrl: true,
        githubUrl: true,
        completedAt: true,
      },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getWorkHistory() {
  try {
    const workHistory = await prisma.workHistory.findMany({
      orderBy: {
        startDate: 'desc',
      },
      select: {
        id: true,
        company: true,
        role: true,
        description: true,
        achievements: true,
        technologies: true,
        startDate: true,
        endDate: true,
        current: true,
        type: true,
      },
    });
    return workHistory;
  } catch (error) {
    console.error('Error fetching work history:', error);
    return [];
  }
}

export async function getTestimonials(limit?: number) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      select: {
        id: true,
        clientName: true,
        clientTitle: true,
        clientCompany: true,
        content: true,
        rating: true,
        featured: true,
      },
    });
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}