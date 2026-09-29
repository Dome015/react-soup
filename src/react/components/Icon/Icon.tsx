import { createElement, type SVGProps } from 'react';
import { iconShapes, type IconName } from '../../../shared/icons';

export type { IconName } from '../../../shared/icons';

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg className="soup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    {iconShapes[name].map((shape, index) => {
      const { tag, ...attributes } = shape;
      return createElement(tag, { ...attributes, key: index });
    })}
  </svg>;
}
