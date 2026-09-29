# Charts example

`Example.tsx` exports `ChartsExample`; Storybook exposes it under `Examples/Charts`. It composes all four chart primitives into an analytics screen without adding chart-specific CSS.

Use a line chart for change over time, bars for category comparison, a donut for parts of a whole, and scatter for the relationship between two numbers. Give each chart its own row; the component's theme-controlled maximum width keeps it in scale with surrounding content. Cartesian plots scroll horizontally on narrow screens to keep axis labels legible. Keep titles descriptive, units in descriptions or axis labels, and series names meaningful. Supply real data in a host application. Consult each chart directory's `AGENTS.md` for data shape, empty states, and accessibility behavior.
