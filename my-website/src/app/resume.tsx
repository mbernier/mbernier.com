import { getMarkdownFiles } from '../lib/markdown';
import Link from 'next/link';

// Define an interface for job metadata
interface JobMetadata {
  title: string;
  company: string;
  date?: string;
  description?: string;
  [key: string]: string | undefined;
}

// Define an interface for job
interface Job {
  filename: string;
  metadata: JobMetadata;
  content: string;
}

export default function Resume({ jobs }: { jobs: Job[] }) {
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
