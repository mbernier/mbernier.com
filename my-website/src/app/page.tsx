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
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Developer, writer, and creator focused on building great products and experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/resume"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90"
              >
                View Resume
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium shadow-sm hover:bg-secondary/90"
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
      <section className="py-16 bg-gray-50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-bold text-foreground">Recent Articles</h2>
            <Link href="/articles" className="text-primary hover:underline">
              View all articles →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <div key={article.slug} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(article.date).toLocaleDateString()}</div>
                    <Link href={`/articles/${article.slug}`}>
                      <h3 className="mt-2 text-xl font-semibold text-foreground hover:text-primary">{article.title}</h3>
                    </Link>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">{article.excerpt}</p>
                    <Link href={`/articles/${article.slug}`} className="mt-4 inline-block text-primary hover:underline">
                      Read more →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-gray-500 dark:text-gray-400">No articles found. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-bold text-foreground">Recent Projects</h2>
            <Link href="/projects" className="text-primary hover:underline">
              View all projects →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.slug} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {project.image && (
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
                    <Link href={`/projects/${project.slug}`} className="mt-4 inline-block text-primary hover:underline">
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
    </div>
  );
}
