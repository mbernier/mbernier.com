import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
}

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = [
    "inline-flex items-center justify-center font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  ].join(" ");

  const variantClasses = {
    primary: [
      "bg-gradient-to-r from-primary-600 to-primary-700",
      "text-white hover:from-primary-700 hover:to-primary-800",
      "focus:ring-primary-500 shadow-sm hover:shadow-md"
    ].join(" "),
    secondary: [
      "bg-secondary-100 dark:bg-secondary-800",
      "text-secondary-900 dark:text-secondary-100",
      "hover:bg-secondary-200 dark:hover:bg-secondary-700",
      "focus:ring-secondary-500 border border-secondary-200 dark:border-secondary-700"
    ].join(" "),
    outline: [
      "border border-border bg-transparent",
      "text-foreground hover:bg-accent hover:text-accent-foreground",
      "focus:ring-primary-500"
    ].join(" "),
    ghost: [
      "bg-transparent text-foreground",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:ring-primary-500"
    ].join(" "),
    destructive: [
      "bg-gradient-to-r from-red-600 to-red-700",
      "text-white hover:from-red-700 hover:to-red-800",
      "focus:ring-red-500 shadow-sm hover:shadow-md"
    ].join(" ")
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
    md: "px-4 py-2 text-sm rounded-md gap-2",
    lg: "px-6 py-3 text-base rounded-lg gap-2"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-live={isLoading ? "polite" : undefined}
      {...props}
    >
      {isLoading && <Spinner aria-hidden="true" />}
      {children}
    </button>
  );
}; 