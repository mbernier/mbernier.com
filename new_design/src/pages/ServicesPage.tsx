import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Rocket, Settings, CheckCircle, ArrowRight, Users, Target, Zap, Shield } from 'lucide-react';
import { services } from '../lib/data';

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you need part-time product leadership or expert technical guidance, 
            I offer flexible services designed to accelerate your goals without the overhead of full-time hires.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-24">
              <Card variant="elevated" className="overflow-hidden">
                <div className={`absolute inset-0 opacity-5 ${
                  index === 0 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-teal-500 to-teal-600'
                }`}></div>
                
                <div className="relative p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-xl ${
                          index === 0 ? 'bg-blue-100' : 'bg-teal-100'
                        }`}>
                          {index === 0 ? (
                            <Rocket className={`h-8 w-8 ${index === 0 ? 'text-blue-600' : 'text-teal-600'}`} />
                          ) : (
                            <Settings className={`h-8 w-8 ${index === 0 ? 'text-blue-600' : 'text-teal-600'}`} />
                          )}
                        </div>
                        {index === 0 && <Badge variant="primary">Most Popular</Badge>}
                      </div>

                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h2>
                      <h3 className="text-xl text-gray-700 font-semibold mb-6">{service.title}</h3>
                      
                      <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          What's Included
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                index === 0 ? 'bg-blue-500' : 'bg-teal-500'
                              }`}></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Target className="h-5 w-5 text-orange-500 mr-2" />
                          Key Benefits
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {service.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" variant={index === 0 ? 'primary' : 'secondary'} asChild>
                          <a href="/contact">Get Started</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <a href="/contact">Schedule a Call</a>
                        </Button>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Testimonial */}
                      {service.testimonial && (
                        <Card className="p-6 bg-white/80 backdrop-blur">
                          <blockquote className="text-gray-900 italic mb-4">
                            "{service.testimonial.quote}"
                          </blockquote>
                          <cite className="not-italic">
                            <div className="font-semibold text-gray-900">{service.testimonial.author}</div>
                            <div className="text-sm text-gray-600">
                              {service.testimonial.title}, {service.testimonial.company}
                            </div>
                          </cite>
                        </Card>
                      )}

                      {/* Quick Stats */}
                      <Card className="p-6 bg-white/80 backdrop-blur">
                        <h4 className="font-semibold text-gray-900 mb-4">Quick Facts</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-700">15+ years experience</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Zap className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-gray-700">Flexible engagement models</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">Proven track record</span>
                          </div>
                        </div>
                      </Card>

                      {/* Related Articles */}
                      <Card className="p-6 bg-white/80 backdrop-blur">
                        <h4 className="font-semibold text-gray-900 mb-4">Related Reading</h4>
                        <div className="space-y-3">
                          <a href="/articles" className="block text-sm text-blue-600 hover:text-blue-700">
                            → Product Strategy Fundamentals
                          </a>
                          <a href="/articles" className="block text-sm text-blue-600 hover:text-blue-700">
                            → Building High-Performance Teams
                          </a>
                          <a href="/articles" className="block text-sm text-blue-600 hover:text-blue-700">
                            → Technical Debt Management
                          </a>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Product?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Let's discuss your challenges and explore how my expertise can help you achieve your goals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="accent" asChild>
              <a href="/contact">Start the Conversation</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/credentialing">View My Background</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}