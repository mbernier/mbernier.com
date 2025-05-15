interface ToolsCTAProps {
  className?: string;
}

export default function ToolsCTA({ className = '' }: ToolsCTAProps) {
  return (
    <div className={`my-8 p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 ${className}`}>
      <h3 className="text-xl font-bold mb-2">Check Out My Favorite Tools</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Curious about the software I use for development, productivity, and content creation? 
        I&apos;ve compiled a list of my favorite tools that help me be more effective.
      </p>
      <a 
        href="https://links.mbernier.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Explore My Tools
      </a>
    </div>
  );
} 