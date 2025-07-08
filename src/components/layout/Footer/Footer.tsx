import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-white border-t border-gray-200 mt-16', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Matt Bernier</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Fractional Product Management Leader, Developer, Writer, and Creator. I help companies build better products through strategic product management and technical expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/articles" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Articles</Link></li>
              <li><Link href="/projects" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Projects</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/articles" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Latest Articles</Link></li>
              <li><Link href="/projects" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Featured Projects</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Service Offerings</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a
                href="https://twitter.com/mattbernier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/mattbernier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/mattbernier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Follow on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@mbernier.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <Button size="sm" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Matt Bernier. Built with passion for great products and clean code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };