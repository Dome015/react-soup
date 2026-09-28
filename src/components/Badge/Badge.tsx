import type { HTMLAttributes } from 'react';
import { cx, type Tone } from '../shared';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: Tone };

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return <span className={cx('soup-badge', `soup-tone--${tone}`, className)} {...props} />;
}
