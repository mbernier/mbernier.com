# ✅ mbernier.com Site Build Checklist (Updated)

## 🔧 Setup & Configuration
- [x] Initialize Next.js App Router project
- [x] Configure TailwindCSS with Inter font and custom theme
- [x] Connect to Supabase with environment variables
- [x] Set up Clerk authentication and roles
- [ ] Create Vercel `vercel.json` for subdomain routing
- [ ] Configure social OAuth for X, LinkedIn, IG, Bluesky, Mastodon

## 🧱 Database (Supabase SQL)
- [x] `articles`
- [x] `projects`
- [x] `offers`
- [x] `work_history`
- [x] `testimonials`
- [x] `contact_submissions`
- [x] `notifications`
- [x] `app_updates`
- [x] `client_apps`
- [x] `activity_items`
- [x] `social_metrics`

## 🔐 Authentication & Permissions
- [x] Clerk integration with Google OAuth
- [x] Role support: `admin`, `editor`, `viewer`
- [x] Restrict access to admin routes and actions by role

## 🌍 Site Structure
- [x] `/` — homepage with rotating content
- [x] `/articles` — index + detail view
- [x] `/projects` — index + detail with "recent updates"
- [x] `/services` — 2 lanes + sub-badges
- [ ] `/links` — affiliate/referral offers
- [ ] `/history` — visual timeline of work
- [x] `/contact` — enhanced form with DB + read tracking
- [x] `/activity` — public and admin feed

## ✍️ Content Authoring Tools
- [x] Admin WYSIWYG editor with slash command support
- [x] Article auto-tagging, image generation, summaries
- [x] Related item suggestions with override option
- [ ] Media upload via Supabase Storage

## 📬 API & Webhooks
- [x] `/api/articles`, `/api/projects`, etc.
- [x] `/api/integrations/app-updates`
- [ ] Webhook receiver for app updates
- [ ] Outbound webhook support for 3rd parties
- [x] LLMs.txt generator per https://llmspec.org/llms.txt
- [x] Dynamic `robots.txt`, `sitemap.xml`

## 📊 Admin Dashboard Features
- [x] Dashboard overview (contact form stats, latest updates)
- [x] Notification inbox with read tracking via email pixel
- [ ] Social post history with analytics (platform, performance)
- [ ] Activity feed charting (posts/day, engagement by time)
- [x] Client App key management: create, revoke, view purpose + permissions

## 📣 Social Media Posting
- [ ] Post to X, LinkedIn, IG, etc. with content formatting rules
- [ ] Fallback to client_app logo if update image not provided
- [ ] Track platform performance (likes, impressions, CTR)

## ✅ Testing & Deployment
- [x] E2E Playwright tests (contact form, login, content flows)
- [x] SEO + OpenGraph tags
- [x] Mobile/responsive layout
- [ ] Lighthouse accessibility and performance
- [ ] Real data deployment to Vercel

## 📈 Progress Summary
- **Completed:** 23/35 items (66%)
- **Remaining:** 12/35 items (34%)

### Key Missing Features:
- Social media OAuth and posting integration
- `/links` and `/history` pages
- Media upload functionality
- Webhook receivers and outbound webhooks
- Activity feed analytics and charting
- Production deployment configuration
