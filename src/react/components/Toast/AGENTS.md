# Toast

Transient notification with a dismiss control.

## API

Toast: title, description?, tone?, onDismiss, id. ToastProvider wraps an app; useToast returns notify and dismiss.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Button, ToastProvider, useToast } from "../../index";
function SaveButton() { const { notify } = useToast(); return <Button onClick={() => notify({title:"Saved", tone:"success"})}>Save</Button>; }
<ToastProvider><SaveButton /></ToastProvider>
```

## Usage rule

Wrap the relevant app subtree once. Use after a completed event; do not hide important recovery instructions in a timed toast. Toasts enter with a short motion that is disabled by reduced-motion preferences. The dismiss button inherits the toast tone, including on hover.

Check the `Toast` Storybook story and relevant page examples when changing behavior or visual treatment.
