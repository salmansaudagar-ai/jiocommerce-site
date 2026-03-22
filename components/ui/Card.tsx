import React from 'react';

type CardVariant = 'border' | 'shadow' | 'none';
type CardPadding = 'sm' | 'md' | 'lg' | 'none';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  border: 'border border-gray-200 dark:border-gray-800',
  shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
  none: '',
};

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
  none: '',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'shadow',
      padding = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-lg
          bg-white dark:bg-gray-950
          transition-all
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
