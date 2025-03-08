import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllContentSlugs } from '../../../lib/content';
import { constructMetadata } from '../../../lib/metadata';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getContentBySlug('articles', params.slug);
  
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getContentBySlug('articles', params.slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article>
        <header className="mb-10">
          <div className="space-y-1 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {article.title}
            </h1>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mt-4">
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
        
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/articles" 
            className="inline-flex items-center text-primary hover:underline"
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
      </article>
    </div>
  );
}
