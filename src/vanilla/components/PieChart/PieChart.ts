import { chartColorValue, formatChartValue } from '../../../shared/charts';
import { PIE, pieGeometry, pieSector, type PieDatum } from '../../../shared/chart-geometry';
import { accessibleMark, chartEmpty, chartShell, chartTable, enhanceChartTooltip, svg } from '../Chart/shared';

export type PieChartDatum = PieDatum;
export type PieChartOptions = {
  title: string; description?: string; data: PieChartDatum[];
  variant?: 'pie' | 'donut'; centerLabel?: string; showLegend?: boolean;
  formatValue?: (value: number) => string;
};
/** Updates an existing figure with pie or donut geometry and semantic data. */
export function renderPieChart(figure: HTMLElement, options: PieChartOptions): void {
  const { title, description, data, variant = 'pie', centerLabel = 'Total', showLegend = true, formatValue = formatChartValue } = options;
  const { slices, total } = pieGeometry(data);
  const donut = variant === 'donut';
  const plot = chartShell(figure, title, description, showLegend ? slices.map(item => item.label) : undefined, false, true);
  if (total > 0) {
    const chart = svg('svg', { class: 'soup-chart__pie', viewBox: `0 0 ${PIE.size} ${PIE.size}`, role: 'img', 'aria-label': `${title}, ${variant} chart` });
    slices.forEach((item, index) => {
      const label = `${item.label}: ${formatValue(item.value)} (${formatChartValue(item.value / total * 100)}%)`;
      let mark: SVGElement;
      if (slices.length === 1 && donut) mark = svg('circle', { class: 'soup-chart__ring', cx: PIE.center, cy: PIE.center, r: (PIE.outerRadius + PIE.innerRadius) / 2, 'stroke-width': PIE.outerRadius - PIE.innerRadius });
      else if (slices.length === 1) mark = svg('circle', { class: 'soup-chart__slice', cx: PIE.center, cy: PIE.center, r: PIE.outerRadius });
      else mark = svg('path', { class: 'soup-chart__slice', d: pieSector(item.start, item.end, donut) });
      mark.style.color = chartColorValue(index);
      chart.append(accessibleMark(mark, label));
    });
    if (donut) {
      const centerGroup = svg('g', { class: 'soup-chart__center', 'aria-hidden': 'true' });
      centerGroup.append(svg('text', { x: PIE.center, y: PIE.center - 7, 'text-anchor': 'middle' }, centerLabel));
      centerGroup.append(svg('text', { class: 'soup-chart__center-value', x: PIE.center, y: PIE.center + 22, 'text-anchor': 'middle' }, formatValue(total)));
      chart.append(centerGroup);
    }
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ['Category', 'Value'], data.map(item => [item.label, item.value]));
  enhanceChartTooltip(figure);
}
