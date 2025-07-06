import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "default" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({ 
  variant = "primary", 
  size = "default", 
  className = "", 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-700 shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-white hover:bg-secondary-600 shadow-md hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    sm: "h-9 px-4 py-2 text-sm",
    default: "h-12 px-6 py-3 text-sm",
    lg: "h-14 px-8 py-4 text-base",
    icon: "h-10 w-10",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}