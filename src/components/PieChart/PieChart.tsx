import { useState } from 'react';
import { ChartDataTable, ChartEmpty, ChartShell, chartColor, finite, formatChartValue } from '../chart-shared';

export type PieChartDatum = { label: string; value: number };
export type PieChartProps = {
  title: string;
  description?: string;
  data: PieChartDatum[];
  variant?: 'pie' | 'donut';
  centerLabel?: string;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
};

const size = 320;
const center = size / 2;
const outerRadius = 124;
const innerRadius = 76;

function polar(radius: number, angle: number): [number, number] {
  return [center + radius * Math.cos(angle), center + radius * Math.sin(angle)];
}

function sector(start: number, end: number, donut: boolean): string {
  const [outerStartX, outerStartY] = polar(outerRadius, start);
  const [outerEndX, outerEndY] = polar(outerRadius, end);
  const large = end - start > Math.PI ? 1 : 0;
  if (!donut) return `M ${center} ${center} L ${outerStartX} ${outerStartY} A ${outerRadius} ${outerRadius} 0 ${large} 1 ${outerEndX} ${outerEndY} Z`;
  const [innerEndX, innerEndY] = polar(innerRadius, end);
  const [innerStartX, innerStartY] = polar(innerRadius, start);
  return `M ${outerStartX} ${outerStartY} A ${outerRadius} ${outerRadius} 0 ${large} 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${innerRadius} ${innerRadius} 0 ${large} 0 ${innerStartX} ${innerStartY} Z`;
}

export function PieChart({ title, description, data, variant = 'pie', centerLabel = 'Total', showLegend = true, formatValue = formatChartValue, className }: PieChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const slices = data.filter(item => finite(item.value) && item.value > 0);
  const total = slices.reduce((sum, item) => sum + item.value, 0);
  const donut = variant === 'donut';
  let angle = -Math.PI / 2;
  return <ChartShell title={title} description={description} className={className} pie legend={showLegend ? slices.map(item => item.label) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Category', 'Value']} rows={data.map(item => [item.label, item.value])} />}>
    {total <= 0 ? <ChartEmpty /> : <svg className="soup-chart__pie" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${title}, ${variant} chart`}>
      {slices.map((item, index) => {
        const start = angle;
        angle += item.value / total * Math.PI * 2;
        const end = angle;
        const label = `${item.label}: ${formatValue(item.value)} (${formatChartValue(item.value / total * 100)}%)`;
        const events = { onMouseEnter: () => setActive(label), onMouseLeave: () => setActive(null), onFocus: () => setActive(label), onBlur: () => setActive(null) };
        if (slices.length === 1) return donut
          ? <circle key={item.label} className="soup-chart__ring" cx={center} cy={center} r={(outerRadius + innerRadius) / 2} strokeWidth={outerRadius - innerRadius} style={chartColor(index)} tabIndex={0} aria-label={label} {...events}><title>{label}</title></circle>
          : <circle key={item.label} className="soup-chart__slice" cx={center} cy={center} r={outerRadius} style={chartColor(index)} tabIndex={0} aria-label={label} {...events}><title>{label}</title></circle>;
        return <path key={`${item.label}-${index}`} className="soup-chart__slice" d={sector(start, end, donut)} style={chartColor(index)} tabIndex={0} aria-label={label} {...events}><title>{label}</title></path>;
      })}
      {donut && <g className="soup-chart__center" aria-hidden="true"><text x={center} y={center - 7} textAnchor="middle">{centerLabel}</text><text className="soup-chart__center-value" x={center} y={center + 22} textAnchor="middle">{formatValue(total)}</text></g>}
    </svg>}
  </ChartShell>;
}
