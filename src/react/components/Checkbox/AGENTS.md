# Checkbox

Independent Boolean choice with a visible label and square custom mark. The native checkbox remains in the DOM for forms and keyboard access; the mark shows checked, focus, and disabled states.

## API

label: ReactNode; native checkbox props.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Checkbox } from "../../index";
<Checkbox label="Email me product updates" defaultChecked />
```

## Usage rule

Use several checkboxes when choices are independent. Use Radio for one-of-many choices.

Check the `Checkbox` Storybook story and relevant page examples when changing behavior or visual treatment.
