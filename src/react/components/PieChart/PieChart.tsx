import { useState } from 'react';
import { ChartDataTable, ChartEmpty, ChartShell, chartColor, formatChartValue } from '../chart-shared';
import { PIE, pieGeometry, pieSector, type PieDatum } from '../../../shared/chart-geometry';

export type PieChartDatum = PieDatum;
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

export function PieChart({ title, description, data, variant = 'pie', centerLabel = 'Total', showLegend = true, formatValue = formatChartValue, className }: PieChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const { slices, total } = pieGeometry(data);
  const donut = variant === 'donut';
  return <ChartShell title={title} description={description} className={className} pie legend={showLegend ? slices.map(item => item.label) : undefined} tooltip={active} table={<ChartDataTable title={title} headers={['Category', 'Value']} rows={data.map(item => [item.label, item.value])} />}>
    {total <= 0 ? <ChartEmpty /> : <svg className="soup-chart__pie" viewBox={`0 0 ${PIE.size} ${PIE.size}`} role="img" aria-label={`${title}, ${variant} chart`}>
      {slices.map((item, index) => {
        const label = `${item.label}: ${formatValue(item.value)} (${formatChartValue(item.value / total * 100)}%)`;
        const events = { onMouseEnter: () => setActive(label), onMouseLeave: () => setActive(null), onFocus: () => setActive(label), onBlur: () => setActive(null) };
        if (slices.length === 1) return donut
          ? <circle key={item.label} className="soup-chart__ring" cx={PIE.center} cy={PIE.center} r={(PIE.outerRadius + PIE.innerRadius) / 2} strokeWidth={PIE.outerRadius - PIE.innerRadius} style={chartColor(index)} tabIndex={0} aria-label={label} {...events}><title>{label}</title></circle>
          : <circle key={item.label} className="soup-chart__slice" cx={PIE.center} cy={PIE.center} r={PIE.outerRadius} style={chartColor(index)} tabIndex={0} aria-label={label} {...events}><title>{label}</title></circle>;
        return <path key={`${item.label}-${index}`} className="soup-chart__slice" d={pieSector(item.start, item.end, donut)} style={chartColor(index)} tabIndex={0} aria-label={label} {...events}><title>{label}</title></path>;
      })}
      {donut && <g className="soup-chart__center" aria-hidden="true"><text x={PIE.center} y={PIE.center - 7} textAnchor="middle">{centerLabel}</text><text className="soup-chart__center-value" x={PIE.center} y={PIE.center + 22} textAnchor="middle">{formatValue(total)}</text></g>}
    </svg>}
  </ChartShell>;
}
