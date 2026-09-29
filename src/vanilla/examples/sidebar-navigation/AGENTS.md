# Sidebar Navigation: vanilla example

HTML states: CompletePattern.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use when a product has several stable top-level sections. Mark the current item with aria-current and give the nav an accessible label. The example uses buttons to switch local demo content; use actual links for URL navigation in a real app.

At narrow widths, the sidebar stacks above the page, keeps its natural content height, and uses a bottom divider. At wide widths, it fills the page height and uses a side divider. The responsive shell height and border widths come from theme tokens.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

`example.ts` contains only this page's state transitions. Load the prebuilt `src/vanilla/dist/examples/sidebar-navigation/example.js` after `dist/behavior.js`, as the standalone HTML does. Keep form submissions and state changes in the page script; do not instantiate simple components in JavaScript.

Compare the same state and interaction with `src/react/examples/sidebar-navigation/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
