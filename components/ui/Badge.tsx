import React from 'react';

export type BadgeStatus = 'pending' | 'approved' | 'rejected' | 'published';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  children: React.ReactNode;
}

const statusStyles: Record<BadgeStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  approved:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  published: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ status, className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center
          px-3 py-1
          rounded-full
          text-sm font-medium
          ${statusStyles[status]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
