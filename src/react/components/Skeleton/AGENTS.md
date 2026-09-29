# Skeleton

Placeholder representing loading content.

## API

shape?: line | circle | block; span props.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Stack, Skeleton } from "../../index";
<Stack><Skeleton shape="circle" /><Skeleton /><Skeleton shape="block" /></Stack>
```

## Usage rule

Match the rough shape of the eventual content and pair the region with an accessible loading message.

Check the `Skeleton` Storybook story and relevant page examples when changing behavior or visual treatment.
