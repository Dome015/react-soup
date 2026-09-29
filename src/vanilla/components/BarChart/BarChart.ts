import { CHART, chartColorValue, finite, formatChartValue, plotHeight, type ChartSeries } from '../../../shared/charts';
import { barGeometry } from '../../../shared/chart-geometry';
import { accessibleMark, chartEmpty, chartShell, chartTable, enhanceChartTooltip, horizontalGrid, svg, verticalGrid } from '../Chart/shared';

export type BarChartOptions = {
  title: string; description?: string; labels: string[]; series: ChartSeries[];
  orientation?: 'vertical' | 'horizontal'; stacked?: boolean; valueDomain?: [number, number];
  showLegend?: boolean; formatValue?: (value: number) => string;
};

/** Renders data into an existing <figure>; no Soup element factory is required. */
export function renderBarChart(figure: HTMLElement, options: BarChartOptions): void {
  const { title, description, labels, series, orientation = 'vertical', stacked = false, valueDomain, showLegend = true, formatValue = formatChartValue } = options;
  const { horizontal, height, left, limits, hasData, categoryBand, step, barsForSeries } = barGeometry(labels, series, orientation, stacked, valueDomain, formatValue);
  const plot = chartShell(figure, title, description, showLegend && series.length > 1 ? series.map(item => item.name) : undefined);
  if (hasData) {
    const chart = svg('svg', { viewBox: `0 0 ${CHART.width} ${height}`, role: 'img', 'aria-label': `${title}, ${horizontal ? 'horizontal ' : ''}${stacked ? 'stacked ' : ''}bar chart` });
    if (horizontal) {
      chart.append(horizontalGrid(limits, height, left));
      const axes = svg('g', { 'aria-hidden': 'true' });
      labels.forEach((label, index) => axes.append(svg('text', { class: 'soup-chart__axis-label', x: left - 10, y: CHART.top + index * categoryBand + categoryBand / 2, 'text-anchor': 'end', 'dominant-baseline': 'middle' }, label)));
      chart.append(axes);
    } else {
      chart.append(verticalGrid(limits));
      const axes = svg('g', { 'aria-hidden': 'true' });
      labels.forEach((label, index) => { if (index % step === 0 || index === labels.length - 1) axes.append(svg('text', { class: 'soup-chart__axis-label', x: CHART.left + index * categoryBand + categoryBand / 2, y: CHART.top + plotHeight + 26, 'text-anchor': 'middle' }, label)); });
      chart.append(axes);
    }
    series.forEach((_, seriesIndex) => {
      const group = svg('g'); group.style.color = chartColorValue(seriesIndex);
      barsForSeries(seriesIndex).forEach(bar => group.append(accessibleMark(svg('rect', { class: 'soup-chart__bar', x: bar.x, y: bar.y, width: bar.width, height: bar.height }), bar.label)));
      chart.append(group);
    });
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ['Category', ...series.map(item => item.name)], labels.map((label, index) => [label, ...series.map(item => finite(item.values[index]) ? item.values[index] : '—')]));
  enhanceChartTooltip(figure);
}
