# Crud List example

`Example.tsx` exports `CrudListExample` and composes the library from `src/index.ts`. Storybook exposes it under `Examples/Crud List`. Shared example-only presentation rules are in `src/examples/examples.css`; its visual values still come from `src/styles/theme.css`.

## Pattern

Use for a list of editable records. The toolbar owns creation, the Table displays comparable fields, Badge makes status textual, DropdownMenu gathers row actions, and Dialog confirms deletion. Keep row actions tied to the selected record. This example mutates local demo state.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
