import { CHART, chartColorValue, finite, formatChartValue } from '../../../shared/charts';
import { scatterGeometry, type ScatterPoint, type ScatterSeries } from '../../../shared/chart-geometry';
import { accessibleMark, chartEmpty, chartShell, chartTable, enhanceChartTooltip, horizontalGrid, svg, verticalGrid } from '../Chart/shared';

export type ScatterChartPoint = ScatterPoint;
export type ScatterChartSeries = ScatterSeries;
export type ScatterChartOptions = {
  title: string; description?: string; series: ScatterChartSeries[];
  xLabel?: string; yLabel?: string; xDomain?: [number, number]; yDomain?: [number, number];
  showLegend?: boolean; formatX?: (value: number) => string; formatY?: (value: number) => string;
};

/** Updates an existing figure with scatter marks, axes, legend, and data table. */
export function renderScatterChart(figure: HTMLElement, options: ScatterChartOptions): void {
  const { title, description, series, xLabel = 'X', yLabel = 'Y', xDomain, yDomain, showLegend = true, formatX = formatChartValue, formatY = formatChartValue } = options;
  const { points, xLimits, yLimits, x, y } = scatterGeometry(series, xDomain, yDomain);
  const plot = chartShell(figure, title, description, showLegend && series.length > 1 ? series.map(item => item.name) : undefined);
  if (points.length) {
    const chart = svg('svg', { viewBox: `0 0 ${CHART.width} ${CHART.height}`, role: 'img', 'aria-label': `${title}, scatter plot` });
    chart.append(verticalGrid(yLimits), horizontalGrid(xLimits));
    const axisLabels = svg('g', { 'aria-hidden': 'true' });
    axisLabels.append(svg('text', { class: 'soup-chart__axis-title', x: CHART.width / 2, y: CHART.height - 4, 'text-anchor': 'middle' }, xLabel));
    axisLabels.append(svg('text', { class: 'soup-chart__axis-title', x: 14, y: CHART.height / 2, 'text-anchor': 'middle', transform: `rotate(-90 14 ${CHART.height / 2})` }, yLabel));
    chart.append(axisLabels);
    series.forEach((item, seriesIndex) => {
      const group = svg('g'); group.style.color = chartColorValue(seriesIndex);
      item.points.filter(point => finite(point.x) && finite(point.y)).forEach(point => {
        const label = `${item.name}${point.label ? `, ${point.label}` : ''}: ${xLabel} ${formatX(point.x)}, ${yLabel} ${formatY(point.y)}`;
        group.append(accessibleMark(svg('circle', { class: 'soup-chart__point soup-chart__point--scatter', cx: x(point.x), cy: y(point.y), r: 6 }), label));
      });
      chart.append(group);
    });
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ['Series', 'Point', xLabel, yLabel], series.flatMap(item => item.points.map(point => [item.name, point.label ?? '—', point.x, point.y])));
  enhanceChartTooltip(figure);
}
