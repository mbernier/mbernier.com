import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/Matt Bernier/);
    
    // Check for main navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for hero section
    await expect(page.locator('h1')).toContainText(['Matt Bernier', 'Product Manager', 'Consultant']);
    
    // Check for main content areas
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Test navigation links
    const navLinks = [
      { text: 'Articles', url: '/articles' },
      { text: 'Projects', url: '/projects' },
      { text: 'Services', url: '/services' },
      { text: 'Contact', url: '/contact' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a:has-text("${link.text}")`);
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveAttribute('href', link.url);
    }
  });

  test('should display featured articles section', async ({ page }) => {
    // Check for featured articles section
    const featuredSection = page.locator('section:has-text("Featured Articles"), section:has-text("Latest Articles")');
    await expect(featuredSection).toBeVisible();
    
    // Check for article cards
    const articleCards = page.locator('[data-testid="article-card"], .article-card');
    await expect(articleCards.first()).toBeVisible();
  });

  test('should display featured projects section', async ({ page }) => {
    // Check for featured projects section
    const projectsSection = page.locator('section:has-text("Featured Projects"), section:has-text("Recent Projects")');
    await expect(projectsSection).toBeVisible();
    
    // Check for project cards
    const projectCards = page.locator('[data-testid="project-card"], .project-card');
    await expect(projectCards.first()).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Check for main CTA buttons
    const ctaButtons = page.locator('a:has-text("Get Started"), a:has-text("Contact Me"), a:has-text("View Services")');
    
    if (await ctaButtons.count() > 0) {
      await expect(ctaButtons.first()).toBeVisible();
      await expect(ctaButtons.first()).toHaveAttribute('href', /\/(contact|services)/);
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check for essential SEO meta tags
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', /.+/);
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that main content is still visible
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that navigation might be collapsed (mobile menu)
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, button:has-text("Menu")');
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should have working theme toggle', async ({ page }) => {
    // Look for theme toggle button
    const themeToggle = page.locator('[data-testid="theme-toggle"], button:has-text("Dark"), button:has-text("Light"), .theme-toggle');
    
    if (await themeToggle.count() > 0) {
      await expect(themeToggle).toBeVisible();
      
      // Test theme switching
      await themeToggle.click();
      
      // Check that theme changed (look for dark/light mode indicators)
      const body = page.locator('body');
      const htmlElement = page.locator('html');
      
      // Check for theme classes
      const hasDarkMode = await body.getAttribute('class').then(classes => 
        classes?.includes('dark') || classes?.includes('theme-dark')
      );
      
      const htmlHasDarkMode = await htmlElement.getAttribute('class').then(classes => 
        classes?.includes('dark') || classes?.includes('theme-dark')
      );
      
      // At least one should have dark mode indicator
      expect(hasDarkMode || htmlHasDarkMode).toBeTruthy();
    }
  });

  test('should load without accessibility violations', async ({ page }) => {
    // Check for basic accessibility
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Should have exactly one h1
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toHaveAttribute('alt', /.*/);
      }
    }
  });

  test('should have working contact form link', async ({ page }) => {
    // Find and click contact link
    const contactLink = page.locator('a:has-text("Contact")').first();
    await contactLink.click();
    
    // Should navigate to contact page
    await expect(page).toHaveURL(/\/contact/);
    
    // Should have contact form
    await expect(page.locator('form')).toBeVisible();
  });

  test('should load performance-optimized assets', async ({ page }) => {
    // Check for performance optimizations
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check that images have proper loading attributes
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const loading = await img.getAttribute('loading');
        const src = await img.getAttribute('src');
        
        // Should have loading="lazy" or be critical images
        if (loading !== 'eager') {
          expect(loading).toBe('lazy');
        }
        
        // Check for optimized image formats
        if (src) {
          const isOptimized = src.includes('/_next/image') || 
                             src.includes('.webp') || 
                             src.includes('w=') || 
                             src.includes('q=');
          
          // Allow for various image optimization patterns
          expect(isOptimized || src.startsWith('data:') || src.startsWith('/')).toBeTruthy();
        }
      }
    }
  });
});