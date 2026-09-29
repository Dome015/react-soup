# Storybook guide

Stories use `@storybook/react-vite` and import from `src/index.ts`. Give every public component a dedicated story file with examples of its normal state and meaningful variants, disabled/error states, or interaction. Keep story data fictional and concise. The global toolbar switches between auto, light, and dark themes. Prefer examples that teach when to use a component, not only how it looks.
Storybook sorts the sidebar alphabetically within Components, Examples, and Foundations through `.storybook/preview.tsx`; keep story titles clear and do not rely on discovery order for placement.

For `Examples/*`, expose a usable complete workflow plus meaningful initial states as separately named stories. Keep each story connected to a real example in `src/examples` rather than duplicating page markup in the story file. Seed state through explicit props so an agent can inspect an empty collection, a filtered empty result, or a pending workflow immediately. Document the state transitions, validation, and accessibility choices in that example's `AGENTS.md`.

Run `npm run storybook` for interactive review and `npm run build-storybook` for a static build. Storybook dependencies are development-only and are not part of vendored runtime sources.

Chart stories should show each supported variant, multiple series where relevant, and empty or incomplete data. Use concise fictional values and meaningful titles/units. Verify tooltip and focus states in both color themes.

`Foundations/Visual Rhythm` places controls and content from several components together. Use it as a visual regression check after changing shared font, color, spacing, or control tokens, in addition to each affected component story. Inspect it in light, dark, and auto modes and at narrow and wide widths.

Native date and time Input stories cover individual, combined, bounded, disabled, and error states. Progress stories include determinate and indeterminate values; FileUpload stories include single, multiple, required-error, and disabled states; Breadcrumbs stories include an ancestor trail and current-page-only state. Button's loading story keeps an action-specific label visible. `Examples/Document Review` composes file selection, loading, and progress in a real local read workflow.
