import { EnhancedContentItem } from '../lib/enhanced-metadata';

interface SEOHeadProps {
  content: EnhancedContentItem;
  type: 'article' | 'project' | 'page';
  url?: string;
}

const siteConfig = {
  name: 'Matt Bernier',
  url: 'https://mbernier.com',
  description: 'Developer, writer, and creator',
  author: 'Matt Bernier',
  social: {
    twitter: '@mattbernier',
    linkedin: 'mkbernier',
    github: 'mattbernier',
  }
};

export default function SEOHead({ content, type, url }: SEOHeadProps) {
  // Generate all the optimized values
  const pageUrl = url || `${siteConfig.url}/${type === 'article' ? 'articles' : type === 'project' ? 'projects' : ''}/${content.slug}`;
  const title = content.meta_title || content.title;
  const description = content.description;
  const image = content.og_image || content.image || '/matt.hat.jpg';
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
  const author = content.author || siteConfig.author;
  
  // Social media specific content
  const socialTitle = content.social_title || title;
  const socialDescription = content.social_description || description;
  const twitterCard = content.twitter_card || 'summary_large_image';
  
  // Keywords for meta tags
  const keywords = [
    ...(content.focus_keyword ? [content.focus_keyword] : []),
    ...(content.secondary_keywords || []),
    ...(content.tags || [])
  ].slice(0, 10).join(', ');

  // Schema.org structured data
  const generateArticleSchema = () => {
    if (type !== 'article') return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': content.schema_type || 'Article',
      headline: content.schema_headline || title,
      description: description,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        alt: content.image_alt || title,
        width: 1200,
        height: 630
      },
      author: {
        '@type': 'Person',
        name: author,
        url: siteConfig.url,
        sameAs: [
          `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
          `https://linkedin.com/in/${siteConfig.social.linkedin}`,
          `https://github.com/${siteConfig.social.github}`
        ]
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
          width: 400,
          height: 400
        }
      },
      datePublished: content.date,
      dateModified: content.modified_date || content.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      },
      url: pageUrl,
      ...(content.categories && { articleSection: content.categories[0] }),
      ...(content.tags && { keywords: content.tags.join(', ') }),
      ...(content.reading_time && { timeRequired: `PT${content.reading_time.replace(/\D/g, '')}M` }),
      ...(content.word_count && { wordCount: content.word_count }),
      isAccessibleForFree: true,
      genre: content.categories?.[0] || 'Technology'
    };
  };

  const generateProjectSchema = () => {
    if (type !== 'project') return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': content.schema_type || 'SoftwareApplication',
      name: title,
      description: description,
      url: content.demo_url || pageUrl,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        alt: content.image_alt || title
      },
      author: {
        '@type': 'Person',
        name: author,
        url: siteConfig.url
      },
      dateCreated: content.date,
      applicationCategory: content.category || 'Web Application',
      operatingSystem: 'Web Browser',
      ...(content.tech && { programmingLanguage: content.tech }),
      ...(content.github_url && { codeRepository: content.github_url }),
      ...(content.live_url && { url: content.live_url }),
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    };
  };

  const generateBreadcrumbSchema = () => {
    const items = [
      { name: 'Home', url: siteConfig.url },
      { name: type === 'article' ? 'Articles' : 'Projects', url: `${siteConfig.url}/${type === 'article' ? 'articles' : 'projects'}` },
      { name: title, url: pageUrl }
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  };

  const generateWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      jobTitle: 'Software Developer',
      url: siteConfig.url
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  });

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title} | {siteConfig.name}</title>
      <meta name="title" content={`${title} | ${siteConfig.name}`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={content.robots || 'index, follow'} />
      <link rel="canonical" href={content.canonical_url || pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={content.facebook_description || socialDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={content.image_alt || title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={content.language || 'en_US'} />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={content.date} />
          <meta property="article:modified_time" content={content.modified_date?.toString() || content.date} />
          <meta property="article:author" content={author} />
          {content.categories?.map((category) => (
            <meta key={category} property="article:section" content={category} />
          ))}
          {content.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          {content.reading_time && <meta property="article:reading_time" content={content.reading_time} />}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={content.image_alt || title} />
      <meta name="twitter:site" content={siteConfig.social.twitter} />
      <meta name="twitter:creator" content={siteConfig.social.twitter} />

      {/* LinkedIn specific */}
      <meta property="linkedin:owner" content={siteConfig.social.linkedin} />

      {/* Pinterest Rich Pins */}
      <meta property="article:author" content={author} />
      <meta property="og:rich_attachment" content="true" />

      {/* WhatsApp sharing optimization */}
      <meta property="og:image:type" content="image/jpeg" />

      {/* Apple Touch Icon for iOS sharing */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Slack unfurling optimization */}
      <meta name="slack-app-id" content="" />

      {/* Additional meta tags for better indexing */}
      <meta name="language" content={content.language || 'en-US'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Focus keyword for SEO (not visible to users) */}
      {content.focus_keyword && (
        <meta name="focus-keyword" content={content.focus_keyword} />
      )}

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Preload critical resources */}
      {content.preload_image && content.image && (
        <link rel="preload" as="image" href={imageUrl} />
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteSchema(),
            type === 'article' ? generateArticleSchema() : generateProjectSchema(),
            generateBreadcrumbSchema()
          ].filter(Boolean))
        }}
      />

      {/* Alternative formats */}
      {content.amp_enabled && (
        <link rel="amphtml" href={`${pageUrl}/amp`} />
      )}

      {/* RSS feed */}
      <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS Feed`} href={`${siteConfig.url}/feed.xml`} />

      {/* Additional social platform optimizations */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </>
  );
} 