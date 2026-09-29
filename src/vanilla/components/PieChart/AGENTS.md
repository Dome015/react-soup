# PieChart in plain HTML

Use pie for a few positive parts of one total, and donut when a center total helps. Fixed chart markup is directly copyable from the HTML stories. For changing data, author `<figure class="soup-chart" id="allocation"></figure>` and import `renderPieChart` from `src/vanilla/components/PieChart/PieChart.ts`:

```ts
renderPieChart(document.querySelector<HTMLElement>('#allocation')!, {
  title: 'Team allocation', data: [
    { label: 'Design', value: 42 },
    { label: 'Engineering', value: 30 },
  ], variant: 'donut', centerLabel: 'Planned',
});
```

The renderer excludes non-positive and non-finite values from slices, keeps all supplied data in the accessible table, and shows the empty state when the total is zero. It updates the SVG, legend, center label, table, and tooltip listeners together. Use real category labels and disclose exact values; color is not the only cue. `formatValue` can add a unit. A fixed chart needs no renderer, and `src/vanilla/dist/behavior.js` optionally adds tooltips to its authored marks.

Inspect all files under `../../stories/Components/PieChart/` and `../../stories/ChartFromData.html`. Compare against `src/react/stories/PieChart.stories.tsx` in auto, light, and dark themes and at narrow width.
