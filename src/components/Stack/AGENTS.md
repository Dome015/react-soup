# Stack

Vertical flex layout with shared spacing.

## API

gap?: sm | md | lg; div props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Stack, Card } from "../../index";
<Stack gap="lg"><Card>One</Card><Card>Two</Card></Stack>
```

## Usage rule

Default gap is md. Prefer this to one-off margins between stacked components.

Check the `Stack` Storybook story and relevant page examples when changing behavior or visual treatment.
