import { getMarkdownBySlug } from '@/lib/markdown';

export default async function Resume() {
  const { contentHtml } = await getMarkdownBySlug('work', 'resume');

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Matt Bernier&apos;s Resume</h1>
      <article className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
