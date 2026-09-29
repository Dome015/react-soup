# Table Toolbar example

`Example.tsx` exports `TableToolbarExample` and composes the library from `src/react/index.ts`. Storybook exposes it under `Examples/Table Toolbar`. Shared example-only presentation rules are in `src/shared/styles/examples.css`; its visual values still come from `src/shared/styles/theme.css`.

## Pattern

Use for a people or records table with search, a categorical filter, a row count, and export/invite actions. Put the toolbar above the table and keep filter labels accessible. The Export button is illustrative and needs real export behavior in a host app.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
