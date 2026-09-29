# ScatterChart in plain HTML

Use scatter for paired numeric observations. Fixed charts can use the HTML story markup directly. For changing data, author `<figure class="soup-chart" id="outcomes"></figure>` and import `renderScatterChart` from `src/vanilla/components/ScatterChart/ScatterChart.ts`:

```ts
renderScatterChart(document.querySelector<HTMLElement>('#outcomes')!, {
  title: 'Time and completion', xLabel: 'Weeks', yLabel: 'Completion %',
  series: [{ name: 'Projects', points: [{ x: 2, y: 62, label: 'Atlas' }] }],
});
```

Call it again when observations change. Each finite point is keyboard focusable and exposes its series, optional point name, and both values. The renderer updates axes, optional legend, accessible data table, empty state, and tooltip listeners. `xDomain` and `yDomain` must be finite, increasing pairs; otherwise they are calculated from data. `formatX` and `formatY` format point labels. A fixed chart needs no renderer, and `src/vanilla/behavior.ts` optionally adds tooltips.

Inspect all files under `../../stories/Components/ScatterChart/` and `../../stories/ChartFromData.html`. Compare against `src/react/stories/ScatterChart.stories.tsx` in auto, light, and dark themes and at narrow width.
