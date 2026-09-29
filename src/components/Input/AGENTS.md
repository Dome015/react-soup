# Input

Single-line native text-like input.

## API

Native input props, ref forwarded; type defaults to text.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Field, Input } from "../../index";
<Field label="Email" htmlFor="email"><Input id="email" type="email" autoComplete="email" required /></Field>
<Field label="Due date" htmlFor="due-date"><Input id="due-date" type="date" required /></Field>
```

## Usage rule

Pair with Field or another visible label. Use aria-invalid and aria-describedby when showing errors; do not rely on placeholder as label.
Text-like input types, including search, show the text caret cursor. Click-only native input types use a pointer; disabled inputs use `not-allowed`.
Use native `type="date"`, `type="time"`, or `type="datetime-local"` for date and time entry. Input keeps the shared height, border, focus style, and theme-aware native controls. Pass native `min`, `max`, `step`, `required`, and controlled or default values; values use browser-standard date/time strings. A `datetime-local` value has no timezone, so store timezone separately when it matters. `Components/Input` shows all three modes, bounds, disabled, and error states; `Examples/Settings Form` shows date and time with a timezone field.

Check the `Input` Storybook story and relevant page examples when changing behavior or visual treatment.
