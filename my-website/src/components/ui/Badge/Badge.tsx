import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseClasses = [
    "inline-flex items-center font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  ].join(" ");

  const variantClasses = {
    default: [
      "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100",
      "border border-primary-200 dark:border-primary-700"
    ].join(" "),
    secondary: [
      "bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100",
      "border border-secondary-200 dark:border-secondary-700"
    ].join(" "),
    destructive: [
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      "border border-red-200 dark:border-red-700"
    ].join(" "),
    outline: [
      "text-foreground border border-border bg-transparent",
      "hover:bg-accent hover:text-accent-foreground"
    ].join(" "),
    success: [
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      "border border-green-200 dark:border-green-700"
    ].join(" "),
    warning: [
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      "border border-yellow-200 dark:border-yellow-700"
    ].join(" ")
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs rounded-full",
    md: "px-2.5 py-1 text-sm rounded-full",
    lg: "px-3 py-1.5 text-sm rounded-full"
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 