// Performance monitoring utilities for Web Vitals and metrics

export interface MetricData {
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
  id?: string;
  delta?: number;
}

export const reportWebVitals = (metric: MetricData) => {
  const { name, value, label } = metric;

  // Google Analytics 4 reporting
  if (typeof gtag !== "undefined") {
    gtag("event", name, {
      event_category:
        label === "web-vital" ? "Web Vitals" : "Custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value),
      event_label: label,
      non_interaction: true,
    });
  }

  // Console logging for development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${name}: ${value}ms (${label})`);
  }

  // Send to analytics endpoint if available
  if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
    const body = JSON.stringify({
      name,
      value,
      label,
      url: window.location.href,
      timestamp: Date.now(),
    });

    // Send to analytics endpoint (commented out for now)
    console.log('Performance metric:', body);
    // navigator.sendBeacon('/api/analytics/performance', body);
  }
};

export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals monitoring
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      reportWebVitals({
        name: 'LCP',
        value: lastEntry.startTime,
        label: 'web-vital',
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // Browser doesn't support LCP
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const performanceEntry = entry as PerformanceEventTiming;
        reportWebVitals({
          name: 'FID',
          value: performanceEntry.processingStart - performanceEntry.startTime,
          label: 'web-vital',
        });
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch {
      // Browser doesn't support FID
    }

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const layoutShiftEntry = entry as LayoutShift;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // Browser doesn't support CLS
    }

    // Report CLS when page visibility changes
    const reportCLS = () => {
      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        label: 'web-vital',
      });
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportCLS();
      }
    });

    // Also report on page unload
    window.addEventListener('beforeunload', reportCLS);
  }
};

// Resource loading performance
export const measureResourceLoading = (name: string, startTime: number) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  reportWebVitals({
    name: `resource_${name}`,
    value: duration,
    label: 'custom',
  });
};

// Font loading optimization
export const optimizeFontLoading = () => {
  if (typeof window === 'undefined' || !('fonts' in document)) return;

  const fontPromises: Promise<FontFace>[] = [
    // Add your font loading here
    // new FontFace('Inter', 'url(/fonts/inter.woff2)').load(),
  ];

  Promise.all(fontPromises).then((fonts) => {
    fonts.forEach((font) => {
      document.fonts.add(font);
    });
    document.documentElement.classList.add('fonts-loaded');
  });
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/matt.hat.jpg', // Hero image
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Type declarations
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

declare global {
  function gtag(command: string, targetId: string, config?: Record<string, unknown>): void;
} 