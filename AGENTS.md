# React Soup: agent entry point

React Soup is a small, vendorable React component library. Its visual direction is Swiss graphic design: Helvetica, strong hierarchy, sharp geometry, disciplined grids, high contrast, a blue primary accent, and red reserved for danger. The images in `inspo/` are inspiration, not assets to copy into components.

## Golden rules

1. **No hardcoded aesthetic values in component or example CSS.** Every color, spacing value, font metric, border width, radius, shadow, size, duration, opacity, and layout measurement belongs in `src/styles/theme.css` as a semantic `--soup-*` token. Reference those tokens with `var(...)` everywhere else. Add a token only after checking for a suitable existing one. Keep light and dark values for color tokens together in the theme.
2. **Use one visual language.** Reuse the standard control height, spacing scale, typography, border, and focus treatment. Avoid one-off variants or new colors for a single component. Prefer composition of existing components.
   Keep rectangular surfaces square. Use borders when they clarify an interactive edge; adjacent trigger and popup borders should overlap. Circular avatar and switch shapes are intentional exceptions. Do not add eyebrow text or eyebrow styling to examples.
3. **Support three theme states.** With no `data-theme` attribute, or with `data-theme="auto"`, system color preference selects light or dark. `data-theme="light"` and `data-theme="dark"` force a mode. Check new components in both explicit modes and auto mode.
4. **Keep vendored runtime code self-contained.** React and React DOM are peer dependencies supplied by the host project. Components use only React and local source files. Icons are maintained locally in `src/components/Icon`; do not add an icon package casually. Storybook and build tools are development-only and must not leak into `src/components`.
5. **Preserve accessibility.** Use semantic HTML, labels, visible focus, keyboard behavior, and native controls where possible. Do not replace a semantic element with a generic div for appearance.
6. **Document changes for agents.** Update the nearest `AGENTS.md`, the component's Storybook story, relevant examples, and this guide if conventions change.

## Where to go

- `src/styles/AGENTS.md`: token and theme contract; read before changing CSS.
- `src/components/AGENTS.md`: component inventory and selection guide. Each component directory has its own `AGENTS.md` with API guidance and examples.
- `src/stories/AGENTS.md`: Storybook conventions and interactive states.
- `src/examples/AGENTS.md`: complete page and pattern examples, with a guide in every example directory.
- `vendor/AGENTS.md`: runtime dependency policy and vendor inventory.

## Vendor into another React project

Copy `src/components`, `src/styles`, and `src/index.ts`. Import `src/styles/index.css` once in the host app and import components from the copied `src/index.ts`. The host must provide compatible React and React DOM. Do not copy Storybook, examples, or development packages unless useful for reference. Keep the AGENTS files with the copied code for future agents.

## Work order for additions

Choose an existing primitive, add or adjust theme tokens, implement the component, document its API, add a story for normal and edge states, then use it in a relevant example. Run `npm run typecheck` and `npm run build-storybook`. Check both light and dark appearances.
