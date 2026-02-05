'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-700',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const statusVariants: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    completed: 'success',
    approved: 'success',
    done: 'success',
    active: 'success',
    in_progress: 'warning',
    pending: 'warning',
    review: 'warning',
    under_review: 'warning',
    todo: 'info',
    planning: 'info',
    cancelled: 'error',
    archived: 'default',
    inactive: 'default',
  };

  return (
    <Badge variant={statusVariants[status] || 'default'}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const priorityVariants: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    low: 'default',
    normal: 'info',
    high: 'warning',
    urgent: 'error',
  };

  return (
    <Badge variant={priorityVariants[priority] || 'default'}>
      {priority}
    </Badge>
  );
}
