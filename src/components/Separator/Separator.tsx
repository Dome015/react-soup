import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type SeparatorProps = HTMLAttributes<HTMLHRElement> & { orientation?: 'horizontal' | 'vertical' };

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return <hr role="separator" aria-orientation={orientation} className={cx('soup-separator', `soup-separator--${orientation}`, className)} {...props} />;
}
