import Link from 'next/link';
import { getMarkdownFiles } from '@/lib/markdown';

export default async function Articles() {
  const articles = getMarkdownFiles('articles');

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Articles</h1>
      <ul className="mt-4 space-y-3">
        {articles.map((article) => (
          <li key={article.filename}>
            <Link href={`/articles/${article.filename.replace('.md', '')}`}>
              {article.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
