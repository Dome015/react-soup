import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../shared';

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  htmlFor: string;
  description?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

export function Field({ label, htmlFor, description, error, optional, children, className, ...props }: FieldProps) {
  return <div className={cx('soup-field', className)} {...props}>
    <label className="soup-field__label" htmlFor={htmlFor}>{label}{optional && <span className="soup-field__optional">Optional</span>}</label>
    {children}
    {description && <p className="soup-field__description" id={`${htmlFor}-description`}>{description}</p>}
    {error && <p className="soup-field__error" id={`${htmlFor}-error`} role="alert">{error}</p>}
  </div>;
}
