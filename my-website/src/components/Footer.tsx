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
              Developer, writer, and creator.
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
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link 
                    href="/privacy-policy" 
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms-of-service" 
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Terms of Service
                  </Link>
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