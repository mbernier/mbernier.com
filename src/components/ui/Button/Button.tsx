import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg',
        secondary:
          'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-lg',
        outline:
          'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-lg',
        ghost:
          'text-primary-500 hover:bg-primary-50 hover:text-primary-600',
        link:
          'text-primary-500 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        default: 'h-10 px-6 py-2',
        lg: 'h-12 px-8 py-3',
        xl: 'h-14 px-10 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      if (!React.isValidElement(children)) {
        throw new Error('Button with asChild must have a single valid React element as children');
      }
      
      return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        className: cn(buttonVariants({ variant, size, className })),
        ...props,
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };