# Confirmation Dialog example

`Example.tsx` exports `ConfirmationDialogExample` and composes the library from `src/react/index.ts`. Storybook exposes it under `Examples/Confirmation Dialog`. Shared example-only presentation rules are in `src/shared/styles/examples.css`; its visual values still come from `src/shared/styles/theme.css`.

## Pattern

Use for an important non-destructive decision before publishing. The page shows context before opening the modal; Dialog presents a clear title, effect, cancel action, and final action. The visible status changes after confirmation.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
