import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isCrossSite?: boolean;
  badge?: string;
  description?: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  variant?: "header" | "sidebar" | "footer";
  className?: string;
  currentPath?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  variant = "header",
  className,
  currentPath
}) => {
  const isActive = (href: string) => {
    if (!currentPath) return false;
    return currentPath === href || currentPath.startsWith(href + "/");
  };

  const renderLink = (item: NavigationItem) => {
    const isItemActive = isActive(item.href);
    
    const linkClasses = cn(
      "relative transition-all duration-200",
      variant === "header" && [
        "px-3 py-2 text-sm font-medium rounded-md",
        isItemActive
          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
          : "text-foreground hover:text-primary-600 dark:hover:text-primary-400 hover:bg-accent"
      ],
      variant === "sidebar" && [
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md",
        isItemActive
          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      ],
      variant === "footer" && [
        "text-sm text-muted-foreground hover:text-foreground",
        "underline-offset-4 hover:underline"
      ]
    );

    const LinkComponent = item.isExternal || item.isCrossSite ? "a" : Link;
    const linkProps = item.isExternal || item.isCrossSite 
      ? { 
          href: item.href,
          target: item.isExternal ? "_blank" : undefined,
          rel: item.isExternal ? "noopener noreferrer" : undefined
        }
      : { href: item.href };

    return (
      <LinkComponent
        key={item.href}
        {...linkProps}
        className={linkClasses}
      >
        <span className="flex items-center gap-2">
          {item.label}
          {item.badge && (
            <Badge variant="secondary" size="sm">
              {item.badge}
            </Badge>
          )}
          {item.isCrossSite && (
            <svg
              className="w-3 h-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
          {item.isExternal && (
            <svg
              className="w-3 h-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </span>
        {variant === "sidebar" && item.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {item.description}
          </p>
        )}
      </LinkComponent>
    );
  };

  const containerClasses = cn(
    variant === "header" && "flex items-center space-x-1",
    variant === "sidebar" && "flex flex-col space-y-1",
    variant === "footer" && "grid grid-cols-2 md:grid-cols-4 gap-4",
    className
  );

  return (
    <nav className={containerClasses}>
      {items.map(renderLink)}
    </nav>
  );
};

// Cross-site navigation configurations
export const mainSiteNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { 
    label: "Links", 
    href: "https://links.mbernier.com", 
    isCrossSite: true,
    description: "Affiliate links and recommendations"
  }
];

export const linksSiteNavigation: NavigationItem[] = [
  { label: "All Links", href: "/" },
  { label: "Tech", href: "/?category=tech" },
  { label: "Business", href: "/?category=business" },
  { label: "Lifestyle", href: "/?category=lifestyle" },
  { 
    label: "Main Site", 
    href: "https://mbernier.com", 
    isCrossSite: true,
    description: "Portfolio and articles"
  }
]; 