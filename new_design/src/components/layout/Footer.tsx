import React from 'react';
import { Button } from '../ui/Button';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Matt Bernier</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fractional Product Management Leader, Developer, Writer, and Creator
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/articles" className="text-gray-600 hover:text-gray-900 text-sm">Articles</a></li>
              <li><a href="/projects" className="text-gray-600 hover:text-gray-900 text-sm">Projects</a></li>
              <li><a href="/services" className="text-gray-600 hover:text-gray-900 text-sm">Services</a></li>
              <li><a href="/links" className="text-gray-600 hover:text-gray-900 text-sm">Resources</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="/credentialing" className="text-gray-600 hover:text-gray-900 text-sm">Experience & Credentials</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:hello@mbernier.com" className="text-gray-400 hover:text-gray-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <Button size="sm" asChild>
              <a href="/contact">Get In Touch</a>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Matt Bernier. Built with passion for great products and clean code.
          </p>
        </div>
      </div>
    </footer>
  );
}