import { useState } from 'react';
import { CHART, ChartDataTable, ChartEmpty, ChartShell, VerticalGrid, chartColor, domain, finite, formatChartTick, formatChartValue, plotHeight, scale, type ChartSeries } from '../chart-shared';

export type LineChartProps = {
  title: string;
  description?: string;
  labels: string[];
  series: ChartSeries[];
  variant?: 'line' | 'area' | 'sparkline';
  yDomain?: [number, number];
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
};

type Point = { index: number; value: number; x: number; y: number };

function paths(points: (Point | null)[]): Point[][] {
  const groups: Point[][] = [];
  let current: Point[] = [];
  points.forEach(point => {
    if (point) current.push(point);
    else if (current.length) { groups.push(current); current = []; }
  });
  if (current.length) groups.push(current);
  return groups;
}

export function LineChart({ title, description, labels, series, variant = 'line', yDomain, showLegend = true, formatValue = formatChartValue, className }: LineChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const compact = variant === 'sparkline';
  const height = compact ? 96 : CHART.height;
  const left = compact ? 8 : CHART.left;
  const right = compact ? 8 : CHART.right;
  const top = compact ? 8 : CHART.top;
  const bottom = compact ? 8 : CHART.bottom;
  const width = CHART.width - left - right;
  const graphHeight = height - top - bottom;
  const allValues = series.flatMap(item => item.values.slice(0, labels.length)).filter(finite);
  const calculated = domain(allValues, !compact);
  const limits = yDomain && finite(yDomain[0]) && finite(yDomain[1]) && yDomain[1] > yDomain[0] ? yDomain : calculated;
  const hasData = labels.length > 0 && allValues.length > 0;
  const x = (index: number) => left + (labels.length === 1 ? width / 2 : index / (labels.length - 1) * width);
  const y = (value: number) => scale(value, limits, top + graphHeight, top);
  const baseline = y(Math.max(limits[0], Math.min(0, limits[1])));
  const step = Math.max(1, Math.ceil(labels.length / 6));

  return <ChartShell title={title} description={description} className={className} compact={compact} legend={showLegend && !compact && series.length > 1 ? series.map(item => item.name) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Period', ...series.map(item => item.name)]} rows={labels.map((label, index) => [label, ...series.map(item => finite(item.values[index]) ? item.values[index] : '—')])} />}>
    {!hasData ? <ChartEmpty /> : <svg viewBox={`0 0 ${CHART.width} ${height}`} role="img" aria-label={`${title}, ${variant} chart`}>
      {!compact && <><VerticalGrid limits={limits} format={formatChartTick} /><g aria-hidden="true">{labels.map((label, index) => (index % step === 0 || index === labels.length - 1) && <text key={`${label}-${index}`} className="soup-chart__axis-label" x={x(index)} y={CHART.top + plotHeight + 26} textAnchor="middle">{label}</text>)}</g></>}
      {series.map((item, seriesIndex) => {
        const points = labels.map((_, index) => finite(item.values[index]) ? { index, value: item.values[index], x: x(index), y: y(item.values[index]) } : null);
        return <g key={`${item.name}-${seriesIndex}`} style={chartColor(seriesIndex)}>
          {paths(points).map((group, groupIndex) => {
            const line = `M ${group.map(point => `${point.x} ${point.y}`).join(' L ')}`;
            const area = `${line} L ${group[group.length - 1].x} ${baseline} L ${group[0].x} ${baseline} Z`;
            return <g key={groupIndex}>{variant === 'area' && <path className="soup-chart__area" d={area} />}<path className="soup-chart__line" d={line} /></g>;
          })}
          {points.filter((point): point is Point => point !== null).map(point => {
            const label = `${item.name}, ${labels[point.index]}: ${formatValue(point.value)}`;
            return <circle key={point.index} className="soup-chart__point" cx={point.x} cy={point.y} r={compact ? 4 : 5} tabIndex={0} aria-label={label} onMouseEnter={() => setActive(label)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(label)} onBlur={() => setActive(null)}><title>{label}</title></circle>;
          })}
        </g>;
      })}
    </svg>}
  </ChartShell>;
}
