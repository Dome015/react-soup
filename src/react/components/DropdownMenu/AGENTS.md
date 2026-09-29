# DropdownMenu

Compact list of immediate actions.

## API

label: string; items: {label, onSelect, icon?, danger?, disabled?}[]; trigger?: ReactNode; align?: start | end (defaults to start).

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { DropdownMenu } from "../../index";
<DropdownMenu label="Project actions" items={[{ label: "Edit", icon: "edit", onSelect: edit }, { label: "Delete", icon: "trash", danger: true, onSelect: confirmDelete }]} />
```

## Usage rule

Actions must be commands, not navigation links or form fields. Arrow keys, Home, End, and Escape work in the open menu. The panel uses a positioned portal so it remains visible inside horizontally scrolling tables; its edge overlaps the trigger border by the trigger's computed border width. `align="end"` is useful for actions near the right edge.
The text trigger and menu items share the medium control height and small text with other controls. A lone `Icon` trigger uses the icon control width; keep the required `label` specific to the row or action.

Check the `DropdownMenu` Storybook story and relevant page examples when changing behavior or visual treatment.
