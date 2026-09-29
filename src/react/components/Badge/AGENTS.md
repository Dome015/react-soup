# Badge

Compact status or category label.

## API

tone?: neutral | accent | success | warning | danger | info; span props.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Badge } from "../../index";
<Badge tone="success">Active</Badge>
```

## Usage rule

Use a textual status; color alone must not convey meaning. Keep labels short.

Check the `Badge` Storybook story and relevant page examples when changing behavior or visual treatment.
