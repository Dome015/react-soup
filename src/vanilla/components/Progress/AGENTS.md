# Progress: vanilla HTML contract

## Native pattern

```html
<div class="soup-progress"><div class="soup-progress__heading"><label for="upload-progress">Uploading</label></div><div class="soup-progress__track"><progress id="upload-progress" class="soup-progress__bar" value="35" max="100"></progress></div></div>
```

## Usage and accessibility

Use for an actual ongoing task. Omit value for indeterminate state and include the decorative .soup-progress__indeterminate span. A visible percentage is aria-hidden; the native progress element exposes the value.

## Script requirement

The host app updates the native progress.value property from real task progress.

## Reference

Inspect `../../stories/Components/Progress/Determinate.html` and all sibling story states. Compare them with `src/react/stories/Progress.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
