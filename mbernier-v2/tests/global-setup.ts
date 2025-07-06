import { FullConfig } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

async function globalSetup(config: FullConfig) {
  console.log('🎭 Setting up test environment...');

  // Initialize database connection
  const prisma = new PrismaClient();

  try {
    // Ensure database is connected
    await prisma.$connect();
    console.log('✅ Database connected');

    // Create test data if needed (real data, not mocks)
    await seedTestData(prisma);
    console.log('✅ Test data seeded');

    // Verify required environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY',
      'OPENAI_API_KEY',
      'SENDGRID_API_KEY',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
    }

    console.log('✅ Global setup complete');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function seedTestData(prisma: PrismaClient) {
  // Create test articles (real data, not mocks)
  const existingArticles = await prisma.article.count();
  
  if (existingArticles === 0) {
    console.log('Creating test articles...');
    
    await prisma.article.createMany({
      data: [
        {
          slug: 'test-article-1',
          title: 'Test Article 1 - Product Management',
          excerpt: 'A comprehensive guide to product management best practices.',
          content: '# Product Management Best Practices\n\nThis article covers essential product management strategies...',
          status: 'published',
          categories: ['product-management', 'strategy'],
          tags: ['testing', 'pm', 'strategy'],
          featured: true,
          readingTime: 5,
          wordCount: 1200,
        },
        {
          slug: 'test-article-2',
          title: 'Test Article 2 - Technical Leadership',
          excerpt: 'Leadership principles for technical teams.',
          content: '# Technical Leadership\n\nBuilding effective technical teams requires...',
          status: 'published',
          categories: ['leadership', 'technical'],
          tags: ['testing', 'leadership', 'teams'],
          featured: false,
          readingTime: 8,
          wordCount: 2000,
        },
        {
          slug: 'draft-article',
          title: 'Draft Article - Not Published',
          excerpt: 'This article is in draft status.',
          content: '# Draft Content\n\nThis is draft content for testing.',
          status: 'draft',
          categories: ['testing'],
          tags: ['draft', 'testing'],
          featured: false,
          readingTime: 3,
          wordCount: 500,
        },
      ],
    });
    
    console.log('✅ Test articles created');
  }

  // Create test projects
  const existingProjects = await prisma.project.count();
  
  if (existingProjects === 0) {
    console.log('Creating test projects...');
    
    await prisma.project.createMany({
      data: [
        {
          slug: 'test-project-1',
          title: 'E-commerce Platform',
          description: 'A comprehensive e-commerce solution built with Next.js and Stripe.',
          features: ['Payment processing', 'Inventory management', 'Customer portal'],
          url: 'https://example-ecommerce.com',
          showOnOffersPage: true,
        },
        {
          slug: 'test-project-2',
          title: 'Analytics Dashboard',
          description: 'Real-time analytics dashboard for business intelligence.',
          features: ['Real-time data', 'Custom reports', 'API integration'],
          url: 'https://example-analytics.com',
          showOnOffersPage: false,
        },
      ],
    });
    
    console.log('✅ Test projects created');
  }

  // Create test contact submissions
  const existingContacts = await prisma.contactSubmission.count();
  
  if (existingContacts === 0) {
    console.log('Creating test contact submissions...');
    
    await prisma.contactSubmission.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Project Inquiry',
          message: 'I would like to discuss a potential project.',
          company: 'Example Corp',
          budget: '$10,000 - $25,000',
          timeline: '2-3 months',
          serviceType: 'Product Strategy',
          isRead: false,
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          subject: 'Consultation Request',
          message: 'Need help with product roadmap planning.',
          company: 'Tech Startup',
          budget: '$5,000 - $10,000',
          timeline: '1 month',
          serviceType: 'Technical Consulting',
          isRead: true,
        },
      ],
    });
    
    console.log('✅ Test contact submissions created');
  }

  // Create test client apps
  const existingApps = await prisma.clientApp.count();
  
  if (existingApps === 0) {
    console.log('Creating test client apps...');
    
    await prisma.clientApp.createMany({
      data: [
        {
          name: 'Test App 1',
          apiKey: 'test-api-key-1',
          permissions: ['read', 'write'],
          purposes: ['testing', 'development'],
        },
        {
          name: 'Test App 2',
          apiKey: 'test-api-key-2',
          permissions: ['read'],
          purposes: ['integration', 'monitoring'],
        },
      ],
    });
    
    console.log('✅ Test client apps created');
  }

  // Create test notifications
  const existingNotifications = await prisma.notification.count();
  
  if (existingNotifications === 0) {
    console.log('Creating test notifications...');
    
    await prisma.notification.createMany({
      data: [
        {
          type: 'contact_form',
          triggeredBy: 'john@example.com',
          isRead: false,
        },
        {
          type: 'app_update',
          triggeredBy: 'system',
          isRead: true,
        },
      ],
    });
    
    console.log('✅ Test notifications created');
  }
}

export default globalSetup;