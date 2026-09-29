# Search Filters: vanilla example

HTML states: CombinedFilters.html, CompletePattern.html, NoMatches.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use when users must narrow a collection. Search, type, and status are independent controls; results update from their combined state. The `Dropdown` type filter combines multi-selection and option search. Show a result count and a clear-filters action. Use an empty-result message when nothing matches.

Storybook also seeds combined filters and a no-match result. Use those stories to check that clearing returns the full list, and that each filter continues to work when the others are active. The empty result is a filter outcome; do not confuse it with a collection that contains no records.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

`example.ts` contains only this page's state transitions. Load the prebuilt `src/vanilla/dist/examples/search-filters/example.js` after `dist/behavior.js`, as the standalone HTML does. Keep form submissions and state changes in the page script; do not instantiate simple components in JavaScript.

Compare the same state and interaction with `src/react/examples/search-filters/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
