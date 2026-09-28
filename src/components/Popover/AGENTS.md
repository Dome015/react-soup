# Popover

Nonmodal anchored supplementary content.

## API

trigger: ReactNode; children: ReactNode | (close) => ReactNode; label?, align?: start | end.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Popover } from "../../index";
<Popover trigger="Details" label="Project details"><p>Created yesterday.</p></Popover>
```

## Usage rule

Use Dialog for a blocking decision. Popover closes on Escape and outside pointer input; include a meaningful label. The panel is portaled and clamped to the viewport, flipping above the trigger when there is insufficient space below. `align` expresses the preferred edge rather than forcing content offscreen.

Check the `Popover` Storybook story and relevant page examples when changing behavior or visual treatment.
