import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & { shape?: 'line' | 'circle' | 'block' };

export function Skeleton({ shape = 'line', className, ...props }: SkeletonProps) {
  return <span aria-hidden="true" className={cx('soup-skeleton', `soup-skeleton--${shape}`, className)} {...props} />;
}
