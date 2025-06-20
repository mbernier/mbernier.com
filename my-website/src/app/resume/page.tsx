import Link from 'next/link';
import { getContentBySlug, getContentByDirectory } from '../../lib/content';
import { constructMetadata } from '../../lib/metadata';

export const metadata = constructMetadata({
  title: 'Resume',
  description: 'Professional experience, skills, and qualifications of Matt Bernier.',
});

export default async function ResumePage() {
  const resumeContent = await getContentBySlug('work', 'resume');
  
  // Fetch all work experiences and sort by date (most recent first)
  const workExperiences = await getContentByDirectory('work');
  // Filter out the resume content itself
  const jobs = workExperiences
    .filter(job => job.slug !== 'resume' && job.company && job.title && job.date)
    .sort((a, b) => {
      // Parse dates to compare - handling date ranges like "2020-2022"
      const getYearValue = (dateStr: string) => {
        // For "Present" dates, return a far future year to sort at the top
        if (dateStr.includes('Present')) {
          return 9999;
        }
        
        // For date ranges, use the end year or most recent year
        if (dateStr.includes('-')) {
          const years = dateStr.split('-');
          // If we have a range, use the end year (or start year if no end year)
          const year = years.length === 2 ? (years[1] || years[0]) : years[0];
          return parseInt(year.trim());
        }
        
        // Try to parse as a year or full date
        if (/^\d{4}$/.test(dateStr)) {
          return parseInt(dateStr);
        }
        
        // Try as a full date
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.getFullYear();
        }
        
        return 0; // Fallback for unparseable dates
      };
      
      // Use sortDate if available (added by the getContentByDirectory function)
      const yearA = a.sortDate ? parseInt(a.sortDate) : getYearValue(a.date);
      const yearB = b.sortDate ? parseInt(b.sortDate) : getYearValue(b.date);
      
      return yearB - yearA; // Sort descending (most recent first)
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Resume
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          My professional experience, skills, and qualifications.
        </p>
        <div className="mt-6">
          <a
            href="/Matt Bernier_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-border text-base font-medium rounded-md shadow-sm bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Download PDF
            <svg 
              className="ml-2 -mr-1 h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md p-8">
        {resumeContent && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground">Professional Summary</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mt-4">
              <div dangerouslySetInnerHTML={{ __html: resumeContent.content }} />
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
        
        <div className="mt-6 space-y-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.slug} className="relative pl-8 border-l-2 border-border pb-2">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="pl-3">
                  <Link href={`/work/${job.slug}`} className="group">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                  </Link>
                  <div className="text-primary font-medium">{job.company}</div>
                  <div className="text-sm text-muted-foreground">{job.date}</div>
                  {job.description && (
                    <p className="mt-2 text-muted-foreground">{job.description}</p>
                  )}
                  <Link 
                    href={`/work/${job.slug}`}
                    className="mt-2 inline-block text-primary hover:underline transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))
                      ) : (
              <p className="text-muted-foreground">No work experience found.</p>
            )}
        </div>

        <h2 className="mt-8 text-2xl font-bold text-foreground">Education</h2>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-foreground">Bachelor of Science in Computer Science</h3>
          <div className="text-primary font-medium">University of Missouri-Columbia</div>
          <div className="text-sm text-muted-foreground">Graduated: 2007</div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-foreground">Bachelor of Science in Information Technology</h3>
          <div className="text-primary font-medium">University of Missouri-Columbia</div>
          <div className="text-sm text-muted-foreground">Graduated: 2007</div>
        </div>
      </div>
    </div>
  );
}
