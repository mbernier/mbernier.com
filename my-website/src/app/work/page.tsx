import Link from 'next/link';
import { getContentByDirectory } from '../../lib/content';
import { constructMetadata } from '../../lib/metadata';

export const metadata = constructMetadata({
  title: 'Work History',
  description: 'My professional work history and career journey.',
});

export default async function WorkPage() {
  const workExperiences = await getContentByDirectory('work');
  
  // Filter out the resume content and sort by date (most recent first)
  const jobs = workExperiences
    .filter(job => job.slug !== 'resume' && job.company && job.title && job.date)
    .sort((a, b) => {
      // Parse dates to compare - assuming date format like "2020-2022" or "2015-2018"
      const aStartYear = parseInt(a.date.split('-')[0]);
      const bStartYear = parseInt(b.date.split('-')[0]);
      return bStartYear - aStartYear; // Sort descending (most recent first)
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Work History
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          A chronological overview of my professional journey and career experience.
        </p>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-10">
          {jobs.map((job) => (
            <div key={job.slug} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 pl-8">
                <Link href={`/work/${job.slug}`}>
                  <h2 className="text-2xl font-bold text-foreground hover:text-primary">{job.title}</h2>
                </Link>
                <div className="text-xl text-primary font-medium mt-1">{job.company}</div>
                <div className="text-md text-gray-500 dark:text-gray-400 mt-1">{job.date}</div>
                
                {job.description && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300">{job.description}</p>
                )}
                
                <Link 
                  href={`/work/${job.slug}`} 
                  className="mt-6 inline-flex items-center text-primary hover:underline"
                >
                  Read more
                  <svg 
                    className="ml-1 h-4 w-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No work experience found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}