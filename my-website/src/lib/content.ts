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
  sortDate?: string;
  excerpt: string;
  content: string;
  [key: string]: string | string[] | number | boolean | null | undefined;
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

// Function to strip markdown formatting from text
function stripMarkdown(text: string): string {
  // Remove headers (# Header)
  text = text.replace(/#{1,6}\s+([^\n]+)/g, '$1');
  
  // Remove bold/italic formatting
  text = text.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1');
  
  // Remove links [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove images ![alt](url)
  text = text.replace(/!\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove code blocks and inline code
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  
  // Remove blockquotes
  text = text.replace(/>\s+([^\n]+)/g, '$1');
  
  // Remove horizontal rules
  text = text.replace(/(\*{3,}|-{3,}|_{3,})/g, '');
  
  // Remove extra whitespace and normalize
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();
  
  return text;
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
      
      // For articles, verify they have a category
      if (type === 'articles' && !matterResult.data.categories) {
        throw new Error(`Article "${slug}" is missing required "categories" field.`);
      }
      
      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();
      
      // Strip markdown from content for the excerpt
      const plainTextContent = stripMarkdown(matterResult.content);
      const excerpt = plainTextContent.slice(0, 200) + '...';
      
      // Ensure date is properly formatted
      const itemDate = matterResult.data.date;
      if (itemDate && !(itemDate instanceof Date)) {
        // If date isn't a Date object already, convert it if needed
        if (typeof itemDate === 'string') {
          // If date contains "Present", use a far future year for sorting
          if (itemDate.includes('Present')) {
            matterResult.data.sortDate = '9999'; // Far future date to ensure it's sorted first
          }
          // For date ranges like "2018-2019", use the first year for sorting
          else if (itemDate.includes('-')) {
            const years = itemDate.split('-');
            if (years.length === 2 && !isNaN(parseInt(years[0])) && !isNaN(parseInt(years[1]))) {
              // Keep the original date string for display, but add a sortDate for sorting
              matterResult.data.sortDate = years[1] || years[0]; // Use end year or start year if no end
            } else {
              // Try to treat as a regular date
              const parsedDate = new Date(itemDate);
              if (!isNaN(parsedDate.getTime())) {
                matterResult.data.sortDate = parsedDate.getFullYear().toString();
              } else {
                matterResult.data.sortDate = '0'; // Fallback for invalid dates
              }
            }
          } else {
            // Try to parse as a regular date
            const parsedDate = new Date(itemDate);
            if (!isNaN(parsedDate.getTime())) {
              matterResult.data.sortDate = parsedDate.getFullYear().toString();
            } else {
              matterResult.data.sortDate = '0'; // Fallback for invalid dates
            }
          }
        }
      }
      
      // Combine the data with the slug and content
      return {
        slug,
        content: contentHtml,
        excerpt,
        ...matterResult.data,
      } as ContentItem;
    })
  );
  
  // Sort content by date using full date comparison (not just year)
  const sortedContent = allContent.sort((a, b) => {
    const getDateValue = (item: ContentItem) => {
      if (typeof item.date === 'string') {
        // Handle "Present" dates by using far future date
        if (item.date.toLowerCase().includes('present')) {
          return new Date('2099-12-31').getTime();
        }
        
        // For date ranges like "2018-2019", use the end year as Dec 31
        if (item.date.includes('-') && !item.date.includes('T')) {
          const years = item.date.split('-');
          if (years.length === 2 && !isNaN(parseInt(years[0])) && !isNaN(parseInt(years[1]))) {
            const endYear = years[1] || years[0];
            return new Date(`${endYear}-12-31`).getTime();
          }
        }
        
        // Try to parse as full date (ISO format, etc.)
        const parsedDate = new Date(item.date);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate.getTime();
        }
        
        // Fallback: if it's just a year, treat as Dec 31 of that year
        if (/^\d{4}$/.test(item.date)) {
          return new Date(`${item.date}-12-31`).getTime();
        }
      }
      
      return 0; // Fallback for invalid dates (will sort to bottom)
    };
    
    const dateA = getDateValue(a);
    const dateB = getDateValue(b);
    
    return dateB - dateA; // Sort descending (most recent first)
  });
  
  return sortedContent;
}

/**
 * Get paginated content from a specific directory
 * @param type Directory type (e.g., 'articles', 'projects')
 * @param page Current page number (1-indexed)
 * @param pageSize Number of items per page
 * @param category Optional category to filter by
 * @returns Paginated content with metadata
 */
export async function getPaginatedContent(
  type: string,
  page: number = 1,
  pageSize: number = 9,
  category?: string
): Promise<PaginatedContent> {
  const allContent = await getContentByDirectory(type);
  
  // Filter by category if provided
  const filteredContent = category 
    ? allContent.filter(item => {
        // Handle array of categories
        if (Array.isArray(item.categories)) {
          return item.categories.some(cat => 
            typeof cat === 'string' && 
            cat.trim().toLowerCase() === category.toLowerCase()
          );
        } 
        // Handle string categories, possibly with commas - for backward compatibility
        else if (typeof item.categories === 'string') {
          if (item.categories.includes(',')) {
            // Handle comma-separated categories
            const categories = item.categories.split(',').map(c => c.trim().toLowerCase());
            return categories.includes(category.toLowerCase());
          }
          return item.categories.trim().toLowerCase() === category.toLowerCase();
        }
        // Legacy support for old category field
        else if (typeof item.category === 'string') {
          if (item.category.includes(',')) {
            // Handle comma-separated categories
            const categories = item.category.split(',').map(c => c.trim().toLowerCase());
            return categories.includes(category.toLowerCase());
          }
          return item.category.trim().toLowerCase() === category.toLowerCase();
        }
        return false;
      })
    : allContent;
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filteredContent.slice(startIndex, endIndex);
  
  const total = filteredContent.length;
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

/**
 * Get all unique categories from a content directory
 * @param type Directory type (e.g., 'articles', 'projects')
 * @returns Array of unique categories
 */
export async function getUniqueCategories(type: string): Promise<string[]> {
  const allContent = await getContentByDirectory(type);
  
  // Extract all categories from content items
  const categoriesArray: string[] = [];
  
  allContent.forEach(item => {
    // Handle array of categories (new format)
    if (Array.isArray(item.categories)) {
      item.categories.forEach(cat => {
        if (typeof cat === 'string') {
          // Trim any whitespace that might exist
          categoriesArray.push(cat.trim());
        }
      });
    } 
    // Handle single categories as string (for backward compatibility)
    else if (typeof item.categories === 'string') {
      // Check if it contains commas (multiple categories as CSV)
      if (item.categories.includes(',')) {
        // Split by comma and add each category
        const cats = item.categories.split(',');
        cats.forEach(cat => categoriesArray.push(cat.trim()));
      } else {
        categoriesArray.push(item.categories.trim());
      }
    }
    // Legacy support for old category field
    else if (typeof item.category === 'string') {
      // Check if it contains commas (multiple categories as CSV)
      if (item.category.includes(',')) {
        // Split by comma and add each category
        const cats = item.category.split(',');
        cats.forEach(cat => categoriesArray.push(cat.trim()));
      } else {
        categoriesArray.push(item.category.trim());
      }
    }
  });
  
  // Return unique categories, sorted alphabetically
  return Array.from(new Set(categoriesArray)).sort();
} 