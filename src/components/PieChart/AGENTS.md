# PieChart

Use `PieChart` for a small set of nonnegative parts of one whole. `variant="donut"` adds a center total; it uses the same data and color scale as the standard pie. Use BarChart when precise comparisons matter or there are many categories.

## API

- `title` is required and names the chart for assistive technology.
- `data` is `{ label: string; value: number }[]`. Positive finite values become slices. Zero and negative values remain in the accessible data table but are not drawn.
- `variant` is `pie` (default) or `donut`. `centerLabel` labels the donut total.
- `description`, `showLegend`, `formatValue`, and `className` are optional.

```tsx
import { PieChart } from '../../index';
<PieChart title="Allocation" data={[{ label: 'Design', value: 40 }, { label: 'Engineering', value: 60 }]} variant="donut" formatValue={value => `${value}%`} />
```

Slices expose values on hover and keyboard focus. Every chart includes a visually hidden data table. Keep labels short, avoid more than six slices, and explain percentages in the title or description. Empty data shows a clear empty state. Styling and all aesthetic values live in `src/styles`; see `src/stories/PieChart.stories.tsx` and `src/examples/charts`.
The figure uses the smaller pie width token, so it stays compact inside a wide page container.
