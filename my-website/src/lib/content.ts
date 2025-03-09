import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  [key: string]: any;
}

export interface ContentDirectory {
  [key: string]: ContentItem[];
}

export interface PaginatedContent {
  items: ContentItem[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function getContentByDirectory(type: string): Promise<ContentItem[]> {
  const directory = path.join(contentDirectory, type);
  const fileNames = fs.readdirSync(directory);
  
  const allContent = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the content metadata section
      const matterResult = matter(fileContents);
      
      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();
      
      // Combine the data with the slug and content
      return {
        slug,
        content: contentHtml,
        excerpt: matterResult.content.slice(0, 200) + '...',
        ...matterResult.data,
      } as ContentItem;
    })
  );
  
  // Sort content by date
  return allContent.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get paginated content from a specific directory
 * @param type Directory type (e.g., 'articles', 'projects')
 * @param page Current page number (1-indexed)
 * @param pageSize Number of items per page
 * @returns Paginated content with metadata
 */
export async function getPaginatedContent(
  type: string,
  page: number = 1,
  pageSize: number = 9
): Promise<PaginatedContent> {
  const allContent = await getContentByDirectory(type);
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = allContent.slice(startIndex, endIndex);
  
  const total = allContent.length;
  const totalPages = Math.ceil(total / pageSize);
  
  return {
    items: paginatedItems,
    total,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

export async function getContentBySlug(type: string, slug: string): Promise<ContentItem | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the content metadata section
    const matterResult = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // Combine the data with the slug and content
    return {
      slug,
      content: contentHtml,
      excerpt: matterResult.content.slice(0, 200) + '...',
      ...matterResult.data,
    } as ContentItem;
  } catch (error) {
    console.error(`Error reading content for ${type}/${slug}:`, error);
    return null;
  }
}

export async function getAllContentSlugs(type: string): Promise<string[]> {
  const directory = path.join(contentDirectory, type);
  try {
    const fileNames = fs.readdirSync(directory);
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error(`Error reading directory ${type}:`, error);
    return [];
  }
} 