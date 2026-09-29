import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../shared';
import { Icon } from '../Icon/Icon';

export type AccordionProps = HTMLAttributes<HTMLDivElement>;
export function Accordion({ className, ...props }: AccordionProps) { return <div className={cx('soup-accordion', className)} {...props} />; }

export type AccordionItemProps = DetailsHTMLAttributes<HTMLDetailsElement> & { title: ReactNode };
export function AccordionItem({ title, className, children, ...props }: AccordionItemProps) {
  return <details className={cx('soup-accordion__item', className)} {...props}>
    <summary>{title}<Icon name="chevronDown" /></summary>
    <div className="soup-accordion__content">{children}</div>
  </details>;
}
