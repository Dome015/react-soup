import type { HTMLAttributes } from 'react';
import { cx } from '../shared';
import { Icon } from '../Icon/Icon';
import { Link } from '../Link/Link';

export type BreadcrumbItem = { label: string; href: string };
export type BreadcrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: BreadcrumbItem[];
  current: string;
};

export function Breadcrumbs({ items, current, className, ...props }: BreadcrumbsProps) {
  return <nav aria-label="Breadcrumb" className={cx('soup-breadcrumbs', className)} {...props}>
    <ol>{items.map((item, index) => <li key={`${item.href}-${index}`}>{index > 0 && <Icon name="chevronRight" />}<Link href={item.href}>{item.label}</Link></li>)}
      <li>{items.length > 0 && <Icon name="chevronRight" />}<span aria-current="page">{current}</span></li>
    </ol>
  </nav>;
}
