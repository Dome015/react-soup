# Dialog

Modal decision or focused form using native dialog.

## API

open: boolean; onOpenChange(open): void; title: string; description?, footer?, children.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Dialog, Button } from "../../index";
<Dialog open={open} onOpenChange={setOpen} title="Delete project" description="This cannot be undone." footer={<Button variant="danger" onClick={remove}>Delete</Button>}><p>All files will be removed.</p></Dialog>
```

## Usage rule

Trigger it from a button. Escape and the close button call onOpenChange(false). Keep confirmation actions in the footer; never nest dialogs. Header and footer separators are inset by the same horizontal padding as their content.

Check the `Dialog` Storybook story and relevant page examples when changing behavior or visual treatment.
