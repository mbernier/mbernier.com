import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Coffee } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Coffee className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-600 font-medium">Available for new projects</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Hi, I'm <span className="text-blue-600">Matt Bernier</span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              <span className="font-semibold text-gray-900">Fractional Product Management & Technical Consulting</span> to turn ideas into outcomes. 
              I help startups and SMBs accelerate product development without the full-time overhead.
            </p>

            {/* Latest Update */}
            <div className="bg-white/70 backdrop-blur border border-gray-200 rounded-lg p-4 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Latest Article</p>
                  <h3 className="font-semibold text-gray-900 mb-2">Building Better Products Through Strategic Thinking</h3>
                  <p className="text-sm text-gray-600">5 min read • Product Management</p>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0 ml-4" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Hire Me</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                15+ years experience
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Technical & product expertise
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Flexible engagement
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-20 absolute -inset-4"></div>
              <Image 
                src="/matt.hat.jpg"
                alt="Matt Bernier"
                width={288}
                height={288}
                className="relative w-72 h-72 rounded-full object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 