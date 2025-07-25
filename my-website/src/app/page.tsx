import Link from 'next/link';
import Image from 'next/image';
import { getContentByDirectory } from '../lib/content';
import { constructMetadata } from '../lib/metadata';

export const metadata = constructMetadata({
  title: 'Home',
});

export default async function Home() {
  const [articles, projects] = await Promise.all([
    getContentByDirectory('articles'),
    getContentByDirectory('projects'),
  ]);

  // Get the most recent items
  const recentArticles = articles.slice(0, 3);
  const recentProjects = projects.slice(0, 3);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Hi, I&apos;m Matt Bernier
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Developer, writer, and creator focused on building great products and experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-colors"
              >
                Hire Me
              </Link>
              <Link
                href="/resume"
                className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium shadow-sm hover:bg-secondary/90 transition-colors"
              >
                View Resume
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3 rounded-md border border-border text-foreground font-medium shadow-sm hover:bg-muted transition-colors"
              >
                See Projects
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <div className="relative w-80 h-80 mx-auto">
              <Image
                src="/matt.hat.jpg"
                alt="Matt Bernier"
                fill
                className="object-cover rounded-full shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-bold text-foreground">Recent Articles</h2>
            <Link 
              href="/articles" 
              className="text-primary hover:underline transition-colors"
            >
              View all articles →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <div key={article.slug} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground">{new Date(article.date).toLocaleDateString()}</div>
                    <Link href={`/articles/${article.slug}`}>
                      <h3 className="mt-2 text-xl font-semibold text-card-foreground hover:text-primary transition-colors">{article.title}</h3>
                    </Link>
                    <p className="mt-3 text-muted-foreground">{article.excerpt}</p>
                    <Link href={`/articles/${article.slug}`} className="mt-4 inline-block text-primary hover:underline transition-colors">
                      Read more →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-muted-foreground">No articles found. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-3xl font-bold text-foreground">Services</h2>
            <Link 
              href="/services" 
              className="text-primary hover:underline transition-colors"
            >
              More Information →
            </Link>
          </div>
          <div className="bg-card rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-foreground">-&nbsp;Product Management</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="text-foreground">-&nbsp;Project Management</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-foreground">-&nbsp;Engineering Operations</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <span className="text-foreground">-&nbsp;Public Speaking & Workshops</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-foreground">-&nbsp;AI Workflow Integration</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-foreground">-&nbsp;Fractional CPO Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-bold text-foreground">Recent Projects</h2>
            <Link 
              href="/projects" 
              className="text-primary hover:underline transition-colors"
            >
              View all projects →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.slug} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {project.image && typeof project.image === 'string' && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl font-semibold text-foreground hover:text-primary">{project.title}</h3>
                    </Link>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">{project.excerpt}</p>
                    <Link 
                      href={`/projects/${project.slug}`} 
                      className="mt-4 inline-block text-primary hover:underline"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-gray-500 dark:text-gray-400">No projects found. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Tools & Resources Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Tools & Resources</h2>
          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold text-card-foreground mb-3">
                  Recommended Tools & Services
                </h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Discover the tools and services I use and recommend for development, productivity, 
                  and business growth. From AI-powered solutions to hosting and infrastructure tools.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    AI Tools
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                    Hosting & Infrastructure
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Productivity Tools
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Business Tools
                  </span>
                </div>
              </div>
              <div className="md:w-1/3 md:text-right">
                <a
                  href="https://links.mbernier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Explore Tools
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Visit links.mbernier.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
