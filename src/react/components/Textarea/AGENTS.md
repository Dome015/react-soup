# Textarea

Multiline native text entry.

## API

Native textarea props, ref forwarded.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Field, Textarea } from "../../index";
<Field label="Bio" htmlFor="bio"><Textarea id="bio" rows={5} /></Field>
```

## Usage rule

Use for prose, not a short value. It is vertically resizable.
The editable area uses the normal text caret cursor; disabled textareas use `not-allowed`.

Check the `Textarea` Storybook story and relevant page examples when changing behavior or visual treatment.
