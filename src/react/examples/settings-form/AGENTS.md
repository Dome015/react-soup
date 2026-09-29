# Settings Form example

`Example.tsx` exports `SettingsFormExample` and composes the library from `src/react/index.ts`. Storybook exposes it under `Examples/Settings Form`. Shared example-only presentation rules are in `src/shared/styles/examples.css`; its visual values still come from `src/shared/styles/theme.css`.

## Pattern

Use for a multi-section settings page with a clear save action. Field provides visible labels and hint IDs; the searchable Dropdown handles timezones; Tabs keep peer settings sections together. Native date and time Inputs capture the next review and reminder time, with timezone kept as a separate value. The Switch represents a setting, and Toast confirms a completed save. Keep form values controlled and do not show a success toast before submission succeeds.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
