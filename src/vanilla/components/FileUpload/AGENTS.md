# FileUpload: vanilla HTML contract

## Native pattern

```html
<input id="document" type="file" class="soup-file-upload">
```

## Usage and accessibility

Pair with a visible Field label. Use native accept, multiple, required, disabled, and aria-invalid attributes. Read input.files on change; do not set a file input value programmatically.

## Script requirement

None for choosing files; the host app handles reading/uploading and status.

## Reference

Inspect `../../stories/Components/FileUpload/Basic.html` and all sibling story states. Compare them with `src/react/stories/FileUpload.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
