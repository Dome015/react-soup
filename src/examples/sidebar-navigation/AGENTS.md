# Sidebar Navigation example

`Example.tsx` exports `SidebarNavigationExample` and composes the library from `src/index.ts`. Storybook exposes it under `Examples/Sidebar Navigation`. Shared example-only presentation rules are in `src/examples/examples.css`; its visual values still come from `src/styles/theme.css`.

## Pattern

Use when a product has several stable top-level sections. Mark the current item with aria-current and give the nav an accessible label. The example uses buttons to switch local demo content; use actual links for URL navigation in a real app.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
