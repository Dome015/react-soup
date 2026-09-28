# Field

Visible label and optional hint/error around a form control.

## API

label, htmlFor, children required; description?, error?, optional?; div props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Field, Input } from "../../index";
<Field label="Email" htmlFor="email" description="Used for receipts" error={error}><Input id="email" aria-invalid={!!error} aria-describedby={error ? "email-error" : "email-description"} /></Field>
```

## Usage rule

htmlFor must match the child control id. Connect description/error IDs explicitly with aria-describedby. Field does not manage validation.

Check the `Field` Storybook story and relevant page examples when changing behavior or visual treatment.
