import {
  CHART,
  accessibleMark,
  chartColorValue,
  chartEmpty,
  chartShell,
  chartTable,
  domain,
  enhanceChartTooltip,
  finite,
  formatChartValue,
  horizontalGrid,
  plotHeight,
  plotWidth,
  scale,
  svg,
  verticalGrid
} from "../chunks/chunk-USGUEH7Y.js";

// src/shared/chart-geometry.ts
function barGeometry(labels, series, orientation, stacked, valueDomain, formatValue) {
  const horizontal = orientation === "horizontal";
  const height = horizontal ? Math.max(CHART.height, CHART.top + CHART.bottom + labels.length * 54) : CHART.height;
  const left = horizontal ? 108 : CHART.left;
  const width = CHART.width - left - CHART.right;
  const graphHeight = height - CHART.top - CHART.bottom;
  const values = series.flatMap((item) => item.values.slice(0, labels.length)).filter(finite);
  const totals = labels.flatMap((_, index) => {
    const row = series.map((item) => item.values[index]).filter(finite);
    return [row.filter((value) => value > 0).reduce((sum, value) => sum + value, 0), row.filter((value) => value < 0).reduce((sum, value) => sum + value, 0)];
  });
  const calculated = domain(stacked ? totals : values);
  const limits = valueDomain && finite(valueDomain[0]) && finite(valueDomain[1]) && valueDomain[0] <= 0 && valueDomain[1] >= 0 && valueDomain[1] > valueDomain[0] ? valueDomain : calculated;
  const hasData = labels.length > 0 && values.length > 0;
  const numericX = (value) => scale(value, limits, left, left + width);
  const numericY = (value) => scale(value, limits, CHART.top + graphHeight, CHART.top);
  const categoryBand = (horizontal ? graphHeight : plotWidth) / Math.max(labels.length, 1);
  const groupSize = categoryBand * 0.72;
  const seriesCount = Math.max(series.length, 1);
  const step = Math.max(1, Math.ceil(labels.length / 6));
  function barsForSeries(seriesIndex) {
    const item = series[seriesIndex];
    return labels.flatMap((category, index) => {
      const value = item.values[index];
      if (!finite(value)) return [];
      let start = 0;
      if (stacked) {
        const preceding = series.slice(0, seriesIndex).map((previous) => previous.values[index]).filter(finite);
        start = preceding.filter((previous) => value >= 0 ? previous >= 0 : previous < 0).reduce((sum, previous) => sum + previous, 0);
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
function lineGeometry(labels, series, variant, yDomain) {
  const compact = variant === "sparkline";
  const height = compact ? 96 : CHART.height;
  const left = compact ? 8 : CHART.left;
  const right = compact ? 8 : CHART.right;
  const top = compact ? 8 : CHART.top;
  const bottom = compact ? 8 : CHART.bottom;
  const width = CHART.width - left - right;
  const graphHeight = height - top - bottom;
  const allValues = series.flatMap((item) => item.values.slice(0, labels.length)).filter(finite);
  const calculated = domain(allValues, !compact);
  const limits = yDomain && finite(yDomain[0]) && finite(yDomain[1]) && yDomain[1] > yDomain[0] ? yDomain : calculated;
  const hasData = labels.length > 0 && allValues.length > 0;
  const x = (index) => left + (labels.length === 1 ? width / 2 : index / (labels.length - 1) * width);
  const y = (value) => scale(value, limits, top + graphHeight, top);
  const baseline = y(Math.max(limits[0], Math.min(0, limits[1])));
  const step = Math.max(1, Math.ceil(labels.length / 6));
  const points = (item) => labels.map((_, index) => finite(item.values[index]) ? { index, value: item.values[index], x: x(index), y: y(item.values[index]) } : null);
  return { compact, height, limits, hasData, x, baseline, step, points };
}
function lineSegments(points) {
  const groups = [];
  let current = [];
  points.forEach((point) => {
    if (point) current.push(point);
    else if (current.length) {
      groups.push(current);
      current = [];
    }
  });
  if (current.length) groups.push(current);
  return groups;
}
function linePath(points) {
  return `M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`;
}
function areaPath(points, baseline) {
  return `${linePath(points)} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`;
}
var PIE = { size: 320, center: 160, outerRadius: 124, innerRadius: 76 };
function pieGeometry(data) {
  const slices = data.filter((item) => finite(item.value) && item.value > 0);
  const total = slices.reduce((sum, item) => sum + item.value, 0);
  let angle = -Math.PI / 2;
  return { total, slices: slices.map((item) => {
    const start = angle;
    angle += item.value / total * Math.PI * 2;
    return { ...item, start, end: angle };
  }) };
}
function pieSector(start, end, donut) {
  const polar = (radius, angle) => [PIE.center + radius * Math.cos(angle), PIE.center + radius * Math.sin(angle)];
  const [outerStartX, outerStartY] = polar(PIE.outerRadius, start);
  const [outerEndX, outerEndY] = polar(PIE.outerRadius, end);
  const large = end - start > Math.PI ? 1 : 0;
  if (!donut) return `M ${PIE.center} ${PIE.center} L ${outerStartX} ${outerStartY} A ${PIE.outerRadius} ${PIE.outerRadius} 0 ${large} 1 ${outerEndX} ${outerEndY} Z`;
  const [innerEndX, innerEndY] = polar(PIE.innerRadius, end);
  const [innerStartX, innerStartY] = polar(PIE.innerRadius, start);
  return `M ${outerStartX} ${outerStartY} A ${PIE.outerRadius} ${PIE.outerRadius} 0 ${large} 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${PIE.innerRadius} ${PIE.innerRadius} 0 ${large} 0 ${innerStartX} ${innerStartY} Z`;
}
function scatterGeometry(series, xDomain, yDomain) {
  const points = series.flatMap((item) => item.points).filter((point) => finite(point.x) && finite(point.y));
  const computedX = domain(points.map((point) => point.x), false);
  const computedY = domain(points.map((point) => point.y), false);
  const xLimits = xDomain && finite(xDomain[0]) && finite(xDomain[1]) && xDomain[1] > xDomain[0] ? xDomain : computedX;
  const yLimits = yDomain && finite(yDomain[0]) && finite(yDomain[1]) && yDomain[1] > yDomain[0] ? yDomain : computedY;
  const x = (value) => scale(value, xLimits, CHART.left, CHART.left + plotWidth);
  const y = (value) => scale(value, yLimits, CHART.top + CHART.height - CHART.top - CHART.bottom, CHART.top);
  return { points, xLimits, yLimits, x, y };
}

// src/vanilla/components/BarChart/BarChart.ts
function renderBarChart(figure, options) {
  const { title, description, labels, series, orientation = "vertical", stacked = false, valueDomain, showLegend = true, formatValue = formatChartValue } = options;
  const { horizontal, height, left, limits, hasData, categoryBand, step, barsForSeries } = barGeometry(labels, series, orientation, stacked, valueDomain, formatValue);
  const plot = chartShell(figure, title, description, showLegend && series.length > 1 ? series.map((item) => item.name) : void 0);
  if (hasData) {
    const chart = svg("svg", { viewBox: `0 0 ${CHART.width} ${height}`, role: "img", "aria-label": `${title}, ${horizontal ? "horizontal " : ""}${stacked ? "stacked " : ""}bar chart` });
    if (horizontal) {
      chart.append(horizontalGrid(limits, height, left));
      const axes = svg("g", { "aria-hidden": "true" });
      labels.forEach((label, index) => axes.append(svg("text", { class: "soup-chart__axis-label", x: left - 10, y: CHART.top + index * categoryBand + categoryBand / 2, "text-anchor": "end", "dominant-baseline": "middle" }, label)));
      chart.append(axes);
    } else {
      chart.append(verticalGrid(limits));
      const axes = svg("g", { "aria-hidden": "true" });
      labels.forEach((label, index) => {
        if (index % step === 0 || index === labels.length - 1) axes.append(svg("text", { class: "soup-chart__axis-label", x: CHART.left + index * categoryBand + categoryBand / 2, y: CHART.top + plotHeight + 26, "text-anchor": "middle" }, label));
      });
      chart.append(axes);
    }
    series.forEach((_, seriesIndex) => {
      const group = svg("g");
      group.style.color = chartColorValue(seriesIndex);
      barsForSeries(seriesIndex).forEach((bar) => group.append(accessibleMark(svg("rect", { class: "soup-chart__bar", x: bar.x, y: bar.y, width: bar.width, height: bar.height }), bar.label)));
      chart.append(group);
    });
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ["Category", ...series.map((item) => item.name)], labels.map((label, index) => [label, ...series.map((item) => finite(item.values[index]) ? item.values[index] : "\u2014")]));
  enhanceChartTooltip(figure);
}

// src/vanilla/components/LineChart/LineChart.ts
function renderLineChart(figure, options) {
  const { title, description, labels, series, variant = "line", yDomain, showLegend = true, formatValue = formatChartValue } = options;
  const { compact, height, limits, hasData, x, baseline, step, points: pointsFor } = lineGeometry(labels, series, variant, yDomain);
  const plot = chartShell(figure, title, description, showLegend && !compact && series.length > 1 ? series.map((item) => item.name) : void 0, compact);
  if (hasData) {
    const chart = svg("svg", { viewBox: `0 0 ${CHART.width} ${height}`, role: "img", "aria-label": `${title}, ${variant} chart` });
    if (!compact) {
      chart.append(verticalGrid(limits));
      const axes = svg("g", { "aria-hidden": "true" });
      labels.forEach((label, index) => {
        if (index % step === 0 || index === labels.length - 1) axes.append(svg("text", { class: "soup-chart__axis-label", x: x(index), y: CHART.top + plotHeight + 26, "text-anchor": "middle" }, label));
      });
      chart.append(axes);
    }
    series.forEach((item, seriesIndex) => {
      const group = svg("g");
      group.style.color = chartColorValue(seriesIndex);
      const points = pointsFor(item);
      lineSegments(points).forEach((segment) => {
        const line = linePath(segment);
        const area = areaPath(segment, baseline);
        const paths = svg("g");
        if (variant === "area") paths.append(svg("path", { class: "soup-chart__area", d: area }));
        paths.append(svg("path", { class: "soup-chart__line", d: line }));
        group.append(paths);
      });
      points.filter((point) => point !== null).forEach((point) => {
        const label = `${item.name}, ${labels[point.index]}: ${formatValue(point.value)}`;
        group.append(accessibleMark(svg("circle", { class: "soup-chart__point", cx: point.x, cy: point.y, r: compact ? 4 : 5 }), label));
      });
      chart.append(group);
    });
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ["Period", ...series.map((item) => item.name)], labels.map((label, index) => [label, ...series.map((item) => finite(item.values[index]) ? item.values[index] : "\u2014")]));
  enhanceChartTooltip(figure);
}

// src/vanilla/components/PieChart/PieChart.ts
function renderPieChart(figure, options) {
  const { title, description, data, variant = "pie", centerLabel = "Total", showLegend = true, formatValue = formatChartValue } = options;
  const { slices, total } = pieGeometry(data);
  const donut = variant === "donut";
  const plot = chartShell(figure, title, description, showLegend ? slices.map((item) => item.label) : void 0, false, true);
  if (total > 0) {
    const chart = svg("svg", { class: "soup-chart__pie", viewBox: `0 0 ${PIE.size} ${PIE.size}`, role: "img", "aria-label": `${title}, ${variant} chart` });
    slices.forEach((item, index) => {
      const label = `${item.label}: ${formatValue(item.value)} (${formatChartValue(item.value / total * 100)}%)`;
      let mark;
      if (slices.length === 1 && donut) mark = svg("circle", { class: "soup-chart__ring", cx: PIE.center, cy: PIE.center, r: (PIE.outerRadius + PIE.innerRadius) / 2, "stroke-width": PIE.outerRadius - PIE.innerRadius });
      else if (slices.length === 1) mark = svg("circle", { class: "soup-chart__slice", cx: PIE.center, cy: PIE.center, r: PIE.outerRadius });
      else mark = svg("path", { class: "soup-chart__slice", d: pieSector(item.start, item.end, donut) });
      mark.style.color = chartColorValue(index);
      chart.append(accessibleMark(mark, label));
    });
    if (donut) {
      const centerGroup = svg("g", { class: "soup-chart__center", "aria-hidden": "true" });
      centerGroup.append(svg("text", { x: PIE.center, y: PIE.center - 7, "text-anchor": "middle" }, centerLabel));
      centerGroup.append(svg("text", { class: "soup-chart__center-value", x: PIE.center, y: PIE.center + 22, "text-anchor": "middle" }, formatValue(total)));
      chart.append(centerGroup);
    }
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ["Category", "Value"], data.map((item) => [item.label, item.value]));
  enhanceChartTooltip(figure);
}

// src/vanilla/components/ScatterChart/ScatterChart.ts
function renderScatterChart(figure, options) {
  const { title, description, series, xLabel = "X", yLabel = "Y", xDomain, yDomain, showLegend = true, formatX = formatChartValue, formatY = formatChartValue } = options;
  const { points, xLimits, yLimits, x, y } = scatterGeometry(series, xDomain, yDomain);
  const plot = chartShell(figure, title, description, showLegend && series.length > 1 ? series.map((item) => item.name) : void 0);
  if (points.length) {
    const chart = svg("svg", { viewBox: `0 0 ${CHART.width} ${CHART.height}`, role: "img", "aria-label": `${title}, scatter plot` });
    chart.append(verticalGrid(yLimits), horizontalGrid(xLimits));
    const axisLabels = svg("g", { "aria-hidden": "true" });
    axisLabels.append(svg("text", { class: "soup-chart__axis-title", x: CHART.width / 2, y: CHART.height - 4, "text-anchor": "middle" }, xLabel));
    axisLabels.append(svg("text", { class: "soup-chart__axis-title", x: 14, y: CHART.height / 2, "text-anchor": "middle", transform: `rotate(-90 14 ${CHART.height / 2})` }, yLabel));
    chart.append(axisLabels);
    series.forEach((item, seriesIndex) => {
      const group = svg("g");
      group.style.color = chartColorValue(seriesIndex);
      item.points.filter((point) => finite(point.x) && finite(point.y)).forEach((point) => {
        const label = `${item.name}${point.label ? `, ${point.label}` : ""}: ${xLabel} ${formatX(point.x)}, ${yLabel} ${formatY(point.y)}`;
        group.append(accessibleMark(svg("circle", { class: "soup-chart__point soup-chart__point--scatter", cx: x(point.x), cy: y(point.y), r: 6 }), label));
      });
      chart.append(group);
    });
    plot.append(chart);
  } else chartEmpty(plot);
  chartTable(figure, title, ["Series", "Point", xLabel, yLabel], series.flatMap((item) => item.points.map((point) => [item.name, point.label ?? "\u2014", point.x, point.y])));
  enhanceChartTooltip(figure);
}

// src/vanilla/stories/chart-from-data.ts
renderBarChart(document.querySelector("#bar-chart"), {
  title: "Projects by quarter",
  description: "New projects started",
  labels: ["Q1", "Q2", "Q3", "Q4"],
  series: [{ name: "Projects", values: [8, 12, 10, 16] }]
});
renderLineChart(document.querySelector("#line-chart"), {
  title: "Work completed",
  description: "Tasks completed each month",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series: [{ name: "Design", values: [12, 18, 16, 25, 28, 34] }, { name: "Engineering", values: [9, 14, 20, 22, 31, 38] }]
});
renderPieChart(document.querySelector("#pie-chart"), {
  title: "Team allocation",
  description: "Share of planned work by discipline",
  data: [{ label: "Design", value: 42 }, { label: "Engineering", value: 30 }, { label: "Research", value: 18 }, { label: "Operations", value: 10 }],
  formatValue: (value) => `${value}%`
});
renderScatterChart(document.querySelector("#scatter-chart"), {
  title: "Time and completion",
  description: "Each point represents one project",
  xLabel: "Weeks",
  yLabel: "Completion %",
  series: [{ name: "Projects", points: [{ x: 2, y: 62, label: "Atlas" }, { x: 3, y: 75, label: "Orion" }, { x: 5, y: 83, label: "Meridian" }, { x: 7, y: 79, label: "Nova" }, { x: 8, y: 94, label: "Helix" }] }],
  formatY: (value) => `${value}%`
});
