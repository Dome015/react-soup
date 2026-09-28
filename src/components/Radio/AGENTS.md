# Radio

One option in a named group with a visible label and themed circular mark. The native radio remains in the DOM for forms and keyboard access.

## API

label: ReactNode; native radio props. Give siblings the same name and distinct values.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Radio } from "../../index";
<Radio name="plan" value="basic" label="Basic" defaultChecked />
<Radio name="plan" value="pro" label="Pro" />
```

## Usage rule

Group related options in a fieldset with a legend in the host page.

Check the `Radio` Storybook story and relevant page examples when changing behavior or visual treatment.
