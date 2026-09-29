# React Soup: agent entry point

React Soup is a small, vendorable React component library. Its visual direction is Swiss graphic design: Helvetica, strong hierarchy, sharp geometry, disciplined grids, high contrast, a blue primary accent, and red reserved for danger. The images in `inspo/` are inspiration, not assets to copy into components.

## Golden rules

1. **No hardcoded aesthetic values in component or example CSS.** Every color, spacing value, font metric, border width, radius, shadow, size, duration, opacity, and layout measurement belongs in `src/shared/styles/theme.css` as a semantic `--soup-*` token. Reference those tokens with `var(...)` everywhere else. Add a token only after checking for a suitable existing one. Keep light and dark values for color tokens together in the theme.
2. **Use one visual language.** Reuse the standard control height, spacing scale, typography, border, and focus treatment. Avoid one-off variants or new colors for a single component. Prefer composition of existing components.
   Keep rectangular surfaces square. Use borders when they clarify an interactive edge; adjacent trigger and popup borders should overlap. Circular avatar and switch shapes are intentional exceptions. Do not add eyebrow text or eyebrow styling to examples.
   Text controls, action triggers, tabs, and tree rows share the medium control height and small control text tokens. Icon-only triggers use the icon control width. Card, dialog, and chart section titles share the large title token. Keep example-wide element selectors low specificity so they cannot override component internals.
3. **Support three theme states.** With no `data-theme` attribute, or with `data-theme="auto"`, system color preference selects light or dark. `data-theme="light"` and `data-theme="dark"` force a mode. Check new components in both explicit modes and auto mode.
4. **Keep vendored runtime code self-contained.** Vendor `src/shared` with either implementation. React and React DOM are peer dependencies supplied by a React host; vanilla runtime code uses browser APIs and no framework. TypeScript is a development tool in both implementations. The checked-in `src/vanilla/dist` contains browser-ready JavaScript; rebuild it with `npm run build-vanilla` whenever vanilla TypeScript changes. Shared icons live in `src/shared`; do not add an icon package casually. Storybook and build tools are development-only and must not leak into runtime components.
5. **Preserve accessibility.** Use semantic HTML, labels, visible focus, keyboard behavior, and native controls where possible. Do not replace a semantic element with a generic div for appearance.
   Prefer native date/time and file Inputs and native Progress. A loading Button must keep a meaningful visible label and prevent repeat activation. Breadcrumbs need real ancestor links and a marked current page.
6. **Document changes for agents.** Update the nearest `AGENTS.md`, the component's Storybook story, relevant examples, and this guide if conventions change.
7. **Keep the implementations equivalent.** Every public component, story, and example in `src/react` has a counterpart in `src/vanilla`. Compare the rendered results side by side in light, dark, and auto modes, at narrow and wide widths, and exercise the same interaction and accessibility states. Shared behavior or visual values belong in `src/shared` instead of duplicated source.

## Where to go

- `src/shared/AGENTS.md` and `src/shared/styles/AGENTS.md`: shared code, tokens, and theme contract; read before changing CSS.
- `src/react/AGENTS.md` and `src/react/components/AGENTS.md`: React component inventory and selection guide.
- `src/vanilla/AGENTS.md` and `src/vanilla/components/AGENTS.md`: semantic markup, TypeScript controllers, and selection guide.
- Each implementation's `stories/AGENTS.md` and `examples/AGENTS.md`: interactive states and complete page patterns.
- `vendor/AGENTS.md`: runtime dependency policy and vendor inventory.

## Vendor into another project

Always copy `src/shared` and one implementation directory: `src/react` for React projects or `src/vanilla` for framework-free projects. Include that implementation's `components`, `stories`, `examples`, and AGENTS files so future agents have working usage patterns. React projects also copy `src/react/index.ts` and may merge the root `.storybook` configuration. Vanilla projects must include the complete `src/vanilla/dist` directory and load `dist/behavior.js` once when an interactive Soup pattern is used. The standalone HTML examples reference prebuilt JavaScript in `dist`; the parity gallery also expects this repository's React Storybook build. Import `src/shared/styles/index.css` once in the host app. React projects supply compatible React and React DOM. Vanilla hosts do not need a TypeScript build step. Storybook, esbuild, and TypeScript are library development dependencies, never vanilla browser runtime dependencies.

## Work order for additions

Choose an existing primitive, add or adjust theme tokens, implement the component, document its API, add a story for normal and edge states, then use it in a relevant example. Run `npm run typecheck` and `npm run build-storybook`; after changing vanilla TypeScript, also run `npm run build-vanilla` and commit the generated `dist` files.

**Visual browser validation is required for every component or example change.** Open the relevant Storybook stories in a real browser, inspect the rendered result, and exercise interactive, focus, empty, and edge states as applicable. Check explicit light and dark themes plus auto theme; inspect narrow and wide layouts when sizing may change. Fix visible glitches before considering the work complete. A successful build alone is not visual validation.
