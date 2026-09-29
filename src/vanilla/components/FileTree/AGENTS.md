# FileTree: vanilla HTML contract

## Native pattern

```html
<nav class="soup-file-tree" aria-label="Files"><ul><li><details class="soup-file-tree__folder" open><summary>Folder</summary><ul>…</ul></details></li></ul></nav>
```

## Usage and accessibility

Use native nested lists and details for folders. Files are type="button" actions; mark the selected file with aria-current="true" and update it when selection changes.

## Script requirement

Native details handles folder toggling; the host app handles file selection.

## Reference

Inspect `../../stories/Components/FileTree/Basic.html` and all sibling story states. Compare them with `src/react/stories/FileTree.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
