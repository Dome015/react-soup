import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../shared';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode };

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, className, ...props }, ref) {
  return <label className={cx('soup-switch', props.disabled && 'soup-switch--disabled', className)}><input ref={ref} type="checkbox" role="switch" {...props} /><span className="soup-switch__track" aria-hidden="true" /><span>{label}</span></label>;
});
