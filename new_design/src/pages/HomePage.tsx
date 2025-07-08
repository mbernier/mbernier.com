import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { RecentArticles } from '../components/home/RecentArticles';
import { FeaturedProjects } from '../components/home/FeaturedProjects';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <RecentArticles />
      <ServicesPreview />
      <FeaturedProjects />
    </div>
  );
}