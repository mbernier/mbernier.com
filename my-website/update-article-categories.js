const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'src/content/articles');

// Define category mappings for each article
const articleCategories = {
  'your-wiki-entrypoints-suck.md': ['Knowledge Management', 'Productivity', 'Documentation'],
  '2025-05-19-disagree-and-commit.md': ['Leadership', 'Team Collaboration', 'Decision Making'],
  '2025-05-21-evolution-of-product-management.md': ['Product Management', 'Career Development'],
  'managing-squarespace.md': ['Website Management', 'Tutorials'],
  'change-your-gmail-address.md': ['Tutorials', 'Productivity'],
  'want-better-team-outcomes.md': ['Leadership', 'Team Collaboration'],
  'chaos-part-parcel-tech.md': ['Project Management', 'Tech Industry'],
  'making-jira-do-more.md': ['Project Management', 'Productivity', 'Tools'],
  'insane-reality-ai-programming.md': ['AI', 'Software Development', 'Tech Industry'],
  'agile-is-broken.md': ['Agile', 'Project Management'],
  'is-your-jira-ticket-hierarchy-helping.md': ['Project Management', 'Productivity', 'Tools'],
  'why-process-4-letter-word.md': ['Process Improvement', 'Team Collaboration'],
  'memorizing-every-detail.md': ['Productivity', 'Process Improvement'],
  'do-product-managers-even.md': ['Product Management', 'Team Collaboration'],
  'how-should-we-share-the-customer-feedback-and-trends-to-the-product-team.md': ['Product Management', 'Customer Feedback'],
  'how-can-we-collect-information-for-the-product-team-without-blowing-up-our-support-teams.md': ['Product Management', 'Customer Support'],
  'do-product-managers-and-engineers-even-care-what-support-teams-are-hearing-from-customers.md': ['Product Management', 'Customer Support', 'Engineering'],
  'bulk-adding-shopify-products-to-sales-channel.md': ['E-commerce', 'Tutorials', 'Shopify'],
  'how-to-hide-from-recruiters.md': ['Career Development', 'Job Search'],
  'what-the-hell-is-a-bitcoin.md': ['Cryptocurrency', 'Technology Explainers'],
  'double-developer-velocity-with-rice.md': ['Software Development', 'Productivity', 'Prioritization']
};

// Process each file
fs.readdirSync(contentDirectory).forEach(fileName => {
  const filePath = path.join(contentDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContent);
  
  // Skip if already has categories
  if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
    console.log(`${fileName} already has categories, skipping`);
    return;
  }
  
  // Get new categories from our mapping
  const newCategories = articleCategories[fileName] || ['Uncategorized'];
  
  // Remove old category if exists
  delete data.category;
  
  // Add new categories
  data.categories = newCategories;
  
  // Convert back to markdown with updated frontmatter
  const updatedContent = matter.stringify(content, data);
  
  // Write back to file
  fs.writeFileSync(filePath, updatedContent);
  
  console.log(`Updated categories for ${fileName}`);
});

console.log('All article categories have been updated.'); 