import { useState, useEffect, useCallback } from 'react';

export const useDarkMode = (): [boolean, () => void] => {
  // Initialize state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false; // SSR fallback
    }
    
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    
    // Default to light mode (not system preference)
    return false;
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const theme = isDarkMode ? 'dark' : 'light';
    
    // Update DOM classes
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Dispatch custom event for cross-tab synchronization
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { theme, isDarkMode } 
    }));
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no explicit theme is set in localStorage
      const saved = localStorage.getItem('theme');
      if (!saved) {
        // Even with no saved preference, default to light mode
        // (don't automatically follow system preference)
        // Users can manually toggle if they want dark mode
        return;
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Listen for theme changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setIsDarkMode(e.newValue === 'dark');
      }
    };

    const handleThemeChange = (e: CustomEvent) => {
      setIsDarkMode(e.detail.isDarkMode);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  // Toggle function
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return [isDarkMode, toggleDarkMode];
}; 