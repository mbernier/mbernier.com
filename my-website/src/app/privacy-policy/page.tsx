import { getMarkdownBySlug } from '../../lib/markdown';

export default async function PrivacyPolicy() {
  const result = await getMarkdownBySlug('legal', 'privacy_policy');
  
  // Default content in case the markdown file doesn't exist
  const contentHtml = result?.contentHtml || '<p>Privacy policy content not found.</p>';

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <article className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
