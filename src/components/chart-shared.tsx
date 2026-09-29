import type { CSSProperties, ReactNode } from 'react';
import { cx } from './shared';

/** These are unitless SVG viewBox coordinates, not CSS layout values. */
export const CHART = { width: 640, height: 320, left: 60, right: 20, top: 20, bottom: 48, ticks: 4 } as const;
export const plotWidth = CHART.width - CHART.left - CHART.right;
export const plotHeight = CHART.height - CHART.top - CHART.bottom;

const palette = [1, 2, 3, 4, 5, 6] as const;
export function chartColor(index: number): CSSProperties {
  return { color: `var(--soup-chart-color-${palette[index % palette.length]})` };
}

export function finite(value: number): boolean { return Number.isFinite(value); }

function tickStep(span: number): number {
  const rough = span / CHART.ticks;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const scaled = rough / magnitude;
  const multiple = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return multiple * magnitude;
}

export function axisTicks(limits: [number, number]): number[] {
  const step = tickStep(limits[1] - limits[0]);
  const first = Math.ceil(limits[0] / step - 1e-10);
  const last = Math.floor(limits[1] / step + 1e-10);
  return Array.from({ length: Math.max(0, last - first + 1) }, (_, index) => Number(((first + index) * step).toPrecision(12)));
}

export function domain(values: number[], includeZero = true): [number, number] {
  const usable = values.filter(finite);
  if (!usable.length) return [0, 1];
  let minimum = Math.min(...usable);
  let maximum = Math.max(...usable);
  if (includeZero) {
    minimum = Math.min(0, minimum);
    maximum = Math.max(0, maximum);
    if (minimum === maximum) maximum = minimum + 1;
  } else {
    const padding = minimum === maximum ? Math.abs(minimum) * 0.1 || 1 : (maximum - minimum) * 0.08;
    minimum -= padding;
    maximum += padding;
  }
  const step = tickStep(maximum - minimum);
  return [Math.floor(minimum / step) * step, Math.ceil(maximum / step) * step];
}

export function scale(value: number, limits: [number, number], start: number, end: number): number {
  return start + (value - limits[0]) / (limits[1] - limits[0]) * (end - start);
}

export function formatChartValue(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);
}

export function formatChartTick(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 4, notation: 'compact' }).format(value);
}

export type ChartSeries = { name: string; values: number[] };

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
