import { useState } from 'react';
import { CHART, ChartDataTable, ChartEmpty, ChartShell, HorizontalGrid, VerticalGrid, chartColor, finite, formatChartTick, formatChartValue, plotHeight, type ChartSeries } from '../chart-shared';
import { barGeometry } from '../../../shared/chart-geometry';

export type BarChartProps = {
  title: string;
  description?: string;
  labels: string[];
  series: ChartSeries[];
  orientation?: 'vertical' | 'horizontal';
  stacked?: boolean;
  valueDomain?: [number, number];
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
};

export function BarChart({ title, description, labels, series, orientation = 'vertical', stacked = false, valueDomain, showLegend = true, formatValue = formatChartValue, className }: BarChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const { horizontal, height, left, limits, hasData, categoryBand, step, barsForSeries } = barGeometry(labels, series, orientation, stacked, valueDomain, formatValue);

  return <ChartShell title={title} description={description} className={className} legend={showLegend && series.length > 1 ? series.map(item => item.name) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Category', ...series.map(item => item.name)]} rows={labels.map((label, index) => [label, ...series.map(item => finite(item.values[index]) ? item.values[index] : '—')])} />}>
    {!hasData ? <ChartEmpty /> : <svg viewBox={`0 0 ${CHART.width} ${height}`} role="img" aria-label={`${title}, ${horizontal ? 'horizontal ' : ''}${stacked ? 'stacked ' : ''}bar chart`}>
      {horizontal ? <><HorizontalGrid limits={limits} format={formatChartTick} height={height} left={left} /><g aria-hidden="true">{labels.map((label, index) => <text key={`${label}-${index}`} className="soup-chart__axis-label" x={left - 10} y={CHART.top + index * categoryBand + categoryBand / 2} textAnchor="end" dominantBaseline="middle">{label}</text>)}</g></> : <><VerticalGrid limits={limits} format={formatChartTick} /><g aria-hidden="true">{labels.map((label, index) => (index % step === 0 || index === labels.length - 1) && <text key={`${label}-${index}`} className="soup-chart__axis-label" x={CHART.left + index * categoryBand + categoryBand / 2} y={CHART.top + plotHeight + 26} textAnchor="middle">{label}</text>)}</g></>}
      {series.map((item, seriesIndex) => <g key={`${item.name}-${seriesIndex}`} style={chartColor(seriesIndex)}>{barsForSeries(seriesIndex).map((bar, index) => <rect key={index} className="soup-chart__bar" x={bar.x} y={bar.y} width={bar.width} height={bar.height} tabIndex={0} aria-label={bar.label} onMouseEnter={() => setActive(bar.label)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(bar.label)} onBlur={() => setActive(null)}><title>{bar.label}</title></rect>)}</g>)}
    </svg>}
  </ChartShell>;
}
