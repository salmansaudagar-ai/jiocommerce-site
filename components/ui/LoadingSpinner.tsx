import React from 'react';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeStyles = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-16 h-16 border-4',
};

export const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ size = 'md', color = '#635BFF', className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      <div
        className={`
          ${sizeStyles[size]}
          border-gray-200 dark:border-gray-700
          border-t-transparent
          rounded-full
          animate-spin
        `}
        style={{
          borderTopColor: color,
        }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
