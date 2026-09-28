import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../shared';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode };

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ label, className, ...props }, ref) {
  return <label className={cx('soup-choice', 'soup-choice--radio', props.disabled && 'soup-choice--disabled', className)}><input ref={ref} type="radio" {...props} /><span className="soup-choice__mark" aria-hidden="true" /><span>{label}</span></label>;
});
