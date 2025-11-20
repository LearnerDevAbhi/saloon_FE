import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'classnames';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-slate-400',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:outline-primary-600',
};

export const buttonClasses = (variant: ButtonVariant, className?: string) =>
  clsx(baseStyles, variantStyles[variant], className);

export const Button = ({
  children,
  className,
  variant = 'primary',
  isLoading,
  disabled,
  leftIcon,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={buttonClasses(variant, className)}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    )}
    {leftIcon}
    {children}
  </button>
);

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

export const ButtonLink = ({ variant = 'primary', className, children, ...props }: ButtonLinkProps) => (
  <Link className={buttonClasses(variant, className)} {...props}>
    {children}
  </Link>
);

