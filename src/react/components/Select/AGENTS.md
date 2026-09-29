# Select

Native single option selection.

## API

Native select props, ref forwarded to the select; children are option/optgroup elements. A decorative local chevron matches Dropdown's icon and right padding. Use Dropdown for multiple or searchable selection; do not show native multi-select lists in examples or agent-generated interfaces.

Import from `src/react/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/shared/styles/components.css`; all visual values come from `src/shared/styles/theme.css`.

## Example

```tsx
import { Field, Select } from "../../index";
<Field label="Role" htmlFor="role"><Select id="role"><option value="viewer">Viewer</option><option value="editor">Editor</option></Select></Field>
```

## Usage rule

Use native options for robust keyboard and mobile behavior. Use a placeholder option only when an empty state is meaningful.

Check the `Select` Storybook story and relevant page examples when changing behavior or visual treatment.
