import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cx('soup-container', className)} {...props} />;
}
