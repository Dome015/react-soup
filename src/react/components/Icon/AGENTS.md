# Icon

Local outline SVG glyph. Use inside controls and labels; it is decorative by default.

## API

name: IconName; standard SVG props. Names are exported from Icon.tsx.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Icon } from "../../index";
<Icon name="search" />
```

## Usage rule

Keep a consistent stroke. For an icon-only action, use IconButton instead of Icon alone.

Check the `Icon` Storybook story and relevant page examples when changing behavior or visual treatment.
