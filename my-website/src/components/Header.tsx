'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Navigation, mainSiteNavigation } from '@/components/layout/Navigation';
import { SocialIcons } from '@/components/icons/SocialIcons';
import { ThemeToggle } from '@/components/interactive/ThemeToggle';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <header 
      className="sticky top-0 z-10 bg-background/80 border-b border-border"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            Matt Bernier
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Navigation 
              items={mainSiteNavigation} 
              currentPath={pathname}
              variant="header"
            />
            
            <div className="flex items-center ml-6 space-x-3">
              <SocialIcons size="sm" />
              <ThemeToggle 
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden bg-background/80 border-t border-border"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Navigation 
              items={mainSiteNavigation} 
              currentPath={pathname}
              variant="sidebar"
            />
            
            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <SocialIcons size="sm" />
              <ThemeToggle 
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 