import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type GridProps = HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg' };

export function Grid({ gap = 'md', className, ...props }: GridProps) {
  return <div className={cx('soup-grid', `soup-gap--${gap}`, className)} {...props} />;
}
