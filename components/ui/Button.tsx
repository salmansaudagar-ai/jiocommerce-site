import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'text-white hover:bg-opacity-90 active:bg-opacity-80 transition-all',
  secondary:
    'border-2 hover:bg-opacity-10 transition-all',
  ghost:
    'hover:bg-opacity-10 transition-all',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-all',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-jio-purple text-white',
  secondary: 'border-jio-purple text-jio-purple',
  ghost: 'text-jio-purple',
  danger: '',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          font-medium
          inline-flex items-center justify-center
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${variantClasses[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
