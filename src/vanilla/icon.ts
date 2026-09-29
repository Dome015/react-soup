import { iconShapes, type IconName } from '../shared/icons';

/** The same SVG geometry used by the React Icon component. */
export function createIcon(name: IconName): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [key, value] of Object.entries({ class: 'soup-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' })) svg.setAttribute(key, value);
  for (const shape of iconShapes[name]) {
    const part = document.createElementNS('http://www.w3.org/2000/svg', shape.tag);
    for (const [key, value] of Object.entries(shape)) if (key !== 'tag') part.setAttribute(key, String(value));
    svg.append(part);
  }
  return svg;
}
