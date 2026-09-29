# Table Toolbar: vanilla example

HTML states: CompletePattern.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use for a people or records table with search, a categorical filter, a row count, and export/invite actions. Put the toolbar above the table and keep filter labels accessible. The Export button is illustrative and needs real export behavior in a host app.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

`example.ts` contains only this page's state transitions. Load the prebuilt `src/vanilla/dist/examples/table-toolbar/example.js` after `dist/behavior.js`, as the standalone HTML does. Keep form submissions and state changes in the page script; do not instantiate simple components in JavaScript.

Compare the same state and interaction with `src/react/examples/table-toolbar/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
