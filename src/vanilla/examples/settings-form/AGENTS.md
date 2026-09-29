# Settings Form: vanilla example

HTML states: CompletePattern.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use for a multi-section settings page with a clear save action. Field provides visible labels and hint IDs; the searchable Dropdown handles timezones; Tabs keep peer settings sections together. Native date and time Inputs capture the next review and reminder time, with timezone kept as a separate value. The Switch represents a setting, and Toast confirms a completed save. Keep form values controlled and do not show a success toast before submission succeeds.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

`example.ts` contains only this page's state transitions. Load the prebuilt `src/vanilla/dist/examples/settings-form/example.js` after `dist/behavior.js`, as the standalone HTML does. Keep form submissions and state changes in the page script; do not instantiate simple components in JavaScript.

Compare the same state and interaction with `src/react/examples/settings-form/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
