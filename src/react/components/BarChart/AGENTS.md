# BarChart

Use `BarChart` to compare categories. A single series is a simple bar chart; multiple series group by category by default. Set `stacked` for part-to-whole totals and `orientation="horizontal"` for category names that read better in a vertical list. Horizontal and stacked can be combined.

## API

- `title`, `labels`, and `series` are required. A series is `{ name: string; values: number[] }`; values align with category labels.
- `orientation` is `vertical` (default) or `horizontal`; `stacked` defaults to false.
- `valueDomain` can override the numeric range if it is finite, ascending, and includes zero. Negative values extend from the zero baseline; stacked positive and negative totals accumulate separately.
- `description`, `showLegend`, `formatValue`, and `className` are optional.

```tsx
import { BarChart } from '../../index';
<BarChart title="Work by team" labels={['Q1', 'Q2']} series={[{ name: 'Design', values: [12, 18] }, { name: 'Engineering', values: [16, 20] }]} stacked />
```

Bars expose values on hover and keyboard focus. A visually hidden data table provides exact values. Use grouped bars for direct series comparison; stacked bars for total and composition. Empty data shows a clear empty state. Styling and colors come from `src/shared/styles`; see `src/react/stories/BarChart.stories.tsx` and `src/react/examples/charts`.
The chart fills its parent up to the shared chart width token; the plot scrolls internally on narrow screens.
