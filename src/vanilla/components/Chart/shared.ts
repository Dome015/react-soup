import { CHART, axisTicks, chartColorValue, formatChartTick, plotHeight, plotWidth, scale } from '../../../shared/charts';

const SVG_NS = 'http://www.w3.org/2000/svg';
export function svg<K extends keyof SVGElementTagNameMap>(tag: K, attributes: Record<string, string | number> = {}, value?: string): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, attribute] of Object.entries(attributes)) node.setAttribute(key, String(attribute));
  if (value !== undefined) node.textContent = value;
  return node;
}
export function chartShell(figure: HTMLElement, title: string, description?: string, legend?: string[], compact = false, pie = false): HTMLElement {
  figure.classList.add('soup-chart');
  figure.classList.toggle('soup-chart--sparkline', compact);
  figure.classList.toggle('soup-chart--pie', pie);
  const header = document.createElement('figcaption'); header.className = 'soup-chart__header';
  const strong = document.createElement('strong'); strong.textContent = title; header.append(strong);
  if (description) { const detail = document.createElement('span'); detail.textContent = description; header.append(detail); }
  const plot = document.createElement('div'); plot.className = 'soup-chart__plot';
  figure.replaceChildren(header, plot);
  if (legend?.length) {
    const list = document.createElement('ul'); list.className = 'soup-chart__legend'; list.setAttribute('aria-label', 'Legend');
    legend.forEach((label, index) => {
      const item = document.createElement('li'); item.style.color = chartColorValue(index);
      const swatch = document.createElement('span'); swatch.className = 'soup-chart__swatch'; swatch.setAttribute('aria-hidden', 'true');
      const name = document.createElement('span'); name.textContent = label; item.append(swatch, name); list.append(item);
    });
    figure.append(list);
  }
  return plot;
}
export function chartTable(figure: HTMLElement, title: string, headers: string[], rows: (string | number)[][]): void {
  const table = document.createElement('table'); table.className = 'soup-chart__data';
  const caption = document.createElement('caption'); caption.textContent = `${title} data`; table.append(caption);
  const head = table.createTHead().insertRow();
  headers.forEach(header => { const cell = document.createElement('th'); cell.scope = 'col'; cell.textContent = header; head.append(cell); });
  const body = table.createTBody();
  rows.forEach(row => { const tr = body.insertRow(); row.forEach(value => { tr.insertCell().textContent = String(value); }); });
  figure.append(table);
}
export function chartEmpty(plot: HTMLElement): void {
  const empty = document.createElement('div'); empty.className = 'soup-chart__empty'; empty.setAttribute('role', 'status'); empty.textContent = 'No data available'; plot.append(empty);
}
export function verticalGrid(limits: [number, number]): SVGGElement {
  const group = svg('g', { 'aria-hidden': 'true' });
  axisTicks(limits).forEach(value => {
    const y = scale(value, limits, CHART.top + plotHeight, CHART.top);
    const tick = svg('g');
    tick.append(svg('line', { class: 'soup-chart__grid', x1: CHART.left, x2: CHART.left + plotWidth, y1: y, y2: y }));
    tick.append(svg('text', { class: 'soup-chart__axis-label', x: CHART.left - 10, y, 'text-anchor': 'end', 'dominant-baseline': 'middle' }, formatChartTick(value)));
    group.append(tick);
  });
  return group;
}
export function horizontalGrid(limits: [number, number], height: number = CHART.height, left: number = CHART.left): SVGGElement {
  const group = svg('g', { 'aria-hidden': 'true' });
  const bottom = height - CHART.bottom;
  const width = CHART.width - left - CHART.right;
  axisTicks(limits).forEach(value => {
    const x = scale(value, limits, left, left + width);
    const tick = svg('g');
    tick.append(svg('line', { class: 'soup-chart__grid', x1: x, x2: x, y1: CHART.top, y2: bottom }));
    tick.append(svg('text', { class: 'soup-chart__axis-label', x, y: bottom + 22, 'text-anchor': 'middle' }, formatChartTick(value)));
    group.append(tick);
  });
  return group;
}
const chartListeners = new WeakMap<HTMLElement, AbortController>();
export function enhanceChartTooltip(figure: HTMLElement): () => void {
  chartListeners.get(figure)?.abort();
  const listeners = new AbortController(); chartListeners.set(figure, listeners);
  const plot = figure.querySelector<HTMLElement>('.soup-chart__plot');
  if (!plot) return () => listeners.abort();
  const show = (mark: Element) => {
    plot.querySelector('.soup-chart__tooltip')?.remove();
    const label = mark.getAttribute('aria-label'); if (!label) return;
    const tooltip = document.createElement('div'); tooltip.className = 'soup-chart__tooltip'; tooltip.setAttribute('role', 'status'); tooltip.textContent = label; plot.append(tooltip);
  };
  const hide = () => plot.querySelector('.soup-chart__tooltip')?.remove();
  figure.querySelectorAll<SVGElement>('.soup-chart__point, .soup-chart__bar, .soup-chart__slice, .soup-chart__ring').forEach(mark => {
    mark.addEventListener('mouseenter', () => show(mark), { signal: listeners.signal });
    mark.addEventListener('mouseleave', hide, { signal: listeners.signal });
    mark.addEventListener('focus', () => show(mark), { signal: listeners.signal });
    mark.addEventListener('blur', hide, { signal: listeners.signal });
  });
  return () => { listeners.abort(); hide(); };
}
export function accessibleMark<T extends SVGElement>(mark: T, label: string): T {
  mark.setAttribute('tabindex', '0'); mark.setAttribute('aria-label', label); mark.append(svg('title', {}, label)); return mark;
}
