# Profile Screen example

`Example.tsx` exports `ProfileScreenExample` and composes the library from `src/index.ts`. Storybook exposes it under `Examples/Profile Screen`. Shared example-only presentation rules are in `src/examples/examples.css`; its visual values still come from `src/styles/theme.css`.

## Pattern

Use for a person profile. Lead with identity and role, then separate About, Contact, and Activity into coherent Cards. Textual status accompanies color. Edit profile is illustrative and should open a real edit flow in a host app.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.
