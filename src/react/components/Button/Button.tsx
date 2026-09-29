import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx, type Size } from '../shared';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: Size;
  loading?: boolean;
  loadingText?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', type = 'button', loading = false, loadingText, disabled, className, children, ...props }, ref) {
  return <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cx('soup-button', `soup-button--${variant}`, `soup-button--${size}`, className)} {...props}>
    {loading && <span className="soup-button__loader" aria-hidden="true" />}
    {loading && loadingText ? loadingText : children}
  </button>;
});
