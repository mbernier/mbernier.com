import { getMarkdownBySlug } from '../../lib/markdown';

export default async function TermsOfService() {
  const result = await getMarkdownBySlug('legal', 'terms_of_service');
  
  // Default content in case the markdown file doesn't exist
  const contentHtml = result?.contentHtml || '<p>Terms of service content not found.</p>';

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <article className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
