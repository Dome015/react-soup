/** Unitless SVG viewBox geometry, shared by both renderers. */
export const CHART = { width: 640, height: 320, left: 60, right: 20, top: 20, bottom: 48, ticks: 4 } as const;
export const plotWidth = CHART.width - CHART.left - CHART.right;
export const plotHeight = CHART.height - CHART.top - CHART.bottom;

const palette = [1, 2, 3, 4, 5, 6] as const;
export function chartColorValue(index: number): string {
  return `var(--soup-chart-color-${palette[index % palette.length]})`;
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
