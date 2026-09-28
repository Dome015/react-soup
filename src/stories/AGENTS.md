# Storybook guide

Stories use `@storybook/react-vite` and import from `src/index.ts`. Give every public component a dedicated story file with examples of its normal state and meaningful variants, disabled/error states, or interaction. Keep story data fictional and concise. The global toolbar switches between auto, light, and dark themes. Prefer examples that teach when to use a component, not only how it looks.

Run `npm run storybook` for interactive review and `npm run build-storybook` for a static build. Storybook dependencies are development-only and are not part of vendored runtime sources.
