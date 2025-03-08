import { getMarkdownBySlug } from '../../lib/markdown';

export default async function PrivacyPolicy() {
  const { contentHtml } = await getMarkdownBySlug('legal', 'privacy_policy');

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <article className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
