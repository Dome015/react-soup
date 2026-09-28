import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type StackProps = HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg' };

export function Stack({ gap = 'md', className, ...props }: StackProps) {
  return <div className={cx('soup-stack', `soup-gap--${gap}`, className)} {...props} />;
}
