# Alert

Persistent contextual message.

## API

tone?: neutral | success | warning | danger | info; title?, children required; div props.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Alert } from "../../index";
<Alert tone="warning" title="Unsaved changes">Save before leaving this page.</Alert>
```

## Usage rule

Use danger for errors and warning for caution. Alerts persist until the condition changes; use Toast for transient feedback.

Check the `Alert` Storybook story and relevant page examples when changing behavior or visual treatment.
