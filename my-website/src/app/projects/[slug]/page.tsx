import { getMarkdownBySlug } from '../../../lib/markdown';

export default async function Project({ params }: { params: { slug: string } }) {
  const { metadata, contentHtml } = await getMarkdownBySlug('projects', params.slug);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{metadata.title}</h1>
      <article className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
