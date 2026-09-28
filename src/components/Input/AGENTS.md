# Input

Single-line native text-like input.

## API

Native input props, ref forwarded; type defaults to text.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Field, Input } from "../../index";
<Field label="Email" htmlFor="email"><Input id="email" type="email" autoComplete="email" required /></Field>
```

## Usage rule

Pair with Field or another visible label. Use aria-invalid and aria-describedby when showing errors; do not rely on placeholder as label.
Text-like input types, including search, show the text caret cursor. Click-only native input types use a pointer; disabled inputs use `not-allowed`.

Check the `Input` Storybook story and relevant page examples when changing behavior or visual treatment.
