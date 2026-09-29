import { CHART, chartColorValue, finite, formatChartValue, plotHeight, type ChartSeries } from '../../../shared/charts';
import { areaPath, lineGeometry, linePath, lineSegments, type LinePoint } from '../../../shared/chart-geometry';
import { accessibleMark, chartEmpty, chartShell, chartTable, enhanceChartTooltip, svg, verticalGrid } from '../Chart/shared';

export type LineChartOptions = {
  title: string; description?: string; labels: string[]; series: ChartSeries[];
  variant?: 'line' | 'area' | 'sparkline'; yDomain?: [number, number];
  showLegend?: boolean; formatValue?: (value: number) => string;
};
/** Updates an existing chart figure from typed data, including its accessible table. */
export function renderLineChart(figure: HTMLElement, options: LineChartOptions): void {
  const { title, description, labels, series, variant = 'line', yDomain, showLegend = true, formatValue = formatChartValue } = options;
  const { compact, height, limits, hasData, x, baseline, step, points: pointsFor } = lineGeometry(labels, series, variant, yDomain);
  const plot = chartShell(figure, title, description, showLegend && !compact && series.length > 1 ? series.map(item => item.name) : undefined, compact);
  if (hasData) {
    const chart = svg('svg', { viewBox: `0 0 ${CHART.width} ${height}`, role: 'img', 'aria-label': `${title}, ${variant} chart` });
    if (!compact) {
      chart.append(verticalGrid(limits));
      const axes = svg('g', { 'aria-hidden': 'true' });
      labels.forEach((label, index) => { if (index % step === 0 || index === labels.length - 1) axes.append(svg('text', { class: 'soup-chart__axis-label', x: x(index), y: CHART.top + plotHeight + 26, 'text-anchor': 'middle' }, label)); });
      chart.append(axes);
    }
    series.forEach((item, seriesIndex) => {
      const group = svg('g'); group.style.color = chartColorValue(seriesIndex);
      const points = pointsFor(item);
      lineSegments(points).forEach(segment => {
        const line = linePath(segment);
        const area = areaPath(segment, baseline);
        const paths = svg('g');
        if (variant === 'area') paths.append(svg('path', { class: 'soup-chart__area', d: area }));
        paths.append(svg('path', { class: 'soup-chart__line', d: line })); group.append(paths);
      });
      points.filter((point): point is LinePoint => point !== null).forEach(point => {
        const label = `${item.name}, ${labels[point.index]}: ${formatValue(point.value)}`;
        group.append(accessibleMark(svg('circle', { class: 'soup-chart__point', cx: point.x, cy: point.y, r: compact ? 4 : 5 }), label));
      });
      chart.append(group);
    });
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ['Period', ...series.map(item => item.name)], labels.map((label, index) => [label, ...series.map(item => finite(item.values[index]) ? item.values[index] : '—')]));
  enhanceChartTooltip(figure);
}
