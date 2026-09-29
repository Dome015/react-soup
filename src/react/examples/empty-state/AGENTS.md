# Empty State example

`Example.tsx` exports `EmptyStateExample` and composes the library from `src/react/index.ts`. Storybook exposes it under `Examples/Empty State`. Shared example-only presentation rules are in `src/shared/styles/examples.css`; its visual values still come from `src/shared/styles/theme.css`.

## Pattern

Use when a collection has no content yet. Explain what belongs here and give one primary creation action plus optional help. Do not use an error Alert for a normal first-use state.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
