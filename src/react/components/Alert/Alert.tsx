import type { HTMLAttributes, ReactNode } from 'react';
import { cx, type Tone } from '../shared';
import { Icon } from '../Icon/Icon';

export type AlertProps = HTMLAttributes<HTMLDivElement> & { tone?: Exclude<Tone, 'accent'>; title?: string; children: ReactNode };

export function Alert({ tone = 'info', title, children, className, ...props }: AlertProps) {
  return <div role={tone === 'danger' ? 'alert' : 'status'} className={cx('soup-alert', `soup-tone--${tone}`, className)} {...props}>
    <Icon name={tone === 'danger' || tone === 'warning' ? 'alert' : 'info'} />
    <div>{title && <strong>{title}</strong>}<div>{children}</div></div>
  </div>;
}
