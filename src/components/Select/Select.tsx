import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cx } from '../shared';
import { Icon } from '../Icon/Icon';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, children, ...props }, ref) {
  const showChevron = !props.multiple && (!props.size || props.size <= 1);
  return <span className="soup-select-wrap"><select ref={ref} className={cx('soup-input', showChevron && 'soup-select', className)} {...props}>{children}</select>{showChevron && <Icon name="chevronDown" />}</span>;
});
