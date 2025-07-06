import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Path to your local articles folder
const articlesDir = path.resolve(
  '/Users/mattbernier/projects/mbernier.com/mbernier.com/my-website/src/content/articles/'
);

console.log('Articles directory:', articlesDir);
console.log('Directory exists:', fs.existsSync(articlesDir));

// Escape strings for SQL
function sqlSafe(value: any): string {
  if (value === undefined || value === null) return 'NULL';
  if (Array.isArray(value)) {
    return `ARRAY[${value.map((v) => `'${v.replace(/'/g, "''")}'`).join(', ')}]`;
  }
  return `'${String(value).replace(/'/g, "''")}'`;
}

// Collect all .md files
function getMarkdownFiles(dir: string): string[] {
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(dir, file));
  
  console.log('Found markdown files:', files.length);
  return files;
}

// Build SQL insert statement
function buildInsertSQL(filePath: string): string {
  console.log('Processing file:', filePath);
  const file = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(file);
  const slug = path.basename(filePath, '.md');

  console.log('File data:', data);

  const columns = [
    'slug',
    'title',
    'date',
    'excerpt',
    'description',
    'categories',
    'tags',
    'image',
    'reading_time',
    'canonical_url',
  ];
  const isoDate = new Date(data.date).toISOString();
  const values = [
    slug,
    data.title,
    isoDate,
    data.excerpt,
    data.description,
    data.categories || [],
    data.tags || [],
    data.image || '',
    data.readingTime || null,
    data.canonical_url || '',
  ];

  const columnSQL = columns.join(', ');
  const valueSQL = values.map(sqlSafe).join(', ');

  return `INSERT INTO articles (${columnSQL}) VALUES (${valueSQL});`;
}

// Main
console.log('Starting script...');
const markdownFiles = getMarkdownFiles(articlesDir);
console.log('Markdown files:', markdownFiles);

if (markdownFiles.length === 0) {
  console.log('No markdown files found!');
  process.exit(1);
}

const inserts = markdownFiles.map(buildInsertSQL);

console.log('-- SQL insert statements for Supabase articles table');
console.log(inserts.join('\n'));
