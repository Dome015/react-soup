# Destructive Action Flow example

`Example.tsx` exports `DestructiveActionFlowExample` and composes the library from `src/index.ts`. Storybook exposes it under `Examples/Destructive Action Flow`. Shared example-only presentation rules are in `src/examples/examples.css`; its visual values still come from `src/styles/theme.css`.

## Pattern

Use for a permanent, high-impact operation. Explain the consequence on the page, use a danger Button, and require the exact workspace name inside Dialog. The final action stays disabled until the name matches. Do not add this typed-confirmation friction to routine actions.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
