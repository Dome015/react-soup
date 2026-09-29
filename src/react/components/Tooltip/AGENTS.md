# Tooltip

Short explanatory hint on hover or focus.

## API

content: string; children: ReactElement; placement?: top | bottom (defaults to bottom); align?: start | end (defaults to start).

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Tooltip, IconButton } from "../../index";
<Tooltip content="Refresh data"><IconButton icon="arrowRight" label="Refresh data" /></Tooltip>
```

## Usage rule

Do not put essential information only in a tooltip. The child should be focusable for keyboard discovery. Use `align="end"` near the right edge and `placement="top"` near the bottom edge of a viewport.

Check the `Tooltip` Storybook story and relevant page examples when changing behavior or visual treatment.
