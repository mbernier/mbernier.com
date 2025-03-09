import Link from 'next/link';
import { getPaginatedContent } from '../../lib/content';
import { constructMetadata } from '../../lib/metadata';
import Pagination from '../../components/Pagination';

export const metadata = constructMetadata({
  title: 'Articles',
  description: 'Explore my latest articles on software development, technology, and more.',
});

// Make the page component dynamic to handle searchParams properly
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  // Ensure searchParams is awaited
  const resolvedSearchParams = await searchParams;
  
  // Parse the searchParams object safely without direct property access
  const pageString = Array.isArray(resolvedSearchParams['page']) 
    ? resolvedSearchParams['page'][0] 
    : resolvedSearchParams['page'] || '1';
  
  const currentPage = parseInt(pageString, 10) || 1;
  
  const { items: articles, totalPages } = await getPaginatedContent('articles', currentPage, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          Thoughts, ideas, and insights on Product Management, Project Management, Software Development, technology, and more.
        </p>
      </div>

      {articles.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
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
                <article 
                  key={article.slug} 
                  className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {isFutureArticle ? (
                        <div className="flex items-start mb-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300 mr-2">
                            UPCOMING
                          </span>
                        </div>
                      ) : null}
                      {isFutureArticle 
                        ? `This article will be published on Medium on ${formattedDate}`
                        : formattedDate
                      }
                    </div>
                    <Link href={`/articles/${article.slug}`}>
                      <h2 className="mt-2 text-xl font-semibold text-foreground hover:text-primary">
                        {article.title}
                      </h2>
                    </Link>
                    
                    {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
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
                    
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            basePath="/articles"
          />
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No articles found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
