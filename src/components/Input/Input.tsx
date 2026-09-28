import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, type = 'text', ...props }, ref) {
  return <input ref={ref} type={type} className={cx('soup-input', className)} {...props} />;
});
