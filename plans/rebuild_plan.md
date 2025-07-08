// mbernier.com Full Migration & Dynamic Site Build Plan (Supabase + Clerk + Vercel)

// ------------------------
// ENV CONFIG (.env.local for Supabase + Clerk + Social Auth)
// ------------------------
// SUPABASE_PROJECT_URL=https://your-project.supabase.co
// SUPABASE_ANON_PUBLIC_KEY=your-anon-public-key
// SUPABASE_SERVICE_ROLE=your-service-role-key
// SUPABASE_DATABASE_PASSWORD=your-db-password
// SUPABASE_API_KEY=your-api-key
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
// CLERK_SECRET_KEY=sk_test_...
// LINKEDIN_CLIENT_ID=...
// LINKEDIN_CLIENT_SECRET=...
// X_CLIENT_ID=...
// X_CLIENT_SECRET=...
// IG_CLIENT_ID=...
// IG_CLIENT_SECRET=...
// BLUESKY_CLIENT_ID=...
// BLUESKY_CLIENT_SECRET=...
// MASTODON_CLIENT_ID=...
// MASTODON_CLIENT_SECRET=...

// ------------------------
// API KEY + CLIENT APP MANAGEMENT
// ------------------------
CREATE TABLE client_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  default_logo TEXT,
  permissions TEXT[], -- e.g., ['create_update', 'project_post']
  purposes TEXT[],    -- list of declared usage cases
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// ------------------------
// CLERK PERMISSIONS (SUGGESTED ROLES)
// ------------------------
// - admin: full access to edit/create/delete content, users, settings
// - editor: can edit articles/projects/testimonials/updates
// - viewer: read-only UI access (activity tracking, stats)
// Integrate with Clerk metadata, and enforce permissions in UI/API layer.

// ------------------------
// ACTIVITY FEED + SOCIAL IMPACT TRACKING
// ------------------------
CREATE TABLE activity_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,  -- article, project, app_update, offer
  item_id UUID NOT NULL,
  source_url TEXT,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activity_items(id),
  platform TEXT, -- linkedin, x, ig
  impressions INT,
  likes INT,
  shares INT,
  comments INT,
  post_time TIMESTAMP,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Admin Activity Page should include charting of:
// - post volume
// - avg engagement by platform, time of day, day of week

// ------------------------
// IMAGE UPLOAD STRATEGY
// ------------------------
// Use Supabase storage for all uploads
// Use Supabase official JS libraries for upload + URL gen

// ------------------------
// LLMs.txt GENERATOR
// ------------------------
// Checklist item: implement https://llmspec.org/llms.txt spec with dynamic endpoint

// ------------------------
// CURSOR BACKGROUND AGENT BUILD PLAN (UPDATED)
// ------------------------
1. Setup file structure
2. Install Tailwind config + Inter font + color tokens
3. Add Supabase + Prisma schema (Articles, Projects, Work, Offers, Testimonials, AppUpdates, ClientApps, ActivityItems, SocialMetrics)
4. Clerk + Supabase client + middleware
5. API routes for Articles, Projects, Offers, Testimonials, Contacts, Activity Feed, App Updates, Client Apps
6. Admin UI (Clerk protected w/ role support)
7. Services landing page with 2 lanes and badges
8. History page (/history): logo timeline, expandable cards
9. Hero section with rotating content
10. App update webhook endpoint + logo fallback logic
11. Auto-post to social media with appropriate format per channel
12. Related article modal + slash command support in WYSIWYG
13. Contact DB + notification UI with read-tracking
14. Image gen for article headers
15. AI tagging/linking/summarization
16. Webhook emitter/receiver
17. Sitemap.xml, robots.txt, LLMs.txt dynamic
18. Activity feed w/ performance metrics dashboard
19. Final deploy with live-data testing, analytics, OG checks

// ------------------------
// CONTENT MIGRATION NOTE
// ------------------------
// ⛔ DO NOT migrate existing markdown
// ✅ All content will already be in Supabase before development begins
// ✅ Schema will be provided

// ------------------------
// TESTING REQUIREMENTS
// ------------------------
// ✅ End-to-end tests only — real database, real API, real components
// ✅ No mocks — verify full working product

// This is your complete, production-grade blueprint for mbernier.com with full business command center support.
