import { Button } from "@/components/ui/Button";

export default function ArticlesPage() {
  // Sample articles data - in real implementation, this would come from database
  const articles = [
    {
      id: "1",
      title: "Developer Experience is Product Strategy",
      excerpt: "How focusing on developer experience drives business outcomes and accelerates product development cycles.",
      category: "Product Management",
      tags: ["DX", "Product Strategy", "Developer Tools"],
      readingTime: "7 min read",
      publishedAt: "2025-07-07",
      featured: true
    },
    {
      id: "2",
      title: "API Pricing is Developer Experience",
      excerpt: "Why your API pricing model is actually a UX decision that can make or break developer adoption.",
      category: "Product Strategy",
      tags: ["API", "Pricing", "Developer Experience"],
      readingTime: "5 min read",
      publishedAt: "2025-07-09"
    },
    {
      id: "3",
      title: "Procurement Developer Experience",
      excerpt: "Breaking down the barriers between enterprise procurement and developer workflows.",
      category: "Developer Experience",
      tags: ["Enterprise", "Procurement", "B2B"],
      readingTime: "6 min read",
      publishedAt: "2025-07-11"
    },
    {
      id: "4",
      title: "Disagree and Commit",
      excerpt: "The art of disagreeing constructively and committing to team decisions, even when you're not fully convinced.",
      category: "Leadership",
      tags: ["Team Management", "Communication", "Decision Making"],
      readingTime: "4 min read",
      publishedAt: "2025-05-19"
    },
    {
      id: "5",
      title: "Evolution of Product Management",
      excerpt: "How the product management discipline has evolved and where it's heading in the age of AI and automation.",
      category: "Product Management",
      tags: ["Product Management", "Career", "Industry Trends"],
      readingTime: "8 min read",
      publishedAt: "2025-05-21"
    },
    {
      id: "6",
      title: "Customer Experience & Loyalty",
      excerpt: "Building lasting customer relationships through exceptional experiences and value-driven interactions.",
      category: "Customer Experience",
      tags: ["CX", "Retention", "Customer Success"],
      readingTime: "5 min read",
      publishedAt: "2025-06-02"
    }
  ];

  const categories = ["All", "Product Management", "Developer Experience", "Leadership", "Product Strategy", "Customer Experience"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
              <span className="text-gradient">Thoughts, Ideas & Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Deep dives into product management, developer experience, and building better software. 
              Practical insights from 15+ years in the trenches.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === "All" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {articles.map((article) => (
              <article key={article.id} className={`card group cursor-pointer transition-all duration-200 hover:scale-[1.02] ${article.featured ? 'ring-2 ring-primary ring-opacity-20' : ''}`}>
                {article.featured && (
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">Featured</span>
                  </div>
                )}
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag-pill">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article.readingTime}
                    </span>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>

                <h2 className="text-xl font-semibold text-graphite mb-3 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium text-sm group-hover:underline">
                    Read Article →
                  </span>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-xs">
                      {Math.floor(Math.random() * 500 + 100)} views
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More / Pagination */}
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-graphite">
              Need Help Implementing These Ideas?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Reading about best practices is one thing. Having an expert guide you through implementation is another. 
              Let's turn insights into outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Discuss Fractional PM
              </Button>
              <Button variant="secondary" size="lg">
                Technical Consulting
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Interested in a specific topic? All articles link back to relevant services.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Stay Updated
            </h2>
            <p className="text-primary-100 mb-8">
              Get new articles and insights delivered directly to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none"
              />
              <Button variant="secondary" size="default">
                Subscribe
              </Button>
            </div>
            <p className="text-primary-200 text-sm mt-4">
              Join 500+ product leaders and developers
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}