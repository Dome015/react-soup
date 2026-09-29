# React Soup

A token driven UI library for React and plain HTML projects. Both implementations use the same stylesheet and visual language: Helvetica, sharp geometry, disciplined grids, a blue primary accent, and red for destructive actions.

## Explore and verify

```sh
npm install
npm run storybook
npm run build-storybook
npm run build-vanilla
npm run vanilla:stories
```

Open `http://127.0.0.1:6007/src/vanilla/stories/index.html` to compare any React story with its plain HTML counterpart in auto, light, and dark themes. The vanilla pages are standalone HTML. `npm run snapshot:vanilla` is a development scaffold that refreshes their initial markup from React stories; review each regenerated story and retain the authored HTML templates and interactions.

## Vendor into a React project

Copy `src/react` **and** `src/shared`, including their components, stories, examples, and `AGENTS.md` guides. Import the shared stylesheet once and import components from `src/react/index.ts`:

```tsx
import './path-to-soup/shared/styles/index.css';
import { Button, Card, Stack } from './path-to-soup/react';

export function Example() {
  return <Card><Stack><h1>Ready to work</h1><Button>Get started</Button></Stack></Card>;
}
```

The host supplies React and React DOM as peer dependencies. TypeScript and Storybook are development tools.

## Vendor into a plain web project

Copy `src/vanilla` **and** `src/shared`, including `src/vanilla/dist`, the HTML stories, complete examples, and `AGENTS.md` guides. Link `src/shared/styles/index.css` once. Copy the semantic markup from `src/vanilla/stories` or `src/vanilla/examples` into your page. Buttons, fields, native inputs, cards, layout, and most status components need no Soup JavaScript. For a menu, searchable dropdown, tabs, sortable table, or similar interaction, load `src/vanilla/dist/behavior.js` once with `<script type="module">` and keep the component's authored HTML template. Copy the **entire** `dist` directory because entry files may import shared chunks. The host does not need Node, TypeScript, or a bundler. The TypeScript files remain the library's editable source; run `npm run build-vanilla` here after changing them.

The default theme follows the system. Set `data-theme="light"` or `data-theme="dark"` on an ancestor to force a mode; `data-theme="auto"` follows the system. All aesthetic values live in `src/shared/styles/theme.css`.

Read [AGENTS.md](AGENTS.md) when extending the library. The implementation guides explain component contracts and comparison checks.
