import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllContentSlugs } from '../../../lib/content';
import { constructMetadata } from '../../../lib/metadata';
import ToolsCTA from '../../../components/ToolsCTA';

// Define params as a Promise per Next.js 15 requirements
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps) {
  // Await the params promise to get the actual values
  const { slug } = await props.params;
  
  const article = await getContentBySlug('articles', slug);
  
  if (!article) {
    return constructMetadata({
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      noIndex: true,
    });
  }
  
  return constructMetadata({
    title: article.title,
    description: article.excerpt,
  });
}

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs('articles');
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage(props: PageProps) {
  // Await the params promise to get the actual values
  const { slug } = await props.params;
  
  const article = await getContentBySlug('articles', slug);
  
  if (!article) {
    notFound();
  }
  
  // Validate that article has categories
  if (!article.categories && !article.category) {
    throw new Error(`Article "${article.title}" is missing required categories field`);
  }
  
  // Process categories - could be string, array, or comma-separated values
  let categories: string[] = [];
  
  if (Array.isArray(article.categories)) {
    categories = article.categories as string[];
  } else if (typeof article.categories === 'string') {
    // Handle comma-separated categories
    if (article.categories.includes(',')) {
      categories = article.categories.split(',').map(cat => cat.trim());
    } else {
      categories = [article.categories.trim()];
    }
  } 
  // Legacy support for old category field
  else if (Array.isArray(article.category)) {
    categories = article.category as string[];
  } else if (typeof article.category === 'string') {
    // Handle comma-separated categories
    if (article.category.includes(',')) {
      categories = article.category.split(',').map(cat => cat.trim());
    } else {
      categories = [article.category.trim()];
    }
  }
  
  // If still no categories after processing, throw error
  if (categories.length === 0) {
    throw new Error(`Article "${article.title}" has an empty categories field`);
  }
  
  // Check if article date is in the future
  const articleDate = new Date(article.date);
  const now = new Date();
  const isFutureArticle = articleDate > now;
  
  // Format the date for display
  const formattedDate = articleDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-card rounded-lg shadow-md overflow-hidden">
        <header className="mb-10 p-6">
          <div className="space-y-1 text-center">
            <div className="text-muted-foreground">
              {isFutureArticle ? (
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300 mb-2">
                    EARLY ACCESS
                  </span>
                </div>
              ) : null}
              {isFutureArticle 
                ? `Early access article - officially releasing on ${formattedDate}`
                : formattedDate
              }
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {article.title}
            </h1>
            
            {/* Display categories in a more prominent way */}
            {categories.length > 0 && (
              <div className="flex justify-center mt-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <Link 
                      key={category} 
                      href={`/articles?category=${encodeURIComponent(category)}`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display tags if they exist */}
            {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mt-3">
                <div className="text-sm text-muted-foreground mr-2">Tags:</div>
                {article.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg dark:prose-invert mx-auto p-6">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        <div className="p-6">
          <ToolsCTA className="mt-6" />
          
          <div className="mt-12 pt-6 border-t border-border">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-primary hover:underline transition-colors"
            >
              <svg 
                className="mr-2 h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Back to articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
