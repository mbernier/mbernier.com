import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllContentSlugs } from '../../../lib/content';
import { constructMetadata } from '../../../lib/metadata';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  // Ensure params is awaited
  const resolvedParams = await params;
  
  const work = await getContentBySlug('work', resolvedParams.slug);
  
  if (!work) {
    return constructMetadata({
      title: 'Work Experience Not Found',
      description: 'The requested work experience could not be found.',
      noIndex: true,
    });
  }
  
  // Safe type access
  const title = typeof work.title === 'string' ? work.title : '';
  const company = typeof work.company === 'string' ? work.company : '';
  const description = typeof work.description === 'string' 
    ? work.description 
    : `Work experience as ${title} at ${company}`;
  
  return constructMetadata({
    title: `${title} at ${company}`,
    description,
  });
}

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs('work');
  return slugs.map((slug) => ({ slug }));
}

export default async function WorkPage({ params }: PageProps) {
  // Ensure params is awaited
  const resolvedParams = await params;
  
  const work = await getContentBySlug('work', resolvedParams.slug);
  
  if (!work) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-card rounded-lg shadow-md overflow-hidden">
        <header className="mb-10 p-6 pl-8">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {work.title}
            </h1>
            <div className="text-2xl text-primary font-medium">
              {work.company}
            </div>
            <div className="text-xl text-gray-500 dark:text-gray-400">
              {work.date}
            </div>
          </div>
        </header>
        
        <div className="prose prose-lg dark:prose-invert mx-auto px-6 pl-8">
          <div dangerouslySetInnerHTML={{ __html: work.content }} />
        </div>
        
        <div className="mt-12 pt-6 px-6 pl-8 pb-6 border-t border-gray-200 dark:border-gray-800 flex justify-between">
          <Link 
            href="/resume" 
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
            Back to Resume
          </Link>
        </div>
      </article>
    </div>
  );
} 