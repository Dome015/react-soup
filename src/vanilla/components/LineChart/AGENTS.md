# LineChart in plain HTML

For fixed data, copy the chart figure from a LineChart HTML story. For changing data, author an existing `<figure class="soup-chart" id="trend"></figure>` and import `renderLineChart` from `src/vanilla/components/LineChart/LineChart.ts`:

```ts
renderLineChart(document.querySelector<HTMLElement>('#trend')!, {
  title: 'Work completed', labels: ['Jan', 'Feb', 'Mar'],
  series: [{ name: 'Design', values: [12, 18, 16] }],
});
```

Call it again for new data. `variant` is `line`, `area`, or `sparkline`. A sparkline is compact and omits axes and legend; keep the surrounding card's visible label and value. Use `NaN` for missing measurements so the renderer makes a visible gap instead of inventing continuity. A valid custom `yDomain` must increase. The renderer updates accessible points, the data table, optional legend, and tooltip listeners with the SVG. A static chart needs no renderer; the optional `src/vanilla/behavior.ts` adds tooltips to authored markup.

Inspect all files under `../../stories/Components/LineChart/` and `../../stories/ChartFromData.html`. Compare against `src/react/stories/LineChart.stories.tsx` in auto, light, and dark themes and at narrow width.
