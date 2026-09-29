import type { HTMLAttributes } from 'react';
import { cx } from '../shared';

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & { name: string; src?: string; alt?: string };

export function Avatar({ name, src, alt = '', className, ...props }: AvatarProps) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(word => word[0]?.toUpperCase()).join('');
  return <span className={cx('soup-avatar', className)} role="img" aria-label={name} {...props}>{src ? <img src={src} alt={alt} /> : initials}</span>;
}
