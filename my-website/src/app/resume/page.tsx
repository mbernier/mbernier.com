import { getMarkdownBySlug } from '../../lib/markdown';

export default async function Resume() {
  const resumeData = await getMarkdownBySlug('work', 'resume');

  // Handle case where the file does not exist
  if (!resumeData) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-3xl font-bold">Resume Not Found</h1>
        <p className="mt-4">The resume content is missing. Please add a `resume.md` file to `src/content/work/`.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Matt Bernier&apos;s Resume</h1>
      <article className="mt-4" dangerouslySetInnerHTML={{ __html: resumeData.contentHtml }} />
    </main>
  );
}
