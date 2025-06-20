import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
  size = 'md',
  className = '',
}) => {
  // Track hydration to prevent SSR mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  // Don't render theme-specific content until mounted (hydrated)
  if (!isMounted) {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200 ${sizeClasses[size]} ${className}`}
        aria-label="Toggle theme"
        title="Toggle theme"
        type="button"
        disabled
      >
        <div className={`w-${iconSizes[size] / 4} h-${iconSizes[size] / 4}`} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`inline-flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200 ${sizeClasses[size]} ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {isDarkMode ? (
        <Sun 
          size={iconSizes[size]} 
          className="transition-transform duration-200 rotate-0 scale-100" 
        />
      ) : (
        <Moon 
          size={iconSizes[size]} 
          className="transition-transform duration-200 rotate-0 scale-100" 
        />
      )}
    </button>
  );
}; 