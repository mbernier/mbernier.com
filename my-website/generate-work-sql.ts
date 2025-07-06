import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const directoryPath = '/Users/mattbernier/projects/mbernier.com/mbernier.com/my-website/src/content/work/';
const outputSQLPath = './insert-work-history.sql';

function sanitize(value: any): string {
  if (value === undefined || value === null) return 'NULL';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  return `'${value.toString().replace(/'/g, "''")}'`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'NOW()' : `'${date.toISOString()}'`;
}

const files = fs.readdirSync(directoryPath);
let sqlStatements: string[] = [];

files.forEach((filename) => {
  if (!filename.endsWith('.md')) return;

  const filePath = path.join(directoryPath, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  const company_name = sanitize(data.company || data.company_name || data.title);
  const logo = sanitize(data.header_image || data.image);
  const externalUrl = Array.isArray(data.external_links) && data.external_links.length > 0 ? data.external_links[0].url : null;
  const description = sanitize(data.description || data.summary || data.excerpt);
  const show_on_site = data.show_on_site === false ? 'FALSE' : 'TRUE';
  const created_at = data.date ? formatDate(data.date) : 'NOW()';
  const start_date = data.start_date ? formatDate(data.start_date) : 'NULL';
  const end_date = data.end_date ? formatDate(data.end_date) : 'NULL';

  const sql = `INSERT INTO work_history (company_name, logo, url, description, show_on_site, created_at, start_date, end_date)
VALUES (${company_name}, ${logo}, ${externalUrl}, ${description}, ${show_on_site}, ${created_at}, ${start_date}, ${end_date});`;

  sqlStatements.push(sql);
});

fs.writeFileSync(outputSQLPath, sqlStatements.join('\n') + '\n');
console.log(`✅ SQL insert statements written to ${outputSQLPath}`);
