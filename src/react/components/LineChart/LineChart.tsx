import { useState } from 'react';
import { CHART, ChartDataTable, ChartEmpty, ChartShell, VerticalGrid, chartColor, finite, formatChartTick, formatChartValue, plotHeight, type ChartSeries } from '../chart-shared';
import { areaPath, lineGeometry, linePath, lineSegments, type LinePoint } from '../../../shared/chart-geometry';

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

export function LineChart({ title, description, labels, series, variant = 'line', yDomain, showLegend = true, formatValue = formatChartValue, className }: LineChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const { compact, height, limits, hasData, x, baseline, step, points: pointsFor } = lineGeometry(labels, series, variant, yDomain);

  return <ChartShell title={title} description={description} className={className} compact={compact} legend={showLegend && !compact && series.length > 1 ? series.map(item => item.name) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Period', ...series.map(item => item.name)]} rows={labels.map((label, index) => [label, ...series.map(item => finite(item.values[index]) ? item.values[index] : '—')])} />}>
    {!hasData ? <ChartEmpty /> : <svg viewBox={`0 0 ${CHART.width} ${height}`} role="img" aria-label={`${title}, ${variant} chart`}>
      {!compact && <><VerticalGrid limits={limits} format={formatChartTick} /><g aria-hidden="true">{labels.map((label, index) => (index % step === 0 || index === labels.length - 1) && <text key={`${label}-${index}`} className="soup-chart__axis-label" x={x(index)} y={CHART.top + plotHeight + 26} textAnchor="middle">{label}</text>)}</g></>}
      {series.map((item, seriesIndex) => {
        const points = pointsFor(item);
        return <g key={`${item.name}-${seriesIndex}`} style={chartColor(seriesIndex)}>
          {lineSegments(points).map((group, groupIndex) => {
            const line = linePath(group);
            const area = areaPath(group, baseline);
            return <g key={groupIndex}>{variant === 'area' && <path className="soup-chart__area" d={area} />}<path className="soup-chart__line" d={line} /></g>;
          })}
          {points.filter((point): point is LinePoint => point !== null).map(point => {
            const label = `${item.name}, ${labels[point.index]}: ${formatValue(point.value)}`;
            return <circle key={point.index} className="soup-chart__point" cx={point.x} cy={point.y} r={compact ? 4 : 5} tabIndex={0} aria-label={label} onMouseEnter={() => setActive(label)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(label)} onBlur={() => setActive(null)}><title>{label}</title></circle>;
          })}
        </g>;
      })}
    </svg>}
  </ChartShell>;
}
