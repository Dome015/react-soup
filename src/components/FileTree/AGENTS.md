# FileTree

Nested folder and file navigator.

## API

nodes: {id, name, kind: file | folder, children?}[]; label: string; selectedId?, onSelect?.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { FileTree } from "../../index";
<FileTree label="Project files" nodes={[{id:"src",name:"src",kind:"folder",children:[{id:"app",name:"App.tsx",kind:"file"}]}]} onSelect={node => openFile(node.id)} />
```

## Usage rule

Folders use native disclosure. Stable unique IDs are required. The selected file uses aria-current.
Folder and file rows share the medium control height and small control text, including in nested levels.

Check the `FileTree` Storybook story and relevant page examples when changing behavior or visual treatment.
