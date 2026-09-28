# Inline

Wrapping horizontal flex layout.

## API

gap?: sm | md | lg; align?: start | center | end; justify?: start | between | end.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Inline, Button } from "../../index";
<Inline justify="between"><h1>Projects</h1><Button>New project</Button></Inline>
```

## Usage rule

Wraps naturally on narrow widths. Use Grid for equal-width columns.

Check the `Inline` Storybook story and relevant page examples when changing behavior or visual treatment.
