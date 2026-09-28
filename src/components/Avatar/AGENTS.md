# Avatar

Person or entity image with initials fallback.

## API

name: string; src?, alt?; span props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Avatar } from "../../index";
<Avatar name="Ada Lovelace" />
<Avatar name="Ada Lovelace" src="/ada.jpg" />
```

## Usage rule

Initials are derived from the first two words. Keep name meaningful; avoid decorative stock portraits.

Check the `Avatar` Storybook story and relevant page examples when changing behavior or visual treatment.
