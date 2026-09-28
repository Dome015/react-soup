# Separator

Visual division between adjacent groups.

## API

orientation?: horizontal | vertical; hr props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Stack, Separator } from "../../index";
<Stack><p>Overview</p><Separator /><p>Details</p></Stack>
```

## Usage rule

Use only when spacing alone does not sufficiently separate groups.

Check the `Separator` Storybook story and relevant page examples when changing behavior or visual treatment.
