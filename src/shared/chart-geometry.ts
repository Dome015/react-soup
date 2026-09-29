import { CHART, domain, finite, plotWidth, scale, type ChartSeries } from './charts';

export type BarGeometry = { x: number; y: number; width: number; height: number; label: string };
export function barGeometry(labels: string[], series: ChartSeries[], orientation: 'vertical' | 'horizontal', stacked: boolean, valueDomain: [number, number] | undefined, formatValue: (value: number) => string) {
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
  function barsForSeries(seriesIndex: number): BarGeometry[] {
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
  return { horizontal, height, left, width, graphHeight, limits, hasData, categoryBand, step, barsForSeries };
}

export type LinePoint = { index: number; value: number; x: number; y: number };
export function lineGeometry(labels: string[], series: ChartSeries[], variant: 'line' | 'area' | 'sparkline', yDomain?: [number, number]) {
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
  const points = (item: ChartSeries): (LinePoint | null)[] => labels.map((_, index) => finite(item.values[index]) ? { index, value: item.values[index], x: x(index), y: y(item.values[index]) } : null);
  return { compact, height, limits, hasData, x, baseline, step, points };
}

export function lineSegments(points: (LinePoint | null)[]): LinePoint[][] {
  const groups: LinePoint[][] = [];
  let current: LinePoint[] = [];
  points.forEach(point => {
    if (point) current.push(point);
    else if (current.length) { groups.push(current); current = []; }
  });
  if (current.length) groups.push(current);
  return groups;
}

export function linePath(points: LinePoint[]): string {
  return `M ${points.map(point => `${point.x} ${point.y}`).join(' L ')}`;
}

export function areaPath(points: LinePoint[], baseline: number): string {
  return `${linePath(points)} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`;
}

export type PieDatum = { label: string; value: number };
export const PIE = { size: 320, center: 160, outerRadius: 124, innerRadius: 76 } as const;
export function pieGeometry(data: PieDatum[]) {
  const slices = data.filter(item => finite(item.value) && item.value > 0);
  const total = slices.reduce((sum, item) => sum + item.value, 0);
  let angle = -Math.PI / 2;
  return { total, slices: slices.map(item => {
    const start = angle;
    angle += item.value / total * Math.PI * 2;
    return { ...item, start, end: angle };
  }) };
}

export function pieSector(start: number, end: number, donut: boolean): string {
  const polar = (radius: number, angle: number): [number, number] => [PIE.center + radius * Math.cos(angle), PIE.center + radius * Math.sin(angle)];
  const [outerStartX, outerStartY] = polar(PIE.outerRadius, start);
  const [outerEndX, outerEndY] = polar(PIE.outerRadius, end);
  const large = end - start > Math.PI ? 1 : 0;
  if (!donut) return `M ${PIE.center} ${PIE.center} L ${outerStartX} ${outerStartY} A ${PIE.outerRadius} ${PIE.outerRadius} 0 ${large} 1 ${outerEndX} ${outerEndY} Z`;
  const [innerEndX, innerEndY] = polar(PIE.innerRadius, end);
  const [innerStartX, innerStartY] = polar(PIE.innerRadius, start);
  return `M ${outerStartX} ${outerStartY} A ${PIE.outerRadius} ${PIE.outerRadius} 0 ${large} 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${PIE.innerRadius} ${PIE.innerRadius} 0 ${large} 0 ${innerStartX} ${innerStartY} Z`;
}

export type ScatterPoint = { x: number; y: number; label?: string };
export type ScatterSeries = { name: string; points: ScatterPoint[] };
export function scatterGeometry(series: ScatterSeries[], xDomain?: [number, number], yDomain?: [number, number]) {
  const points = series.flatMap(item => item.points).filter(point => finite(point.x) && finite(point.y));
  const computedX = domain(points.map(point => point.x), false);
  const computedY = domain(points.map(point => point.y), false);
  const xLimits = xDomain && finite(xDomain[0]) && finite(xDomain[1]) && xDomain[1] > xDomain[0] ? xDomain : computedX;
  const yLimits = yDomain && finite(yDomain[0]) && finite(yDomain[1]) && yDomain[1] > yDomain[0] ? yDomain : computedY;
  const x = (value: number) => scale(value, xLimits, CHART.left, CHART.left + plotWidth);
  const y = (value: number) => scale(value, yLimits, CHART.top + CHART.height - CHART.top - CHART.bottom, CHART.top);
  return { points, xLimits, yLimits, x, y };
}
