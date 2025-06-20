'use client';

import { usePathname } from 'next/navigation';
import { UnifiedHeader, NavigationItem, SocialLink } from './layout/UnifiedHeader';
import { useDarkMode } from '../hooks/useDarkMode';
import { LinkedInIcon, GitHubIcon, MediumIcon } from './icons/SocialIcons';

export default function HeaderAdapter() {
  const pathname = usePathname();
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      href: '/',
      isActive: isActive('/'),
    },
    {
      label: 'Articles',
      href: '/articles',
      isActive: isActive('/articles'),
    },
    {
      label: 'Projects',
      href: '/projects',
      isActive: isActive('/projects'),
    },
    {
      label: 'Services',
      href: '/services',
      isActive: isActive('/services'),
    },
    {
      label: 'Tools',
      href: 'https://links.mbernier.com',
      isExternal: true,
    },
    {
      label: 'Resume',
      href: '/resume',
      isActive: isActive('/resume'),
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      label: 'LinkedIn Profile',
      href: 'https://www.linkedin.com/in/mkbernier/',
      icon: <LinkedInIcon size={20} />,
    },
    {
      label: 'GitHub Profile',
      href: 'https://github.com/mbernier',
      icon: <GitHubIcon size={20} />,
    },
    {
      label: 'Medium Blog',
      href: 'https://mbernier.medium.com/',
      icon: <MediumIcon size={20} />,
    },
  ];

  return (
    <UnifiedHeader
      title="Matt Bernier"
      navigationItems={navigationItems}
      socialLinks={socialLinks}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      variant="main-site"
      showSocialLinks={true}
    />
  );
} 