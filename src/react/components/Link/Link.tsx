import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cx } from '../shared';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { subtle?: boolean };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ subtle = false, className, ...props }, ref) {
  return <a ref={ref} className={cx('soup-link', subtle && 'soup-link--subtle', className)} {...props} />;
});
