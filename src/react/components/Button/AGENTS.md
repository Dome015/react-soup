# Button

Primary, secondary, ghost, and danger actions.

## API

variant?: primary | secondary | ghost | danger; size?: sm | md | lg; loading?: boolean; loadingText?: string; native button props.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Button } from "../../index";
<Button onClick={save}>Save changes</Button>
<Button type="submit" variant="primary">Create account</Button>
<Button variant="secondary" onClick={cancel}>Cancel</Button>
<Button type="submit" loading={saving} loadingText="Saving…">Save changes</Button>
```

## Usage rule

Defaults to type="button". Choose primary for the single main action in a region, danger for irreversible actions.
Loading disables the native button to prevent repeat activation, sets `aria-busy`, and shows an inline indicator. Supply a short, action-specific `loadingText` so the visible label explains what is happening. Keep completion and failure feedback outside the button.

Check the `Button` Storybook story and relevant page examples when changing behavior or visual treatment.
