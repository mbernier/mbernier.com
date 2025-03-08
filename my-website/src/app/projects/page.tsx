import Link from 'next/link';
import { getMarkdownFiles } from '@/lib/markdown';

export default async function Projects() {
  const projects = getMarkdownFiles('projects');

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Projects</h1>
      <ul className="mt-4 space-y-3">
        {projects.map((project) => (
          <li key={project.filename}>
            <Link href={`/projects/${project.filename.replace('.md', '')}`}>
              {project.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
