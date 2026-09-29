// src/shared/charts.ts
var CHART = { width: 640, height: 320, left: 60, right: 20, top: 20, bottom: 48, ticks: 4 };
var plotWidth = CHART.width - CHART.left - CHART.right;
var plotHeight = CHART.height - CHART.top - CHART.bottom;
var palette = [1, 2, 3, 4, 5, 6];
function chartColorValue(index) {
  return `var(--soup-chart-color-${palette[index % palette.length]})`;
}
function finite(value) {
  return Number.isFinite(value);
}
function tickStep(span) {
  const rough = span / CHART.ticks;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const scaled = rough / magnitude;
  const multiple = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return multiple * magnitude;
}
function axisTicks(limits) {
  const step = tickStep(limits[1] - limits[0]);
  const first = Math.ceil(limits[0] / step - 1e-10);
  const last = Math.floor(limits[1] / step + 1e-10);
  return Array.from({ length: Math.max(0, last - first + 1) }, (_, index) => Number(((first + index) * step).toPrecision(12)));
}
function domain(values, includeZero = true) {
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
function scale(value, limits, start, end) {
  return start + (value - limits[0]) / (limits[1] - limits[0]) * (end - start);
}
function formatChartValue(value) {
  return new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }).format(value);
}
function formatChartTick(value) {
  return new Intl.NumberFormat(void 0, { maximumFractionDigits: 4, notation: "compact" }).format(value);
}

// src/vanilla/components/Chart/shared.ts
var SVG_NS = "http://www.w3.org/2000/svg";
function svg(tag, attributes = {}, value) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, attribute] of Object.entries(attributes)) node.setAttribute(key, String(attribute));
  if (value !== void 0) node.textContent = value;
  return node;
}
function chartShell(figure, title, description, legend, compact = false, pie = false) {
  figure.classList.add("soup-chart");
  figure.classList.toggle("soup-chart--sparkline", compact);
  figure.classList.toggle("soup-chart--pie", pie);
  const header = document.createElement("figcaption");
  header.className = "soup-chart__header";
  const strong = document.createElement("strong");
  strong.textContent = title;
  header.append(strong);
  if (description) {
    const detail = document.createElement("span");
    detail.textContent = description;
    header.append(detail);
  }
  const plot = document.createElement("div");
  plot.className = "soup-chart__plot";
  figure.replaceChildren(header, plot);
  if (legend?.length) {
    const list = document.createElement("ul");
    list.className = "soup-chart__legend";
    list.setAttribute("aria-label", "Legend");
    legend.forEach((label, index) => {
      const item = document.createElement("li");
      item.style.color = chartColorValue(index);
      const swatch = document.createElement("span");
      swatch.className = "soup-chart__swatch";
      swatch.setAttribute("aria-hidden", "true");
      const name = document.createElement("span");
      name.textContent = label;
      item.append(swatch, name);
      list.append(item);
    });
    figure.append(list);
  }
  return plot;
}
function chartTable(figure, title, headers, rows) {
  const table = document.createElement("table");
  table.className = "soup-chart__data";
  const caption = document.createElement("caption");
  caption.textContent = `${title} data`;
  table.append(caption);
  const head = table.createTHead().insertRow();
  headers.forEach((header) => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = header;
    head.append(cell);
  });
  const body = table.createTBody();
  rows.forEach((row) => {
    const tr = body.insertRow();
    row.forEach((value) => {
      tr.insertCell().textContent = String(value);
    });
  });
  figure.append(table);
}
function chartEmpty(plot) {
  const empty = document.createElement("div");
  empty.className = "soup-chart__empty";
  empty.setAttribute("role", "status");
  empty.textContent = "No data available";
  plot.append(empty);
}
function verticalGrid(limits) {
  const group = svg("g", { "aria-hidden": "true" });
  axisTicks(limits).forEach((value) => {
    const y = scale(value, limits, CHART.top + plotHeight, CHART.top);
    const tick = svg("g");
    tick.append(svg("line", { class: "soup-chart__grid", x1: CHART.left, x2: CHART.left + plotWidth, y1: y, y2: y }));
    tick.append(svg("text", { class: "soup-chart__axis-label", x: CHART.left - 10, y, "text-anchor": "end", "dominant-baseline": "middle" }, formatChartTick(value)));
    group.append(tick);
  });
  return group;
}
function horizontalGrid(limits, height = CHART.height, left = CHART.left) {
  const group = svg("g", { "aria-hidden": "true" });
  const bottom = height - CHART.bottom;
  const width = CHART.width - left - CHART.right;
  axisTicks(limits).forEach((value) => {
    const x = scale(value, limits, left, left + width);
    const tick = svg("g");
    tick.append(svg("line", { class: "soup-chart__grid", x1: x, x2: x, y1: CHART.top, y2: bottom }));
    tick.append(svg("text", { class: "soup-chart__axis-label", x, y: bottom + 22, "text-anchor": "middle" }, formatChartTick(value)));
    group.append(tick);
  });
  return group;
}
var chartListeners = /* @__PURE__ */ new WeakMap();
function enhanceChartTooltip(figure) {
  chartListeners.get(figure)?.abort();
  const listeners = new AbortController();
  chartListeners.set(figure, listeners);
  const plot = figure.querySelector(".soup-chart__plot");
  if (!plot) return () => listeners.abort();
  const show = (mark) => {
    plot.querySelector(".soup-chart__tooltip")?.remove();
    const label = mark.getAttribute("aria-label");
    if (!label) return;
    const tooltip = document.createElement("div");
    tooltip.className = "soup-chart__tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.textContent = label;
    plot.append(tooltip);
  };
  const hide = () => plot.querySelector(".soup-chart__tooltip")?.remove();
  figure.querySelectorAll(".soup-chart__point, .soup-chart__bar, .soup-chart__slice, .soup-chart__ring").forEach((mark) => {
    mark.addEventListener("mouseenter", () => show(mark), { signal: listeners.signal });
    mark.addEventListener("mouseleave", hide, { signal: listeners.signal });
    mark.addEventListener("focus", () => show(mark), { signal: listeners.signal });
    mark.addEventListener("blur", hide, { signal: listeners.signal });
  });
  return () => {
    listeners.abort();
    hide();
  };
}
function accessibleMark(mark, label) {
  mark.setAttribute("tabindex", "0");
  mark.setAttribute("aria-label", label);
  mark.append(svg("title", {}, label));
  return mark;
}

export {
  CHART,
  plotWidth,
  plotHeight,
  chartColorValue,
  finite,
  domain,
  scale,
  formatChartValue,
  svg,
  chartShell,
  chartTable,
  chartEmpty,
  verticalGrid,
  horizontalGrid,
  enhanceChartTooltip,
  accessibleMark
};
