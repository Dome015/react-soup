import type { CSSProperties, ReactNode } from 'react';
import { cx } from './shared';
import { CHART, plotWidth, plotHeight, axisTicks, scale, chartColorValue, formatChartTick } from '../../shared/charts';
export { CHART, plotWidth, plotHeight, axisTicks, domain, scale, finite, formatChartValue, formatChartTick } from '../../shared/charts';
export type { ChartSeries } from '../../shared/charts';

export function chartColor(index: number): CSSProperties {
  return { color: chartColorValue(index) };
}

export function ChartShell({ title, description, children, legend, tooltip, table, compact = false, pie = false, className }: {
  title: string;
  description?: string;
  children: ReactNode;
  legend?: string[];
  tooltip?: string | null;
  table: ReactNode;
  compact?: boolean;
  pie?: boolean;
  className?: string;
}) {
  return <figure className={cx('soup-chart', compact && 'soup-chart--sparkline', pie && 'soup-chart--pie', className)}>
    <figcaption className="soup-chart__header"><strong>{title}</strong>{description && <span>{description}</span>}</figcaption>
    <div className="soup-chart__plot">{children}{tooltip && <div className="soup-chart__tooltip" role="status">{tooltip}</div>}</div>
    {!compact && legend && legend.length > 0 && <ul className="soup-chart__legend" aria-label="Legend">{legend.map((label, index) => <li key={`${label}-${index}`} style={chartColor(index)}><span className="soup-chart__swatch" aria-hidden="true" /><span>{label}</span></li>)}</ul>}
    {table}
  </figure>;
}

export function ChartDataTable({ title, headers, rows }: { title: string; headers: string[]; rows: (string | number)[][] }) {
  return <table className="soup-chart__data"><caption>{title} data</caption><thead><tr>{headers.map((header, index) => <th key={`${header}-${index}`} scope="col">{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((value, cellIndex) => <td key={cellIndex}>{value}</td>)}</tr>)}</tbody></table>;
}

export function ChartEmpty() { return <div className="soup-chart__empty" role="status">No data available</div>; }

export function VerticalGrid({ limits, format = formatChartTick }: { limits: [number, number]; format?: (value: number) => string }) {
  return <g aria-hidden="true">{axisTicks(limits).map(value => {
    const y = scale(value, limits, CHART.top + plotHeight, CHART.top);
    return <g key={value}><line className="soup-chart__grid" x1={CHART.left} x2={CHART.left + plotWidth} y1={y} y2={y} /><text className="soup-chart__axis-label" x={CHART.left - 10} y={y} textAnchor="end" dominantBaseline="middle">{format(value)}</text></g>;
  })}</g>;
}

export function HorizontalGrid({ limits, format = formatChartTick, height = CHART.height, left = CHART.left }: { limits: [number, number]; format?: (value: number) => string; height?: number; left?: number }) {
  const bottom = height - CHART.bottom;
  const width = CHART.width - left - CHART.right;
  return <g aria-hidden="true">{axisTicks(limits).map(value => {
    const x = scale(value, limits, left, left + width);
    return <g key={value}><line className="soup-chart__grid" x1={x} x2={x} y1={CHART.top} y2={bottom} /><text className="soup-chart__axis-label" x={x} y={bottom + 22} textAnchor="middle">{format(value)}</text></g>;
  })}</g>;
}
