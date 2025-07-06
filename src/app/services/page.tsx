import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
              How I Can <span className="text-gradient">Help You</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you need part-time leadership of your product strategy or expert help solving technical challenges, 
              I offer flexible services designed to accelerate your business growth.
            </p>
            <Button variant="primary" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Two Service Lanes */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Fractional Product Management */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary">Fractional Product Management</h2>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-graphite mb-3">The Challenge</h3>
                <p className="text-gray-600">
                  Startups and SMBs need senior product leadership but can't afford a full-time CPO or wait months to find the perfect hire. 
                  Your product strategy stalls, features ship without clear direction, and teams work in silos.
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-graphite mb-3">The Solution</h3>
                <p className="text-gray-600">
                  I offer fractional product management – stepping in part-time to drive product strategy, roadmap execution, 
                  and team alignment as your on-demand CPO. You get the expertise when you need it, how you need it.
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-graphite mb-3">What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Product strategy & roadmap planning that aligns with business goals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Cross-functional team leadership and process optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">OKR/KPI establishment and tracking for measurable outcomes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Product-market fit optimization and customer feedback loops</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="bg-white rounded-xl p-4 mb-6">
                <p className="text-primary font-semibold">
                  "Take your product from vision to market fit without hiring a full-time exec or waiting months for results."
                </p>
              </div>

              <Button variant="primary" className="w-full">
                Discuss Fractional PM
              </Button>
            </div>

            {/* Technical Consulting */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-secondary">Technical Consulting</h2>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-graphite mb-3">The Challenge</h3>
                <p className="text-gray-600">
                  Complex technical roadblocks slow your progress. Legacy systems need modernization. Your team lacks expertise 
                  in AI, automation, or scaling. Every delay costs money and momentum.
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-graphite mb-3">The Solution</h3>
                <p className="text-gray-600">
                  I provide hands-on technical consulting – from architecture guidance to AI workflow integration. 
                  Get expert solutions that solve problems quickly and teach your team best practices along the way.
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-graphite mb-3">What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Comprehensive codebase audit – identify issues before they become costly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">AI workflow integration that automates manual processes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Technical mentoring and workshops to upskill your team</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Performance optimization and scalability planning</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="bg-white rounded-xl p-4 mb-6">
                <p className="text-secondary font-semibold">
                  "Eliminate bottlenecks and accelerate development with expert guidance that delivers results fast."
                </p>
              </div>

              <Button variant="secondary" className="w-full">
                Discuss Technical Consulting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-graphite">
            What Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Matt quickly identified issues we hadn't seen and helped our team double our release pace. 
                  His fractional approach gave us exactly the leadership we needed without the overhead."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-graphite">Sarah Chen</p>
                  <p className="text-gray-500">CTO, TechFlow Solutions</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The AI automation Matt implemented saved us 80% of manual work. What used to take days now happens automatically. 
                  ROI was immediate and obvious."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-graphite">Michael Rodriguez</p>
                  <p className="text-gray-500">CEO, DataStream Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-graphite">
              Why Work with Me?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-graphite">15+ Years Experience</h3>
                <p className="text-gray-600">
                  Deep expertise across product management, engineering, and business strategy from startup to enterprise.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-graphite">Technical & Product Expertise</h3>
                <p className="text-gray-600">
                  Unique blend of hands-on coding skills and product strategy – I understand both the what and the how.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-graphite">Flexible Engagement</h3>
                <p className="text-gray-600">
                  Whether you need ongoing fractional support or project-based consulting, we'll find the right fit for your needs.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              <span className="font-semibold text-graphite">Typically responds within 1 business day.</span> 
              Let's discuss how I can help accelerate your product development and solve your technical challenges.
            </p>
            <Button variant="primary" size="lg">
              Contact Matt Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}