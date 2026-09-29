# Authentication example

`Example.tsx` exports `AuthenticationExample` and composes the library from `src/react/index.ts`. Storybook exposes it under `Examples/Authentication`. Shared example-only presentation rules are in `src/shared/styles/examples.css`; its visual values still come from `src/shared/styles/theme.css`.

## Pattern

Use for sign-in screens. Native email and password inputs keep browser autofill and validation. The primary button submits; Link navigates to account creation. Never use a placeholder in place of a label. The demo toast replaces a real authentication response.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
