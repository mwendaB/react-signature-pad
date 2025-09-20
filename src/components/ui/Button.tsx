import React from 'react';
import { cn } from '../../utils/classNames';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white border-brand-600 hover:border-brand-700 shadow-brand-200/50 dark:shadow-brand-900/50',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
  tertiary: 'bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-700 border-transparent hover:border-gray-200 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 shadow-red-200/50 dark:shadow-red-900/50',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-700 border-transparent dark:hover:bg-gray-800 dark:text-gray-400'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  children,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
        
        // Size variants
        buttonSizes[size],
        
        // Color variants
        buttonVariants[variant],
        
        // Disabled state
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        
        // Hover effects
        !isDisabled && 'hover:scale-[1.02] active:scale-[0.98] hover:shadow-md',
        
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={cn('mr-2', children ? '' : 'mr-0')}>{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={cn('ml-2', children ? '' : 'ml-0')}>{icon}</span>
      )}
    </button>
  );
};