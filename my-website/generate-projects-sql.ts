import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const directoryPath = '/Users/mattbernier/projects/mbernier.com/mbernier.com/my-website/src/content/projects/';
const outputSQLPath = './insert-projects.sql';

function sanitize(value: any): string {
  if (value === undefined || value === null) return 'NULL';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  return `'${value.toString().replace(/'/g, "''")}'`;
}

function sanitizeArray(arr: any): string {
  if (!arr || !Array.isArray(arr)) return 'NULL';
  return `ARRAY[${arr.map((item) => sanitize(item)).join(', ')}]`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'NULL' : `'${date.toISOString()}'`;
}

const files = fs.readdirSync(directoryPath);
let sqlStatements: string[] = [];

files.forEach((filename) => {
  if (!filename.endsWith('.md')) return;

  const filePath = path.join(directoryPath, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  const slug = sanitize(filename.replace('.md', ''));
  const title = sanitize(data.title);
  const url = sanitize(data.links?.[0]?.url || data.liveUrl);
  const description = sanitize(data.description);
  const features = sanitizeArray(data.features);
  const image = sanitize(data.image);
  const showOnOffersPage = data.show_on_offers_page || false;
  const created_at = data.date ? formatDate(data.date) : 'NOW()';

  const sql = `INSERT INTO projects (slug, title, url, description, features, image, show_on_offers_page, created_at)
VALUES (${slug}, ${title}, ${url}, ${description}, ${features}, ${image}, ${showOnOffersPage}, ${created_at});`;

  sqlStatements.push(sql);
});

fs.writeFileSync(outputSQLPath, sqlStatements.join('\n') + '\n');
console.log(`✅ SQL insert statements written to ${outputSQLPath}`);
