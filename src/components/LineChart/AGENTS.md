# LineChart

Use `LineChart` for ordered changes, usually over time. `variant="area"` emphasizes magnitude beneath each line. `variant="sparkline"` gives a compact trend without visible axes or legend; pair it with a nearby metric.

## API

- `title`, `labels`, and `series` are required. A series is `{ name: string; values: number[] }`; values align by index with labels.
- `variant` is `line` (default), `area`, or `sparkline`.
- `yDomain` overrides the numeric range when its finite upper value exceeds its lower value. The default line/area range includes zero; sparkline uses a padded data range.
- `description`, `showLegend`, `formatValue`, and `className` are optional.

```tsx
import { LineChart } from '../../index';
<LineChart title="Weekly orders" labels={['Mon', 'Tue', 'Wed']} series={[{ name: 'Orders', values: [12, 18, 15] }]} />
```

Nonfinite or missing values create gaps instead of a misleading connecting line. Points expose values on hover and keyboard focus. A visually hidden data table preserves all labels and values. Empty data shows a clear empty state. Styling and colors come from `src/styles`; see `src/stories/LineChart.stories.tsx` and `src/examples/charts`.
The chart fills its parent up to the shared chart width token; the plot scrolls internally on narrow screens.
