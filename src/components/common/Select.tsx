import { forwardRef } from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';
import clsx from 'classnames';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className, children, leftIcon, ...props },
  ref,
) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="flex items-center gap-2">
        {leftIcon}
        {label}
      </span>
      <select
        ref={ref}
        className={clsx(
          'rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200',
          error && 'border-red-400 focus:ring-red-100',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
});

