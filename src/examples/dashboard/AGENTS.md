# Dashboard example

`Example.tsx` exports `DashboardExample` and composes the library from `src/index.ts`. Storybook exposes it under `Examples/Dashboard`. Shared example-only presentation rules are in `src/examples/examples.css`; its visual values still come from `src/styles/theme.css`.

## Pattern

Use for a high-level overview. Start with one primary action, follow with a concise stat grid, a trend chart, then a table of recent records. Keep numbers, labels, and status text aligned. Replace sample data with actual metrics in a host app.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
