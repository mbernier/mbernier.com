import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Matt Bernier',
  description: 'Professional services offered by Matt Bernier, including product management, project leadership, developer experience, and AI integration.',
};

export default function ServicesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-foreground">How I Can Help You</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          With over 15 years of experience in product management, engineering leadership, and software development,
          I offer specialized services to help organizations optimize their product strategy and engineering operations.
        </p>
      </div>

      {/* Work Arrangements */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-10 text-center text-foreground">Working Arrangements</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Service Category 1: Product Leadership */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Contract Based</h3>
              <p className="text-muted-foreground mb-4">
                Engage my services for specific projects with defined scope and deliverables.
                Perfect for targeted initiatives or specialized needs.
              </p>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Fractional Leadership</h3>
              <p className="text-muted-foreground mb-4">
                Get executive-level expertise without the full-time commitment. Ideal for growing companies
                needing experienced leadership on a part-time basis.
              </p>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Full-Time Roles</h3>
              <p className="text-muted-foreground mb-4">
                For organizations seeking dedicated leadership and expertise, I&apos;m open to full-time
                opportunities that align with my skills and experience.
              </p>
          </div>
        </div>
      </div>

      {/* Service Categories Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-10 text-center text-foreground">Professional Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Service Category 1: Product Leadership */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Product Leadership</h3>
            <p className="text-muted-foreground mb-4">
              Strategic guidance to define, validate, and deliver successful products that meet market needs.
            </p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
              <li>Product Management</li>
              <li>Product Strategy Consulting</li>
              <li>Product Market Fit Analysis</li>
              <li>Fractional CPO Services</li>
              <li>Product Operations</li>
            </ul>
          </div>
        </div>

        {/* Service Category 2: Project Excellence */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Project Excellence</h3>
            <p className="text-muted-foreground mb-4">
              Effective planning, execution, and delivery of projects that meet objectives and drive results.
            </p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
              <li>Project Management</li>
              <li>Project & Product Coaching</li>
              <li>RICE Framework Workshops</li>
              <li>Operational Analysis</li>
              <li>Process Optimization</li>
            </ul>
          </div>
        </div>

        {/* Service Category 3: Engineering Excellence */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Engineering Excellence</h3>
            <p className="text-muted-foreground mb-4">
              Optimize your engineering operations and developer experience to build better products, faster.
            </p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
              <li>Engineering Operations</li>
              <li>Developer Experience Audit</li>
              <li>Python Development Projects</li>
              <li>AI Workflow Integration</li>
              <li>Technical Process Consulting</li>
            </ul>
          </div>
        </div>

        {/* Service Category 4: Education & Knowledge Sharing */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Education & Knowledge Sharing</h3>
            <p className="text-muted-foreground mb-4">
              Transfer knowledge and build capabilities within your organization through engaging sessions.
            </p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
              <li>Public Speaking</li>
              <li>Product Management Workshops</li>
              <li>Project Leadership Training</li>
              <li>RICE Framework Implementation</li>
              <li>Team Capability Building</li>
            </ul>
          </div>
        </div>

        {/* Service Category 5: Strategic Analysis */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Strategic Analysis</h3>
            <p className="text-muted-foreground mb-4">
              In-depth assessment of your current operations to identify opportunities for improvement.
            </p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
              <li>Product & Engineering Audits</li>
              <li>Operational Efficiency Analysis</li>
              <li>Workflow Optimization</li>
              <li>Technology Stack Assessment</li>
              <li>Product-Market Alignment</li>
            </ul>
          </div>
        </div>

        {/* Service Category 6: Fractional Leadership */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all hover:shadow-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Fractional CPO Services</h3>
            <p className="text-muted-foreground mb-4">
              Executive-level product leadership without the full-time commitment or cost.
            </p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
              <li>Product Vision & Strategy</li>
              <li>Product Team Mentorship</li>
              <li>Roadmap Development</li>
              <li>Customer Insight Generation</li>
              <li>Product Portfolio Management</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How I Work Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">How I Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discovery</h3>
            <p className="text-gray-400 dark:text-gray-400">
              We start with a detailed consultation to understand your specific needs, goals, and constraints.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Solution Design</h3>
            <p className="text-gray-400 dark:text-gray-400">
              I develop a tailored approach with clear deliverables, timelines, and regular checkpoints.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Execution & Support</h3>
            <p className="text-gray-400 dark:text-gray-400">
              I deliver high-quality solutions with thorough documentation and ongoing support as needed.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-400 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Let&apos;s discuss how I can help you achieve your product and technology goals. Reach out for a free consultation.
        </p>
        <a 
          href="mailto:mkbernier@gmail.com" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Contact Me
        </a>
      </div>

      {/* Testimonials Section - Optional */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold">Jane Smith</h4>
                <p className="text-sm text-gray-400 dark:text-gray-400">CEO, Tech Solutions Inc.</p>
              </div>
            </div>
            <p className="italic text-gray-400 dark:text-gray-400">
              &quot;Matt&apos;s strategic approach to product management transformed how we prioritize features and engage with customers. His leadership helped us achieve product-market fit faster than we thought possible.&quot;
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold">John Doe</h4>
                <p className="text-sm text-gray-400 dark:text-gray-400">CTO, Digital Innovations</p>
              </div>
            </div>
            <p className="italic text-gray-400 dark:text-gray-400">
              &quot;Working with Matt as our fractional CPO gave us executive-level product leadership without the full-time commitment. His expertise in both product strategy and engineering operations created a seamless alignment between our teams.&quot;
            </p>
          </div>
        </div>
      </div> */}
    </main>
  );
} 