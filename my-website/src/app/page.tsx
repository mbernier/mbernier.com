import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold">Welcome to My Website</h1>
      <p className="mt-4">Explore my work, articles, and projects.</p>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li><Link href="/resume">Resume</Link></li>
          <li><Link href="/articles">Articles</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </nav>
    </main>
  );
}
