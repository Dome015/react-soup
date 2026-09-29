import { useState } from 'react';
import { CHART, ChartDataTable, ChartEmpty, ChartShell, HorizontalGrid, VerticalGrid, chartColor, finite, formatChartTick, formatChartValue } from '../chart-shared';
import { scatterGeometry, type ScatterPoint, type ScatterSeries } from '../../../shared/chart-geometry';

export type ScatterChartPoint = ScatterPoint;
export type ScatterChartSeries = ScatterSeries;
export type ScatterChartProps = {
  title: string;
  description?: string;
  series: ScatterChartSeries[];
  xLabel?: string;
  yLabel?: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  showLegend?: boolean;
  formatX?: (value: number) => string;
  formatY?: (value: number) => string;
  className?: string;
};

export function ScatterChart({ title, description, series, xLabel = 'X', yLabel = 'Y', xDomain, yDomain, showLegend = true, formatX = formatChartValue, formatY = formatChartValue, className }: ScatterChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const { points, xLimits, yLimits, x, y } = scatterGeometry(series, xDomain, yDomain);
  return <ChartShell title={title} description={description} className={className} legend={showLegend && series.length > 1 ? series.map(item => item.name) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Series', 'Point', xLabel, yLabel]} rows={series.flatMap(item => item.points.map(point => [item.name, point.label ?? '—', point.x, point.y]))} />}>
    {!points.length ? <ChartEmpty /> : <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} role="img" aria-label={`${title}, scatter plot`}>
      <VerticalGrid limits={yLimits} format={formatChartTick} />
      <HorizontalGrid limits={xLimits} format={formatChartTick} />
      <g aria-hidden="true"><text className="soup-chart__axis-title" x={CHART.width / 2} y={CHART.height - 4} textAnchor="middle">{xLabel}</text><text className="soup-chart__axis-title" x={14} y={CHART.height / 2} textAnchor="middle" transform={`rotate(-90 14 ${CHART.height / 2})`}>{yLabel}</text></g>
      {series.map((item, seriesIndex) => <g key={`${item.name}-${seriesIndex}`} style={chartColor(seriesIndex)}>{item.points.filter(point => finite(point.x) && finite(point.y)).map((point, index) => {
        const label = `${item.name}${point.label ? `, ${point.label}` : ''}: ${xLabel} ${formatX(point.x)}, ${yLabel} ${formatY(point.y)}`;
        return <circle key={index} className="soup-chart__point soup-chart__point--scatter" cx={x(point.x)} cy={y(point.y)} r={6} tabIndex={0} aria-label={label} onMouseEnter={() => setActive(label)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(label)} onBlur={() => setActive(null)}><title>{label}</title></circle>;
      })}</g>)}
    </svg>}
  </ChartShell>;
}
