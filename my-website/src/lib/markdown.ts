import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'src/content');

export function getMarkdownFiles(folder: string) {
  const dirPath = path.join(contentDir, folder);
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath).map((filename) => {
    const filePath = path.join(dirPath, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return { filename, metadata: data, content };
  });
}

export async function getMarkdownBySlug(folder: string, slug: string) {
  const filePath = path.join(contentDir, folder, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { metadata: data, contentHtml };
}
