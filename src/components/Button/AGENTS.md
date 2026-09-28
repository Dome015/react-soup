# Button

Primary, secondary, ghost, and danger actions.

## API

variant?: primary | secondary | ghost | danger; size?: sm | md | lg; native button props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Button } from "../../index";
<Button onClick={save}>Save changes</Button>
<Button type="submit" variant="primary">Create account</Button>
<Button variant="secondary" onClick={cancel}>Cancel</Button>
```

## Usage rule

Defaults to type="button". Choose primary for the single main action in a region, danger for irreversible actions.

Check the `Button` Storybook story and relevant page examples when changing behavior or visual treatment.
