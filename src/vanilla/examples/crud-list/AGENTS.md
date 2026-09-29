# Crud List: vanilla example

HTML states: CompletePattern.html, EmptyCollection.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use for a list of editable records. The toolbar owns creation, the Table displays comparable fields, Badge makes status textual, DropdownMenu gathers row actions, and Dialog confirms deletion. Keep row actions tied to the selected record. This example mutates local demo state.

The empty Storybook state keeps the create action available and shows an explanation in place of an empty table. After creating a record, the table appears. Use this small pattern when the screen needs basic create and delete actions; use `Examples/Project Workspace` when filtering, sorting, pagination, and editing also matter.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

`example.ts` holds this page’s local state transitions. The HTML states are the starting markup, and `../../behavior.ts` enhances only interactive Soup patterns. Keep the page script tied to native forms, buttons, menu events, and DOM updates; do not instantiate styled native controls through a Soup API. In a host, replace local demo mutations with persistence and show success only after it succeeds.

Compare the same state and interaction with `src/react/examples/crud-list/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
