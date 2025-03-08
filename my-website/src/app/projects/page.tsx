import Link from 'next/link';
import Image from 'next/image';
import { getContentByDirectory } from '../../lib/content';
import { constructMetadata } from '../../lib/metadata';

export const metadata = constructMetadata({
  title: 'Projects',
  description: 'Explore my latest projects, applications, and open-source contributions.',
});

export default async function ProjectsPage() {
  const projects = await getContentByDirectory('projects');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          A showcase of my work, including web applications, open-source contributions, and more.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div 
              key={project.slug}
              className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {project.image ? (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{project.title.charAt(0)}</span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <Link href={`/projects/${project.slug}`}>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
                      {project.title}
                    </h2>
                  </Link>
                  
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      aria-label="GitHub Repository"
                    >
                      <svg
                        className="h-6 w-6"
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
                    </a>
                  )}
                </div>
                
                {project.tech && project.tech.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <span 
                        key={tech} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {project.excerpt}
                </p>
                
                <Link 
                  href={`/projects/${project.slug}`} 
                  className="mt-4 inline-flex items-center text-primary hover:underline"
                >
                  View project
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
            No projects found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
