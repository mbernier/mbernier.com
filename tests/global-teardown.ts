import { FullConfig } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

async function globalTeardown(config: FullConfig) {
  console.log('🎭 Tearing down test environment...');

  // Initialize database connection
  const prisma = new PrismaClient();

  try {
    // Clean up test data if in CI environment
    if (process.env.CI) {
      console.log('🧹 Cleaning up test data...');
      await cleanupTestData(prisma);
      console.log('✅ Test data cleaned');
    }

    // Ensure database connection is closed
    await prisma.$disconnect();
    console.log('✅ Database disconnected');

    console.log('✅ Global teardown complete');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    throw error;
  }
}

async function cleanupTestData(prisma: PrismaClient) {
  // Only clean up test data that we created
  // Be careful not to delete production data
  
  try {
    // Delete test articles
    await prisma.articles.deleteMany({
      where: {
        slug: {
          startsWith: 'test-',
        },
      },
    });

    // Delete test projects
    await prisma.project.deleteMany({
      where: {
        slug: {
          startsWith: 'test-',
        },
      },
    });

    // Delete test contact submissions
    await prisma.contactSubmission.deleteMany({
      where: {
        email: {
          endsWith: '@example.com',
        },
      },
    });

    // Delete test client apps
    await prisma.clientApp.deleteMany({
      where: {
        apiKey: {
          startsWith: 'test-',
        },
      },
    });

    // Delete test notifications
    await prisma.notification.deleteMany({
      where: {
        triggeredBy: {
          endsWith: '@example.com',
        },
      },
    });

    console.log('✅ Test data cleanup complete');
  } catch (error) {
    console.error('❌ Test data cleanup failed:', error);
    // Don't throw here - teardown should continue
  }
}

export default globalTeardown;