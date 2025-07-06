import { Metadata } from 'next';

const siteConfig = {
  name: "Matt Bernier",
  title: "Matt Bernier - Fractional Product Management & Technical Consulting",
  description: "Fractional Product Management Leader, Developer, writer, and creator. Expert technical consulting and product strategy services.",
  url: "https://mbernier.com",
  ogImage: "https://mbernier.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/mkbernier",
    linkedin: "https://linkedin.com/in/mkbernier",
    github: "https://github.com/mbernier",
  },
};

export function createMetadata({
  title,
  description,
  image,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.ogImage;
  const pageUrl = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "Fractional Product Management",
      "Technical Consulting", 
      "Product Strategy",
      "Software Development",
      "AI Integration",
      "Product Leadership",
      "Startup Consulting",
      "B2B SaaS",
      "Product Manager",
      "Technical Leadership"
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@mkbernier",
      site: "@mkbernier",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Pre-defined metadata for common pages
export const pageMetadata = {
  home: createMetadata({
    title: "Home",
    description: "Fractional Product Management Leader and Technical Consultant helping companies build better products and solve complex technical challenges.",
  }),
  
  services: createMetadata({
    title: "Services",
    description: "Fractional Product Management and Technical Consulting services. Expert help with product strategy, roadmap optimization, and AI workflow integration.",
    path: "/services",
  }),
  
  articles: createMetadata({
    title: "Articles",
    description: "Thoughts, ideas, and insights on product management, developer experience, and building better software from 15+ years in the industry.",
    path: "/articles",
  }),
  
  projects: createMetadata({
    title: "Projects",
    description: "Featured work and projects showcasing expertise in product management, technical consulting, and full-stack development with real impact metrics.",
    path: "/projects",
  }),
  
  contact: createMetadata({
    title: "Contact",
    description: "Ready to accelerate your product development or solve complex technical challenges? Let's discuss how I can help you achieve your goals.",
    path: "/contact",
  }),
  
  credentialing: createMetadata({
    title: "Experience & Credentials",
    description: "15+ years of experience bridging technical expertise and business strategy. From startup engineer to fractional product leader.",
    path: "/credentialing",
  }),
};

export default siteConfig;