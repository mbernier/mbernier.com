# ✅ mbernier.com Site Build Checklist (Updated)

## 🔧 Setup & Configuration
- [ ] Initialize Next.js App Router project
- [ ] Configure TailwindCSS with Inter font and custom theme
- [ ] Connect to Supabase with environment variables
- [ ] Set up Clerk authentication and roles
- [ ] Create Vercel `vercel.json` for subdomain routing
- [ ] Configure social OAuth for X, LinkedIn, IG, Bluesky, Mastodon

## 🧱 Database (Supabase SQL)
- [ ] `articles`
- [ ] `projects`
- [ ] `offers`
- [ ] `work_history`
- [ ] `testimonials`
- [ ] `contact_submissions`
- [ ] `notifications`
- [ ] `app_updates`
- [ ] `client_apps`
- [ ] `activity_items`
- [ ] `social_metrics`

## 🔐 Authentication & Permissions
- [ ] Clerk integration with Google OAuth
- [ ] Role support: `admin`, `editor`, `viewer`
- [ ] Restrict access to admin routes and actions by role

## 🌍 Site Structure
- [ ] `/` — homepage with rotating content
- [ ] `/articles` — index + detail view
- [ ] `/projects` — index + detail with "recent updates"
- [ ] `/services` — 2 lanes + sub-badges
- [ ] `/links` — affiliate/referral offers
- [ ] `/history` — visual timeline of work
- [ ] `/contact` — enhanced form with DB + read tracking
- [ ] `/activity` — public and admin feed

## ✍️ Content Authoring Tools
- [ ] Admin WYSIWYG editor with slash command support
- [ ] Article auto-tagging, image generation, summaries
- [ ] Related item suggestions with override option
- [ ] Media upload via Supabase Storage

## 📬 API & Webhooks
- [ ] `/api/articles`, `/api/projects`, etc.
- [ ] `/api/integrations/app-updates`
- [ ] Webhook receiver for app updates
- [ ] Outbound webhook support for 3rd parties
- [ ] LLMs.txt generator per https://llmspec.org/llms.txt
- [ ] Dynamic `robots.txt`, `sitemap.xml`

## 📊 Admin Dashboard Features
- [ ] Dashboard overview (contact form stats, latest updates)
- [ ] Notification inbox with read tracking via email pixel
- [ ] Social post history with analytics (platform, performance)
- [ ] Activity feed charting (posts/day, engagement by time)
- [ ] Client App key management: create, revoke, view purpose + permissions

## 📣 Social Media Posting
- [ ] Post to X, LinkedIn, IG, etc. with content formatting rules
- [ ] Fallback to client_app logo if update image not provided
- [ ] Track platform performance (likes, impressions, CTR)

## ✅ Testing & Deployment
- [ ] E2E Playwright tests (contact form, login, content flows)
- [ ] SEO + OpenGraph tags
- [ ] Mobile/responsive layout
- [ ] Lighthouse accessibility and performance
- [ ] Real data deployment to Vercel
