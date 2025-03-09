import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getContentBySlug, getAllContentSlugs } from '../../../lib/content';
import { constructMetadata } from '../../../lib/metadata';

// Default image for projects that don't have their own image
const DEFAULT_PROJECT_IMAGE = '/images/default-project.jpg';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  // Ensure params is awaited
  const resolvedParams = await params;
  
  const project = await getContentBySlug('projects', resolvedParams.slug);
  
  if (!project) {
    return constructMetadata({
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      noIndex: true,
    });
  }
  
  return constructMetadata({
    title: project.title,
    description: project.excerpt,
    image: typeof project.image === 'string' ? project.image : undefined,
  });
}

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs('projects');
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  // Ensure params is awaited
  const resolvedParams = await params;
  
  const project = await getContentBySlug('projects', resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  
  // Get image source safely
  const imageSrc = typeof project.image === 'string' 
    ? project.image 
    : DEFAULT_PROJECT_IMAGE;
  
  // Check if status exists and is a string
  const hasInProgressStatus = typeof project.status === 'string' && 
    project.status.toLowerCase() === 'in progress';
  
  // Check if github URL exists and is a string
  const hasGithubLink = typeof project.github === 'string';
  
  // Check if liveUrl exists and is a string
  const hasLiveUrl = typeof project.liveUrl === 'string';
  
  // Check if tech is an array with items
  const hasTechItems = Array.isArray(project.tech) && project.tech.length > 0;
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article>
        <header className="mb-10 p-6 pl-8">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg shadow-md overflow-hidden mb-8">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            {hasInProgressStatus && (
              <div className="absolute top-0 left-0 w-full bg-blue-500 text-white py-1 text-center text-sm font-bold shadow-md z-10">
                IN PROGRESS
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                {project.title}
              </h1>
              
              {typeof project.date === 'string' && (
                <div className="mt-2 text-gray-500 dark:text-gray-400">
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>
              )}
            </div>
            
            {hasGithubLink && (
              <a
                href={project.github as string}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View GitHub
              </a>
            )}
          </div>
          
          {hasTechItems && (
            <div className="flex flex-wrap gap-2 mt-4">
              {(project.tech as string[]).map((tech: string, index: number) => (
                <span 
                  key={tech} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300"
                >
                  {tech}{index < (project.tech as string[]).length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}
          
          {hasLiveUrl && (
            <div className="mt-6">
              <a
                href={project.liveUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit Live Site
              </a>
            </div>
          )}
        </header>
        
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/projects" 
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
            Back to projects
          </Link>
        </div>
      </article>
    </div>
  );
}
