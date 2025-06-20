import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '../../interactive/ThemeToggle';

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  isExternal?: boolean;
  onClick?: () => void;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface UnifiedHeaderProps {
  // Site identity
  title: string;
  description?: string;
  logoHref?: string;
  
  // Navigation
  navigationItems: NavigationItem[];
  socialLinks?: SocialLink[];
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Layout variants
  variant?: 'main-site' | 'links-site';
  showSocialLinks?: boolean;
  showDescription?: boolean;
  
  // Styling
  className?: string;
}

export const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  description,
  logoHref = '/',
  navigationItems,
  socialLinks = [],
  isDarkMode,
  toggleDarkMode,
  variant = 'main-site',
  showSocialLinks = true,
  showDescription = false,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    }
    closeMobileMenu();
  };

  const isMainSite = variant === 'main-site';
  const isLinksSite = variant === 'links-site';

  return (
    <header className={`sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isLinksSite ? 'pt-6' : 'h-16'}`}>
          {/* Logo/Title Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {isMainSite ? (
                <a href={logoHref} className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
                  {title}
                </a>
              ) : (
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {title}
                  </h1>
                  {showDescription && description && (
                    <p 
                      className="mt-2 text-lg text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                </div>
              )}
              
              {/* Social Media Icons (Main Site) */}
              {isMainSite && showSocialLinks && socialLinks.length > 0 && (
                <div className="ml-4 flex space-x-2 pl-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted"
                      aria-label={social.label}
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode}
              size="sm"
              className="hidden sm:flex"
            />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex ${isLinksSite ? 'mt-8' : 'ml-6'} ${isMainSite ? 'space-x-8' : ''}`}>
          {isMainSite ? (
            <div className="flex space-x-8">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    item.isActive
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                  {item.isExternal && <ExternalLink className="ml-1 h-3 w-3" />}
                </a>
              ))}
            </div>
          ) : (
            <ul className="flex space-x-8">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className={`inline-flex px-1 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                      item.isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary'
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                    {item.isExternal && <ExternalLink className="ml-1 h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-background shadow-lg border-t border-border">
            {/* Mobile Theme Toggle */}
            <div className="px-3 py-2 flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode}
                size="sm"
              />
            </div>
            
            {/* Mobile Navigation Items */}
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                  item.isActive
                    ? 'border-primary text-primary bg-primary/10'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-muted'
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
                {item.isExternal && <ExternalLink className="ml-2 h-4 w-4" />}
              </a>
            ))}
            
            {/* Mobile Social Links */}
            {showSocialLinks && socialLinks.length > 0 && (
              <div className="px-3 py-4 border-t border-border">
                <div className="text-xs font-medium text-muted-foreground mb-2">Connect</div>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted"
                      aria-label={social.label}
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}; 