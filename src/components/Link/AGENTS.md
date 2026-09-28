# Link

Navigation to a URL or route.

## API

subtle?: boolean; native anchor props including href.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Link } from "../../index";
<Link href="/settings">Settings</Link>
<Link href="/help" subtle>Help</Link>
```

## Usage rule

Use Button for actions that do not navigate. Preserve a real href for keyboard, browser, and assistive technology behavior.

Check the `Link` Storybook story and relevant page examples when changing behavior or visual treatment.
