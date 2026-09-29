import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx, type Size } from '../shared';
import { Icon, type IconName } from '../Icon/Icon';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: IconName;
  label: string;
  variant?: 'secondary' | 'ghost' | 'danger';
  size?: Size;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ icon, label, variant = 'ghost', size = 'md', type = 'button', className, ...props }, ref) {
  return <button ref={ref} type={type} aria-label={label} className={cx('soup-icon-button', `soup-button--${variant}`, `soup-button--${size}`, className)} {...props}><Icon name={icon} /></button>;
});
