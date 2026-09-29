# Charts: vanilla example

HTML states: CompletePattern.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

# Charts example

`Example.tsx` exports `ChartsExample`; Storybook exposes it under `Examples/Charts`. It composes all four chart primitives into an analytics screen without adding chart-specific CSS.

Use a line chart for change over time, bars for category comparison, a donut for parts of a whole, and scatter for the relationship between two numbers. Give each chart its own row; the component's theme-controlled maximum width keeps it in scale with surrounding content. Cartesian plots scroll horizontally on narrow screens to keep axis labels legible. Keep titles descriptive, units in descriptions or axis labels, and series names meaningful. Supply real data in a host application. Consult each chart directory's `AGENTS.md` for data shape, empty states, and accessibility behavior.

## Vanilla implementation

This view is expressed directly in HTML. The shared stylesheet supplies its appearance; add only page-specific event handlers if a host workflow needs them. Any visible example button that is a demonstration placeholder must be connected to a real host action before production use.

Compare the same state and interaction with `src/react/examples/charts/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
