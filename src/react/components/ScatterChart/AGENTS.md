# ScatterChart

Use `ScatterChart` to explore the relationship between two numeric measures. Each point can carry a short label for tooltip context. Multiple series distinguish cohorts using the shared chart palette.

## API

- `title` and `series` are required. Each series is `{ name: string; points: { x: number; y: number; label?: string }[] }`.
- `xLabel` and `yLabel` name the axes; supply meaningful units. Both default to `X` and `Y`.
- `xDomain` and `yDomain` optionally set finite ascending ranges; otherwise each axis uses a padded data range.
- `description`, `showLegend`, `formatX`, `formatY`, and `className` are optional.

```tsx
import { ScatterChart } from '../../index';
<ScatterChart title="Time and completion" xLabel="Weeks" yLabel="Completion %" series={[{ name: 'Projects', points: [{ x: 3, y: 72, label: 'Atlas' }] }]} />
```

Finite points expose coordinates on hover and keyboard focus. A visually hidden data table includes every supplied point. Do not connect points; use LineChart for ordered trends. Empty data shows a clear empty state. Styling and colors come from `src/shared/styles`; see `src/react/stories/ScatterChart.stories.tsx` and `src/react/examples/charts`.
The chart fills its parent up to the shared chart width token; the plot scrolls internally on narrow screens.
