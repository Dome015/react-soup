# React Soup

A small, token-driven React component library for projects built with AI agents. It provides the requested UI components, a searchable and multi-select Dropdown input, sortable and paginated tables, a local SVG icon set, Storybook stories, and complete page examples. The visual language draws from Swiss graphic design: Helvetica, strong type hierarchy, aligned grids, square neutral surfaces, a blue primary accent, and red for destructive actions.

## Start

```sh
npm install
npm run storybook
```

`npm run typecheck` checks the TypeScript sources. `npm run build-storybook` builds a static Storybook.

## Use in a React project

Copy `src/components`, `src/styles`, and `src/index.ts` into the host project. React and React DOM are supplied by the host; there are no other runtime packages. Import the stylesheet once:

```tsx
import './path-to-react-soup/styles/index.css';
import { Button, Card, Stack } from './path-to-react-soup';

export function Example() {
  return <Card><Stack><h1>Ready to work</h1><Button>Get started</Button></Stack></Card>;
}
```

The theme follows the system by default. Set `data-theme="light"` or `data-theme="dark"` on an ancestor to override it; `data-theme="auto"` follows the system. All visual values live in `src/styles/theme.css`.

Read [AGENTS.md](AGENTS.md) first when extending the library. Component guides, Storybook stories, and page examples provide API details and composition patterns.
