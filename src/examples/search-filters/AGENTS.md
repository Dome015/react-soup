# Search Filters example

`Example.tsx` exports `SearchFiltersExample` and composes the library from `src/index.ts`. Storybook exposes it under `Examples/Search Filters`. Shared example-only presentation rules are in `src/examples/examples.css`; its visual values still come from `src/styles/theme.css`.

## Pattern

Use when users must narrow a collection. Search, type, and status are independent controls; results update from their combined state. The `Dropdown` type filter combines multi-selection and option search. Show a result count and a clear-filters action. Use an empty-result message when nothing matches.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
