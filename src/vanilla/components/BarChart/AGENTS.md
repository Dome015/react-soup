# BarChart in plain HTML

For fixed data, copy the semantic `<figure class="soup-chart">` from the matching HTML story. It contains a figcaption, accessible SVG bars, optional legend, and a data table. No script is needed to display a fixed chart; load the optional `src/vanilla/behavior.ts` only if focus/hover tooltips are needed.

For changing data, keep an existing `<figure class="soup-chart" id="work-chart"></figure>` in the HTML and import `renderBarChart` from `src/vanilla/components/BarChart/BarChart.ts`:

```ts
renderBarChart(document.querySelector<HTMLElement>('#work-chart')!, {
  title: 'Projects by quarter',
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [{ name: 'Projects', values: [8, 12, 10, 16] }],
});
```

Call it again when the data changes. It reuses the shared chart math and theme tokens, and updates the SVG, accessible table, legend, empty state, and tooltip listeners together. `orientation` can be `vertical` or `horizontal`; `stacked` combines series. `valueDomain` must contain zero and have a positive span. Invalid numbers are omitted. Use a real title and description; do not rely on the SVG alone to communicate values. The data table remains available to assistive technology.

Inspect all files under `../../stories/Components/BarChart/` and the live renderer demonstration at `../../stories/ChartFromData.html`. Compare against `src/react/stories/BarChart.stories.tsx` in auto, light, and dark themes and at narrow width.
