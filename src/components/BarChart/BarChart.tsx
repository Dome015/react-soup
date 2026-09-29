import { useState } from 'react';
import { CHART, ChartDataTable, ChartEmpty, ChartShell, HorizontalGrid, VerticalGrid, chartColor, domain, finite, formatChartTick, formatChartValue, plotHeight, plotWidth, scale, type ChartSeries } from '../chart-shared';

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

type Bar = { x: number; y: number; width: number; height: number; label: string };

export function BarChart({ title, description, labels, series, orientation = 'vertical', stacked = false, valueDomain, showLegend = true, formatValue = formatChartValue, className }: BarChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const horizontal = orientation === 'horizontal';
  const height = horizontal ? Math.max(CHART.height, CHART.top + CHART.bottom + labels.length * 54) : CHART.height;
  const left = horizontal ? 108 : CHART.left;
  const width = CHART.width - left - CHART.right;
  const graphHeight = height - CHART.top - CHART.bottom;
  const values = series.flatMap(item => item.values.slice(0, labels.length)).filter(finite);
  const totals = labels.flatMap((_, index) => {
    const row = series.map(item => item.values[index]).filter(finite);
    return [row.filter(value => value > 0).reduce((sum, value) => sum + value, 0), row.filter(value => value < 0).reduce((sum, value) => sum + value, 0)];
  });
  const calculated = domain(stacked ? totals : values);
  const limits = valueDomain && finite(valueDomain[0]) && finite(valueDomain[1]) && valueDomain[0] <= 0 && valueDomain[1] >= 0 && valueDomain[1] > valueDomain[0] ? valueDomain : calculated;
  const hasData = labels.length > 0 && values.length > 0;
  const numericX = (value: number) => scale(value, limits, left, left + width);
  const numericY = (value: number) => scale(value, limits, CHART.top + graphHeight, CHART.top);
  const categoryBand = (horizontal ? graphHeight : plotWidth) / Math.max(labels.length, 1);
  const groupSize = categoryBand * 0.72;
  const seriesCount = Math.max(series.length, 1);
  const step = Math.max(1, Math.ceil(labels.length / 6));

  function barsForSeries(seriesIndex: number): Bar[] {
    const item = series[seriesIndex];
    return labels.flatMap((category, index) => {
      const value = item.values[index];
      if (!finite(value)) return [];
      let start = 0;
      if (stacked) {
        const preceding = series.slice(0, seriesIndex).map(previous => previous.values[index]).filter(finite);
        start = preceding.filter(previous => value >= 0 ? previous >= 0 : previous < 0).reduce((sum, previous) => sum + previous, 0);
      }
      const end = start + value;
      const label = `${item.name}, ${category}: ${formatValue(value)}`;
      if (horizontal) {
        const barHeight = groupSize / (stacked ? 1 : seriesCount);
        const y = CHART.top + index * categoryBand + (categoryBand - groupSize) / 2 + (stacked ? 0 : seriesIndex * barHeight) + barHeight * 0.06;
        return [{ x: Math.min(numericX(start), numericX(end)), y, width: Math.abs(numericX(end) - numericX(start)), height: barHeight * 0.88, label }];
      }
      const barWidth = groupSize / (stacked ? 1 : seriesCount);
      const x = CHART.left + index * categoryBand + (categoryBand - groupSize) / 2 + (stacked ? 0 : seriesIndex * barWidth) + barWidth * 0.06;
      return [{ x, y: Math.min(numericY(start), numericY(end)), width: barWidth * 0.88, height: Math.abs(numericY(end) - numericY(start)), label }];
    });
  }

  return <ChartShell title={title} description={description} className={className} legend={showLegend && series.length > 1 ? series.map(item => item.name) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Category', ...series.map(item => item.name)]} rows={labels.map((label, index) => [label, ...series.map(item => finite(item.values[index]) ? item.values[index] : '—')])} />}>
    {!hasData ? <ChartEmpty /> : <svg viewBox={`0 0 ${CHART.width} ${height}`} role="img" aria-label={`${title}, ${horizontal ? 'horizontal ' : ''}${stacked ? 'stacked ' : ''}bar chart`}>
      {horizontal ? <><HorizontalGrid limits={limits} format={formatChartTick} height={height} left={left} /><g aria-hidden="true">{labels.map((label, index) => <text key={`${label}-${index}`} className="soup-chart__axis-label" x={left - 10} y={CHART.top + index * categoryBand + categoryBand / 2} textAnchor="end" dominantBaseline="middle">{label}</text>)}</g></> : <><VerticalGrid limits={limits} format={formatChartTick} /><g aria-hidden="true">{labels.map((label, index) => (index % step === 0 || index === labels.length - 1) && <text key={`${label}-${index}`} className="soup-chart__axis-label" x={CHART.left + index * categoryBand + categoryBand / 2} y={CHART.top + plotHeight + 26} textAnchor="middle">{label}</text>)}</g></>}
      {series.map((item, seriesIndex) => <g key={`${item.name}-${seriesIndex}`} style={chartColor(seriesIndex)}>{barsForSeries(seriesIndex).map((bar, index) => <rect key={index} className="soup-chart__bar" x={bar.x} y={bar.y} width={bar.width} height={bar.height} tabIndex={0} aria-label={bar.label} onMouseEnter={() => setActive(bar.label)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(bar.label)} onBlur={() => setActive(null)}><title>{bar.label}</title></rect>)}</g>)}
    </svg>}
  </ChartShell>;
}
