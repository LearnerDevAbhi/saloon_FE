import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, ...props },
  ref,
) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span>{label}</span>
      <input
        ref={ref}
        className={clsx(
          'rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200',
          error && 'border-red-400 focus:ring-red-100',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
});

