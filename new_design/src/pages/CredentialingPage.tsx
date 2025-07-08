import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Building, Calendar, Award, Download, ExternalLink } from 'lucide-react';
import { workExperience } from '../lib/data';

export function CredentialingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience & Credentials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Over 15 years building products and leading teams across startups and enterprises. 
            Here's the journey that shaped my approach to product management and technical leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Story */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">My Professional Journey</CardTitle>
                <CardDescription className="text-base">
                  From developer to product leader – how I learned to bridge technical depth with strategic thinking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    I started my career as a software engineer, but quickly discovered my passion for the intersection 
                    of technology and business strategy. Over the past 15 years, I've had the privilege of working 
                    across the full spectrum – from early-stage startups burning through runway to Fortune 500 
                    companies with millions of users.
                  </p>
                  <p>
                    What sets me apart is my hands-on technical background combined with deep product management 
                    experience. I don't just understand what needs to be built – I understand how it gets built, 
                    what can go wrong, and how to navigate the inevitable tradeoffs between speed, quality, and scope.
                  </p>
                  <p>
                    This unique combination has made me particularly effective at fractional engagements, where I 
                    can quickly assess both the product strategy and technical implementation, identify bottlenecks, 
                    and get teams moving in the right direction without a lengthy onboarding process.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Work History Timeline */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl">Work History</CardTitle>
                <CardDescription className="text-base">
                  Key roles that shaped my expertise in product management and technical leadership
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-8">
                  {workExperience.map((experience, index) => (
                    <div key={experience.id} className="relative">
                      {/* Timeline line */}
                      {index < workExperience.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-24 bg-gray-200"></div>
                      )}
                      
                      <div className="flex gap-6">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{experience.role}</h3>
                              <p className="text-blue-600 font-medium">{experience.company}</p>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {experience.duration}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{experience.description}</p>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {experience.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Core Competencies</CardTitle>
                <CardDescription className="text-base">
                  The skills and expertise I bring to every engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Product Management</h4>
                    <div className="space-y-2">
                      {['Product Strategy & Roadmapping', 'User Research & Analytics', 'Go-to-Market Planning', 'Cross-functional Leadership'].map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technical</h4>
                    <div className="space-y-2">
                      {['Full-stack Development', 'System Architecture', 'AI/ML Integration', 'DevOps & Automation'].map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <CardTitle className="mb-4">Quick Stats</CardTitle>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-blue-700">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">20+</div>
                  <div className="text-sm text-green-700">Products Launched</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">$10M+</div>
                  <div className="text-sm text-orange-700">Funding Raised</div>
                </div>
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-6">
              <CardTitle className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-yellow-600" />
                Certifications
              </CardTitle>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Certified Scrum Master</p>
                  <p className="text-sm text-gray-600">Scrum Alliance</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">AWS Solutions Architect</p>
                  <p className="text-sm text-gray-600">Amazon Web Services</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Product Management</p>
                  <p className="text-sm text-gray-600">Product School</p>
                </div>
              </div>
            </Card>

            {/* Companies */}
            <Card className="p-6">
              <CardTitle className="mb-4">Notable Companies</CardTitle>
              <div className="grid grid-cols-2 gap-4">
                {/* Placeholder company logos */}
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">TechCorp</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">StartupXYZ</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">BigCorp</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">InnovateCo</span>
                </div>
              </div>
            </Card>

            {/* Resume Download */}
            <Card className="p-6">
              <CardTitle className="mb-4">Full Resume</CardTitle>
              <p className="text-sm text-gray-600 mb-4">
                Want the complete details? Download my full resume with detailed project descriptions and technical specifications.
              </p>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Resume
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View LinkedIn Profile
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            This experience has taught me how to quickly assess situations, identify opportunities, 
            and deliver results. Let's discuss how I can help accelerate your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="accent" asChild>
              <a href="/contact">Start a Conversation</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/services">Explore Services</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}