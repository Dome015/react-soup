# Container

Centered maximum-width page wrapper.

## API

Standard div props.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Container, Stack, Card } from "../../index";
<Container><Stack gap="lg"><h1>Settings</h1><Card>...</Card></Stack></Container>
```

## Usage rule

Use as outer page structure. Do not nest multiple Containers to adjust widths.

Check the `Container` Storybook story and relevant page examples when changing behavior or visual treatment.
