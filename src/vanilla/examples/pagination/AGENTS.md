# Pagination: vanilla example

HTML states: CompletePattern.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use for a long list split into pages. The example passes a sorted page of rows, a controlled sort, and a page count to Table to demonstrate server-managed data. Pagination includes page numbers, ellipses, and first/previous/next/last actions. Real apps should connect these state changes to data fetching or URL state.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

This view is expressed directly in HTML. The shared stylesheet supplies its appearance; add only page-specific event handlers if a host workflow needs them. Any visible example button that is a demonstration placeholder must be connected to a real host action before production use.

Compare the same state and interaction with `src/react/examples/pagination/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
