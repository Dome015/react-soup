# Profile Screen: vanilla example

HTML states: CompletePattern.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use for a person profile. Lead with identity and role, then separate About, Contact, and Activity into coherent Cards. Textual status accompanies color. Edit profile is illustrative and should open a real edit flow in a host app.

Copy the composition pattern into an app, adapt the data and actions, and keep the component and accessibility contracts from each component AGENTS guide.

## Vanilla implementation

This view is expressed directly in HTML. The shared stylesheet supplies its appearance; add only page-specific event handlers if a host workflow needs them. Any visible example button that is a demonstration placeholder must be connected to a real host action before production use.

Compare the same state and interaction with `src/react/examples/profile-screen/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
