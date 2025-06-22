import { Metadata } from 'next';

export interface EnhancedContentItem {
  // Basic fields
  title: string;
  description?: string;
  excerpt?: string;
  slug: string;
  date: string;
  image?: string;
  
  // Enhanced SEO fields
  focus_keyword?: string;
  secondary_keywords?: string[];
  canonical_url?: string;
  meta_title?: string;
  
  // Social media fields
  social_title?: string;
  social_description?: string;
  og_image?: string;
  twitter_card?: 'summary' | 'summary_large_image';
  facebook_description?: string;
  linkedin_description?: string;
  
  // Schema.org fields
  schema_type?: string;
  schema_headline?: string;
  schema_keywords?: string[];
  
  // Image optimization
  image_alt?: string;
  image_caption?: string;
  
  // Content metadata
  author?: string;
  reading_time?: string;
  word_count?: number;
  language?: string;
  published?: boolean;
  
  // Technical SEO
  robots?: string;
  sitemap_priority?: number;
  sitemap_changefreq?: string;
  
  // Categories and tags
  categories?: string[];
  tags?: string[];
  
  // Project-specific fields
  tech?: string[];
  status?: string;
  demo_url?: string;
  github_url?: string;
  live_url?: string;
  
  [key: string]: unknown;
}

interface EnhancedMetadataProps {
  content?: EnhancedContentItem;
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const siteConfig = {
  name: 'Matt Bernier',
  url: 'https://mbernier.com',
  description: 'Developer, writer, and creator',
  keywords: ['software development', 'writing', 'technology', 'web development'],
  ogImage: '/matt.hat.jpg',
  author: 'Matt Bernier',
  social: {
    twitter: '@mattbernier',
    linkedin: 'mkbernier',
    github: 'mattbernier',
  }
};

export function constructEnhancedMetadata({
  content,
  title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = siteConfig.author,
  section,
  tags = [],
}: EnhancedMetadataProps = {}): Metadata {
  
  // If content is provided, extract SEO fields from it
  if (content) {
    title = content.meta_title || content.title;
    description = content.description || content.excerpt || description;
    image = content.og_image || content.image || image;
    canonical = content.canonical_url || canonical;
    author = content.author || author;
    publishedTime = content.date;
    tags = content.tags || [];
    
    // Combine focus keyword with secondary keywords
    if (content.focus_keyword || content.secondary_keywords) {
      const contentKeywords = [
        ...(content.focus_keyword ? [content.focus_keyword] : []),
        ...(content.secondary_keywords || [])
      ];
      keywords = [...contentKeywords, ...keywords];
    }
    
    // Use schema type to determine open graph type
    if (content.schema_type === 'Article' || content.schema_type === 'BlogPosting') {
      type = 'article';
    }
    
    // Override robots if specified
    if (content.robots && content.robots.includes('noindex')) {
      noIndex = true;
    }
  }

  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const socialTitle = content?.social_title || title;
  const socialDescription = content?.social_description || description;
  
  const metadata: Metadata = {
    title: metaTitle,
    description,
    keywords: keywords.slice(0, 10), // Limit to 10 keywords
    authors: [{ name: author }],
    creator: author,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    
    // Canonical URL
    alternates: {
      canonical: canonical || '/',
    },
    
    // Favicons and manifest
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    
    // Open Graph
    openGraph: {
      title: socialTitle ? `${socialTitle} | ${siteConfig.name}` : metaTitle,
      description: socialDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: content?.language || 'en_US',
      type: type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: content?.image_alt || title || siteConfig.name,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        section,
        tags,
      }),
    },
    
    // Twitter Card
    twitter: {
      card: content?.twitter_card || 'summary_large_image',
      site: siteConfig.social.twitter,
      creator: siteConfig.social.twitter,
      title: socialTitle ? `${socialTitle} | ${siteConfig.name}` : metaTitle,
      description: socialDescription,
      images: [image],
    },
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    
    // Additional metadata for articles
    ...(type === 'article' && {
      other: {
        'article:author': author,
        ...(publishedTime && { 'article:published_time': publishedTime }),
        ...(modifiedTime && { 'article:modified_time': modifiedTime }),
        ...(section && { 'article:section': section }),
        'article:tag': tags.join(','),
        ...(content?.reading_time && { 'article:reading_time': content.reading_time }),
      },
    }),
  };
  
  return metadata;
}

export function generateStructuredData(content: EnhancedContentItem, type: 'article' | 'project' = 'article') {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': content.schema_type || (type === 'article' ? 'Article' : 'SoftwareApplication'),
    headline: content.schema_headline || content.title,
    description: content.description || content.excerpt || '',
    author: {
      '@type': 'Person',
      name: content.author || siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: content.date,
    dateModified: content.modified_date || content.date,
    url: `${siteConfig.url}/${type === 'article' ? 'articles' : 'projects'}/${content.slug}`,
    ...(content.image && {
      image: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${content.image}`,
        alt: content.image_alt || content.title,
      },
    }),
    ...(content.schema_keywords && { keywords: content.schema_keywords.join(',') }),
  };

  if (type === 'article') {
    return {
      ...baseData,
      '@type': content.schema_type || 'Article',
      articleSection: content.categories?.[0],
      wordCount: content.word_count,
      timeRequired: content.reading_time,
      ...(content.tags && { keywords: content.tags.join(',') }),
    };
  } else {
    return {
      ...baseData,
      '@type': content.schema_type || 'SoftwareApplication',
      applicationCategory: content.category,
      operatingSystem: content.operating_system || 'Web Browser',
      ...(content.tech && { programmingLanguage: content.tech }),
      ...(content.demo_url && { url: content.demo_url }),
      ...(content.github_url && { codeRepository: content.github_url }),
    };
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'Software Developer',
    description: siteConfig.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
      `https://linkedin.com/in/${siteConfig.social.linkedin}`,
      `https://github.com/${siteConfig.social.github}`,
    ],
  };
} 