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
      // Parse dates to compare - assuming date format like "2020-2022" or "2015-2018"
      const aStartYear = parseInt(a.date.split('-')[0]);
      const bStartYear = parseInt(b.date.split('-')[0]);
      return bStartYear - aStartYear; // Sort descending (most recent first)
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Resume
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          My professional experience, skills, and qualifications.
        </p>
        <div className="mt-6">
          <a
            href="/Matt Bernier_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-800 bg-gray-200 hover:bg-primary hover:text-gray-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            style={{
              backgroundColor: 'rgb(229, 231, 235)', // gray-200
              color: 'rgb(31, 41, 55)', // gray-800
              borderColor: 'rgb(209, 213, 219)', // gray-300
            }}
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

      {resumeContent ? (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: resumeContent.content }} />
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-foreground">Professional Summary</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Experienced software professional with a strong background in web development, API design, and technical leadership.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-foreground">Experience</h2>
          
          <div className="mt-6 space-y-8">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.slug} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800 pb-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                  <div className="text-primary font-medium">{job.company}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{job.date}</div>
                  {job.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{job.description}</p>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800 pb-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold text-foreground">Senior Software Engineer</h3>
                  <div className="text-primary font-medium">Example Company</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">January 2020 - Present</div>
                  <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>- Led development of key platform features resulting in 30% user growth</li>
                    <li>- Architected and implemented RESTful APIs used by over 100,000 daily active users</li>
                    <li>- Mentored junior developers and conducted code reviews to ensure quality standards</li>
                  </ul>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800 pb-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold text-foreground">Software Developer</h3>
                  <div className="text-primary font-medium">Previous Company</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">June 2017 - December 2019</div>
                  <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>- Developed and maintained web applications using React and Node.js</li>
                    <li>- Collaborated with design team to implement responsive UI components</li>
                    <li>- Optimized database queries resulting in 40% faster page load times</li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <h2 className="mt-8 text-2xl font-bold text-foreground">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'RESTful APIs', 
              'GraphQL', 'SQL', 'NoSQL', 'Git', 'CI/CD', 'Docker'].map((skill) => (
              <span 
                key={skill} 
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="mt-8 text-2xl font-bold text-foreground">Education</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-foreground">Bachelor of Science in Computer Science</h3>
            <div className="text-primary font-medium">University Name</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Graduated: May 2017</div>
          </div>
        </div>
      )}
    </div>
  );
}
