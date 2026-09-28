# IconButton

Compact icon-only action with a required accessible name.

## API

icon: IconName; label: string; variant?: secondary | ghost | danger; size?: sm | md | lg; native button props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { IconButton } from "../../index";
<IconButton icon="close" label="Close panel" onClick={close} />
```

## Usage rule

Never omit label. Use Button when visible text clarifies the action.

Check the `IconButton` Storybook story and relevant page examples when changing behavior or visual treatment.
