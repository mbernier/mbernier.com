import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Get featured content for the homepage
 */
export async function getFeaturedContent() {
  const [articles, projects, testimonials] = await Promise.all([
    prisma.article.findMany({
      where: { featured: true, status: 'published' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.testimonial.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
  ]);
  return { articles, projects, testimonials };
}

/**
 * Get testimonials for the services page
 */
export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Create a new contact submission
 */
export async function createContactSubmission(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  serviceType?: string;
}) {
  return await prisma.contactSubmission.create({
    data,
  });
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

