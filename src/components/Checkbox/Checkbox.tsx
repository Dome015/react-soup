import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../shared';
import { Icon } from '../Icon/Icon';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, className, ...props }, ref) {
  return <label className={cx('soup-choice', 'soup-choice--checkbox', props.disabled && 'soup-choice--disabled', className)}><input ref={ref} type="checkbox" {...props} /><span className="soup-choice__mark" aria-hidden="true"><Icon name="check" /></span><span>{label}</span></label>;
});
