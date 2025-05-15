import Link from 'next/link';
import { getPaginatedContent, getUniqueCategories } from '../../lib/content';
import { constructMetadata } from '../../lib/metadata';
import Pagination from '../../components/Pagination';

export const metadata = constructMetadata({
  title: 'Articles',
  description: 'Explore my latest articles on software development, technology, and more.',
});

// Make the page component dynamic to handle searchParams properly
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams; // Await searchParams before accessing it

  const pageString = Array.isArray(resolvedSearchParams["page"])
    ? resolvedSearchParams["page"][0]
    : resolvedSearchParams["page"] || "1";

  const currentPage = parseInt(pageString, 10) || 1;
  
  // Handle category filter
  const categoryParam = Array.isArray(resolvedSearchParams["category"])
    ? resolvedSearchParams["category"][0]
    : resolvedSearchParams["category"];
  
  // Get all unique categories for the filter display
  const allCategories = await getUniqueCategories("articles");
  
  const { items: articles, totalPages } = await getPaginatedContent(
    "articles", 
    currentPage, 
    9, 
    categoryParam
  );
  
  // Validate that all articles have categories
  for (const article of articles) {
    if (!article.categories && !article.category) {
      throw new Error(`Article "${article.title}" is missing required categories field`);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl dark:text-white">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-800 dark:text-gray-200">
          Thoughts, ideas, and insights on Product Management, Project Management, Software Development, technology, and more.
        </p>
      </div>
      
      {/* Category filter */}
      {allCategories.length > 0 && (
        <div className="mb-10">
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            <Link 
              href="/articles" 
              className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                !categoryParam
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </Link>
            {allCategories.map(category => (
              <Link 
                key={category} 
                href={`/articles?category=${encodeURIComponent(category)}`}
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                  categoryParam === category
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}

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
              
              // Process categories
              let categories: string[] = [];
              if (Array.isArray(article.categories)) {
                categories = article.categories as string[];
              } else if (typeof article.categories === 'string') {
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
                if (article.category.includes(',')) {
                  categories = article.category.split(',').map(cat => cat.trim());
                } else {
                  categories = [article.category.trim()];
                }
              }
              
              return (
                <article 
                  key={article.slug} 
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {isFutureArticle ? (
                        <div className="flex items-start mb-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200 mr-2">
                            EARLY ACCESS
                          </span>
                        </div>
                      ) : null}
                      {isFutureArticle 
                        ? `Early access - releasing on ${formattedDate}`
                        : formattedDate
                      }
                    </div>
                    <Link href={`/articles/${article.slug}`}>
                      <h2 className="mt-2 text-xl font-semibold text-foreground hover:text-primary dark:text-white dark:hover:text-blue-300">
                        {article.title}
                      </h2>
                    </Link>
                    
                    {/* Display categories */}
                    {categories.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {categories.map(category => (
                          <Link
                            key={category}
                            href={`/articles?category=${encodeURIComponent(category)}`}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {/* Display tags */}
                    {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1 items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Tags:</span>
                        {article.tags.map((tag: string) => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200"
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
          
          <div className="mt-12 flex justify-center">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              basePath={categoryParam ? `/articles?category=${encodeURIComponent(categoryParam)}` : "/articles"}
            />
          </div>
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
