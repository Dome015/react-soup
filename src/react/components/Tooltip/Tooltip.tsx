import { useId, type ReactElement } from 'react';
import { cx } from '../shared';

export type TooltipProps = { content: string; children: ReactElement; placement?: 'top' | 'bottom'; align?: 'start' | 'end' };

export function Tooltip({ content, children, placement = 'bottom', align = 'start' }: TooltipProps) {
  const id = useId();
  return <span className={cx('soup-tooltip', `soup-tooltip--${placement}`, `soup-tooltip--${align}`)}><span aria-describedby={id} className="soup-tooltip__target">{children}</span><span role="tooltip" id={id} className="soup-tooltip__content">{content}</span></span>;
}
