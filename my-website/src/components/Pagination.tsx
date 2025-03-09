import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }
  
  // Generate page links with a maximum of 5 page numbers showing
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max to show, display all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate the start and end of the page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add the middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className="flex justify-center mt-12" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {/* Previous page button */}
        <li>
          {currentPage > 1 ? (
            <Link 
              href={`${basePath}?page=${currentPage - 1}`}
              className="px-3 py-2 rounded text-sm font-medium bg-gray-200 text-gray-700 
                        hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 
                        dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous page"
            >
              &larr;
            </Link>
          ) : (
            <span 
              className="px-3 py-2 rounded 
                        text-sm font-medium bg-gray-100 text-gray-400 dark:bg-gray-800 
                        dark:text-gray-600 cursor-not-allowed"
              aria-disabled="true"
            >
              &larr;
            </span>
          )}
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
            ) : (
              <Link
                href={`${basePath}?page=${page}`}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors
                          ${currentPage === page 
                            ? 'bg-primary text-black dark:text-white font-bold' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                          }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}
        
        {/* Next page button */}
        <li>
          {currentPage < totalPages ? (
            <Link 
              href={`${basePath}?page=${currentPage + 1}`}
              className="px-3 py-2 rounded text-sm font-medium bg-gray-200 text-gray-700 
                        hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 
                        dark:hover:bg-gray-600 transition-colors"
              aria-label="Next page"
            >
              &rarr;
            </Link>
          ) : (
            <span 
              className="px-3 py-2 rounded 
                        text-sm font-medium bg-gray-100 text-gray-400 dark:bg-gray-800 
                        dark:text-gray-600 cursor-not-allowed"
              aria-disabled="true"
            >
              &rarr;
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
} 