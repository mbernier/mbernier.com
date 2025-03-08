import { getMarkdownFiles } from '@/lib/markdown';
import Link from 'next/link';

export default function Resume({ jobs }: { jobs: any[] }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Resume</h1>
      <ul className="mt-4 space-y-3">
        {jobs.map((job) => (
          <li key={job.filename}>
            <Link href={`/resume/${job.filename.replace('.md', '')}`}>
              {job.metadata.title} - {job.metadata.company}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const jobs = getMarkdownFiles('work');
  return { props: { jobs } };
}
