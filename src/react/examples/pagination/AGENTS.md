# Pagination example

`Example.tsx` exports `PaginationExample` and composes the library from `src/react/index.ts`. Storybook exposes it under `Examples/Pagination`. Shared example-only presentation rules are in `src/shared/styles/examples.css`; its visual values still come from `src/shared/styles/theme.css`.

## Pattern

Use for a long list split into pages. The example passes a sorted page of rows, a controlled sort, and a page count to Table to demonstrate server-managed data. Pagination includes page numbers, ellipses, and first/previous/next/last actions. Real apps should connect these state changes to data fetching or URL state.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
