import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function generateFallbackImage(title: string): string {
  // Generate a simple gradient background with initials for projects without images
  const initials = title
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Create a more sophisticated fallback with gradients
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-teal-400 to-teal-600', 
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600'
  ];
  
  const gradient = gradients[title.length % gradients.length];
  
  // For now, return a placeholder service URL that we know works
  return `https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=240&fit=crop`;
}

export function getServiceIcon(serviceId: string): string {
  const icons = {
    'fractional-pm': '🚀',
    'technical-consulting': '⚙️'
  };
  return icons[serviceId as keyof typeof icons] || '💡';
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}