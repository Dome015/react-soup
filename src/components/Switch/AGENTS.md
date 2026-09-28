# Switch

Immediate on/off setting; uses a native checkbox with switch semantics.

## API

label: ReactNode; native checkbox props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Switch } from "../../index";
<Switch label="Dark appearance" checked={dark} onChange={event => setDark(event.target.checked)} />
```

## Usage rule

Use for a setting that takes effect immediately. Use Checkbox for terms, confirmations, or multi-select.
The visible label and track use a pointer cursor in either on/off state; a disabled switch and its label use `not-allowed`.

Check the `Switch` Storybook story and relevant page examples when changing behavior or visual treatment.
