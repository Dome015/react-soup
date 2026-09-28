import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx, type Size } from '../shared';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', type = 'button', className, ...props }, ref) {
  return <button ref={ref} type={type} className={cx('soup-button', `soup-button--${variant}`, `soup-button--${size}`, className)} {...props} />;
});
