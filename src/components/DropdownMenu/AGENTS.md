# DropdownMenu

Compact list of immediate actions.

## API

label: string; items: {label, onSelect, icon?, danger?, disabled?}[]; trigger?: ReactNode; align?: start | end (defaults to start).

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { DropdownMenu } from "../../index";
<DropdownMenu label="Project actions" items={[{ label: "Edit", icon: "edit", onSelect: edit }, { label: "Delete", icon: "trash", danger: true, onSelect: confirmDelete }]} />
```

## Usage rule

Actions must be commands, not navigation links or form fields. Arrow keys, Home, End, and Escape work in the open menu. The panel uses a positioned portal so it remains visible inside horizontally scrolling tables; its edge overlaps the trigger border by the trigger's computed border width. `align="end"` is useful for actions near the right edge.

Check the `DropdownMenu` Storybook story and relevant page examples when changing behavior or visual treatment.
