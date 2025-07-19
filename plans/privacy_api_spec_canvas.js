// =====================
// Privacy Policy API Endpoint Spec for mbernier.com
// =====================

/**
 * Endpoint: /api/privacy
 * Method: GET
 * Framework: Next.js (API Route)
 * Purpose: Serve a canonical privacy policy for Bernier LLC and allow light customization via query params.
 * Use Case: Other apps (e.g. formexpert.co, vibeapp.studio, etc.) can fetch the base policy or app-specific variants.
 */

// =====================
// Query Parameters (all optional)
// =====================

// ?app=formexpert       // Used to include app-specific details or footers
// ?format=json|html     // Format of response; default is HTML
// ?lang=en|es|fr        // Language override (future expansion)

// =====================
// Example Request
// =====================
// fetch('https://mbernier.com/api/privacy?app=formexpert&format=json')

// =====================
// Data Sources
// =====================
// - Base Policy stored as Markdown or JSON file in /data/privacy-policy.md or .json
// - Optional app-specific clauses in /data/privacy/{app}.md or .json

// =====================
// Plan to Implement
// =====================

/**
 * Phase 1: MVP Endpoint
 * - Read base policy from /data/privacy-policy.md
 * - Render as HTML or JSON using a Markdown parser (e.g., remark, gray-matter)
 * - Support `app` query param to inject basic footer note (e.g., "This version is adapted for formexpert.co")
 * - Support `format=json` or `format=html`
 *
 * Phase 2: App-Specific Merge
 * - Add folder /data/privacy/{app}.md for app-specific content (e.g., changes to tracking, user types)
 * - Merge base + app override
 * - Optional: define override syntax or frontmatter blocks
 *
 * Phase 3: Multi-language Support
 * - Add lang param: ?lang=en|es|fr (default: en)
 * - Store translations under /data/privacy-policy.{lang}.md
 *
 * Phase 4: Caching + Headers
 * - Set long TTL for base policy (immutable unless you publish a new one)
 * - Add cache-control headers
 * - Support ETag or last-modified
 *
 * Phase 5: Optional CMS Backend
 * - Link to CMS for editable sections (markdown-based headless CMS)
 */

// =====================
// File Structure Example
// =====================

/**
 * /pages/api/privacy.ts
 * /data/privacy-policy.md
 * /data/privacy-policy.json
 * /data/privacy/formexpert.md
 * /data/privacy/vibeapp.md
 * /data/privacy-shopify.md
 */

// =====================
// Next.js API Boilerplate Stub
// =====================

export default async function handler(req, res) {
  const { app, format = 'html', lang = 'en' } = req.query;
  const basePath = `./data/privacy-policy.${lang}.md`;
  const appPath = app ? `./data/privacy/${app}.md` : null;

  let baseContent = fs.readFileSync(basePath, 'utf8');
  let appContent = appPath && fs.existsSync(appPath) ? fs.readFileSync(appPath, 'utf8') : '';

  let finalContent = baseContent + (appContent ? `\n\n---\n\n**App-Specific Info:**\n\n${appContent}` : '');

  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ content: finalContent });
  } else {
    res.setHeader('Content-Type', 'text/html');
    const html = markdownToHtml(finalContent); // e.g. use remark or similar
    return res.status(200).send(html);
  }
}
