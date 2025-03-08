# mbernier.com
My personal website

## Code Structure
my-website/
├── public/                   # Static assets (images, favicon, etc.)
│   ├── profile.jpg           # Your profile image for the homepage
│   ├── logo.png              # Website logo (optional)
│   └── ...                   # Other static files
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Navigation bar component
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Layout.tsx        # Layout wrapper component
│   │   └── ...               # Other UI components
│   ├── pages/                # Next.js pages
│   │   ├── index.tsx         # Homepage
│   │   ├── resume.tsx        # Resume page
│   │   ├── projects.tsx      # Projects list page
│   │   ├── content.tsx       # Blog/articles list page
│   │   ├── contact.tsx       # Contact page (LinkedIn, GitHub)
│   │   ├── [slug].tsx        # Dynamic route for blog posts
│   │   ├── projects/         # Dynamic routes for projects
│   │   │   ├── [project].tsx # Individual project page
│   │   └── work/             # Dynamic routes for work experience
│   │       ├── [job].tsx     # Individual job page
│   ├── styles/               # Global and component-specific styles
│   │   ├── globals.css       # Global CSS styles
│   │   ├── tailwind.css      # Tailwind styles
│   ├── lib/                  # Utility functions
│   │   ├── markdown.ts       # Markdown parser setup (MDX/Remark)
│   │   ├── metadata.ts       # Helper for frontmatter metadata
│   ├── content/              # Markdown content storage
│   │   ├── articles/         # Markdown files for articles
│   │   │   ├── example.md    # Sample blog post
│   │   ├── projects/         # Markdown files for projects
│   │   │   ├── example.md    # Sample project description
│   │   ├── work/             # Markdown files for work experience
│   │   │   ├── example.md    # Sample job description
|   |   ├── templates/        # Templates 
├── .gitignore                # Git ignore file
├── next.config.js            # Next.js configuration file
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation