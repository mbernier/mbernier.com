import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-graphite mb-6">
              Hi, I'm <span className="text-gradient">Matt Bernier</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Fractional Product Management Leader, Developer, writer, and creator. 
              I help companies build better products and solve complex technical challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Hire Me
              </Button>
              <Button variant="outline" size="lg">
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            How I Can Help
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-graphite">
                  Fractional Product Management
                </h3>
              </div>
              <div className="text-gray-600">
                <p className="mb-4">
                  Get senior product leadership without the full-time commitment. 
                  I help startups and growing companies build product strategy, 
                  execute roadmaps, and scale their teams.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Product strategy & roadmap planning</li>
                  <li>• Cross-functional team leadership</li>
                  <li>• OKR/KPI establishment and tracking</li>
                  <li>• Product-market fit optimization</li>
                </ul>
                <div className="mt-6">
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-graphite">
                  Technical Consulting
                </h3>
              </div>
              <div className="text-gray-600">
                <p className="mb-4">
                  Solve complex technical challenges with expert guidance. 
                  From architecture reviews to AI integration, I help teams 
                  build scalable, maintainable solutions.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Codebase audit & recommendations</li>
                  <li>• AI workflow integration</li>
                  <li>• Technical mentoring & workshops</li>
                  <li>• Performance optimization</li>
                </ul>
                <div className="mt-6">
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            Recent Work & Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-graphite">
                  Latest Article
                </h3>
              </div>
              <div className="text-gray-600">
                <p className="mb-4">
                  "Developer Experience is Product Strategy" - How focusing on 
                  developer experience drives business outcomes.
                </p>
                <a href="#" className="text-primary hover:underline">
                  Read more →
                </a>
              </div>
            </div>

            <div className="card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-graphite">
                  Featured Project
                </h3>
              </div>
              <div className="text-gray-600">
                <p className="mb-4">
                  AI-powered text processing pipeline that reduced manual work 
                  by 80% for a growing SaaS company.
                </p>
                <a href="#" className="text-primary hover:underline">
                  View project →
                </a>
              </div>
            </div>

            <div className="card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-graphite">
                  Get In Touch
                </h3>
              </div>
              <div className="text-gray-600">
                <p className="mb-4">
                  Ready to accelerate your product development or solve 
                  technical challenges? Let's discuss how I can help.
                </p>
                <Button variant="secondary" className="w-full">
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}