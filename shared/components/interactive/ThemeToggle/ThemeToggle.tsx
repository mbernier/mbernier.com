import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'icon-only';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
  className = '',
  size = 'md',
  variant = 'button',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 p-1.5',
    md: 'h-10 w-10 p-2',
    lg: 'h-12 w-12 p-2.5',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full
    bg-secondary hover:bg-muted
    border border-border
    text-foreground
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
    hover:shadow-md hover:scale-105
    active:scale-95
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      onClick={toggleDarkMode}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
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
      {variant === 'button' && (
        <span className="sr-only">
          {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        </span>
      )}
    </button>
  );
}; 