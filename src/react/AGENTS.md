# React implementation

`index.ts` is the React public import surface. `components/` contains the existing React components and local API guides. `stories/` and `examples/` demonstrate use and are vendored as references. Always vendor `../shared` with this directory and import `../shared/styles/index.css` once in the host application.

Keep React component behavior and appearance in parity with `../vanilla`. React and React DOM are supplied by the host as peer dependencies. TypeScript and Storybook are development tools. Component code may import `../shared` but must not import vanilla components, Storybook, or examples. Read the nearest `AGENTS.md` before edits.
