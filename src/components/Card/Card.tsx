import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type CardProps = HTMLAttributes<HTMLElement> & { as?: 'article' | 'section' | 'div' };

export function Card({ as: Element = 'article', className, ...props }: CardProps) {
  return <Element className={cx('soup-card', className)} {...props} />;
}
