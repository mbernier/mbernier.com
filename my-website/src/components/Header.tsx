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
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary-600 transition-colors">
                Matt Bernier
              </Link>
              
              {/* Social Media Icons */}
              <div className="ml-4">
                <SocialIcons 
                  size="sm"
                  showLabels={false}
                  className="flex space-x-2"
                />
              </div>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Navigation 
              items={mainSiteNavigation}
              variant="header"
              currentPath={pathname}
            />
            <div className="ml-4">
              <ThemeToggle 
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              size="sm"
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg border-t border-border">
            <Navigation 
              items={mainSiteNavigation}
              variant="sidebar"
              currentPath={pathname}
              className="px-2"
            />
          </div>
        </div>
      )}
    </header>
  );
} 