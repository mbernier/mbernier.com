import { test, expect } from '@playwright/test';

test.describe('Contact API', () => {
  test('should accept valid contact form submissions', async ({ request }) => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message from the API test suite.',
      company: 'Test Company',
      budget: '$5,000 - $10,000',
      timeline: '1-2 months',
      serviceType: 'Technical Consulting',
    };

    const response = await request.post('/api/contact', {
      data: contactData,
    });

    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.message).toBeDefined();
  });

  test('should handle missing required fields', async ({ request }) => {
    const incompleteData = {
      name: 'Test User',
      // Missing email
      message: 'This is a test message.',
    };

    const response = await request.post('/api/contact', {
      data: incompleteData,
    });

    // Should still accept the request but may return validation errors
    expect(response.status()).toBeLessThan(500);
  });

  test('should handle invalid email format', async ({ request }) => {
    const invalidEmailData = {
      name: 'Test User',
      email: 'invalid-email',
      message: 'This is a test message.',
    };

    const response = await request.post('/api/contact', {
      data: invalidEmailData,
    });

    // Should handle gracefully
    expect(response.status()).toBeLessThan(500);
  });

  test('should reject empty submissions', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {},
    });

    expect(response.status()).toBe(400);
    
    const responseData = await response.json();
    expect(responseData.error).toBeDefined();
  });

  test('should reject requests with no data', async ({ request }) => {
    const response = await request.post('/api/contact');

    expect(response.status()).toBe(400);
  });

  test('should handle large message content', async ({ request }) => {
    const largeMessage = 'A'.repeat(10000); // 10KB message
    
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Large Message Test',
      message: largeMessage,
    };

    const response = await request.post('/api/contact', {
      data: contactData,
    });

    // Should handle large messages gracefully
    expect(response.status()).toBeLessThan(500);
  });

  test('should handle special characters in input', async ({ request }) => {
    const specialCharData = {
      name: 'Test User with éàü',
      email: 'test+special@example.com',
      subject: 'Subject with <script>alert("xss")</script>',
      message: 'Message with special chars: émojis 🚀, HTML <b>tags</b>, and symbols ©®™',
      company: 'Company & Associates',
    };

    const response = await request.post('/api/contact', {
      data: specialCharData,
    });

    expect(response.status()).toBeLessThan(500);
    
    if (response.status() === 200) {
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
    }
  });

  test('should handle SQL injection attempts', async ({ request }) => {
    const sqlInjectionData = {
      name: "'; DROP TABLE contacts; --",
      email: 'test@example.com',
      message: "1' OR '1'='1",
    };

    const response = await request.post('/api/contact', {
      data: sqlInjectionData,
    });

    // Should handle without breaking
    expect(response.status()).toBeLessThan(500);
  });

  test('should have proper CORS headers', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      },
    });

    // Check for CORS headers
    const corsHeaders = response.headers();
    expect(corsHeaders['access-control-allow-origin']).toBeDefined();
  });

  test('should handle rate limiting gracefully', async ({ request }) => {
    // Send multiple requests quickly
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        request.post('/api/contact', {
          data: {
            name: `Test User ${i}`,
            email: `test${i}@example.com`,
            message: `Test message ${i}`,
          },
        })
      );
    }

    const responses = await Promise.all(requests);
    
    // Most should succeed, but some might be rate limited
    const successCount = responses.filter(r => r.status() === 200).length;
    const rateLimitedCount = responses.filter(r => r.status() === 429).length;
    
    expect(successCount + rateLimitedCount).toBe(10);
  });

  test('should accept all valid service types', async ({ request }) => {
    const serviceTypes = [
      'Product Strategy',
      'Technical Consulting',
      'Team Leadership',
      'Process Optimization',
      'Other',
    ];

    for (const serviceType of serviceTypes) {
      const response = await request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
          serviceType,
        },
      });

      expect(response.status()).toBeLessThan(500);
    }
  });

  test('should accept all valid budget ranges', async ({ request }) => {
    const budgetRanges = [
      'Under $5,000',
      '$5,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000 - $50,000',
      '$50,000+',
      'Not sure',
    ];

    for (const budget of budgetRanges) {
      const response = await request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
          budget,
        },
      });

      expect(response.status()).toBeLessThan(500);
    }
  });

  test('should accept all valid timeline options', async ({ request }) => {
    const timelines = [
      'Immediately',
      '1 month',
      '1-2 months',
      '2-3 months',
      '3-6 months',
      '6+ months',
      'Not sure',
    ];

    for (const timeline of timelines) {
      const response = await request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
          timeline,
        },
      });

      expect(response.status()).toBeLessThan(500);
    }
  });
});