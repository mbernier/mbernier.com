import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Matt Bernier
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Fractional Product Management Leader, Developer, writer, and creator.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link 
                    href="/articles" 
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/projects" 
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://links.mbernier.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Tools
                  </a>
                </li>
                <li>
                  <Link 
                    href="/resume" 
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Contact
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <a 
                    href="https://linkedin.com/in/mkbernier" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    <svg 
                      className="h-5 w-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    &nbsp;LinkedIn
                  </a>
                </li>
                <li className="text-sm text-gray-500 dark:text-gray-400">
                  mkbernier@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Matt Bernier. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
} 