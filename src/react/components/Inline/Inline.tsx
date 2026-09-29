import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type InlineProps = HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg'; align?: 'start' | 'center' | 'end'; justify?: 'start' | 'between' | 'end' };

export function Inline({ gap = 'md', align = 'center', justify = 'start', className, ...props }: InlineProps) {
  return <div className={cx('soup-inline', `soup-gap--${gap}`, `soup-align--${align}`, `soup-justify--${justify}`, className)} {...props} />;
}
