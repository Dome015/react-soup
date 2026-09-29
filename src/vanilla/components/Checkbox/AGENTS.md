# Checkbox: vanilla HTML contract

## Native pattern

```html
<label class="soup-choice soup-choice--checkbox"><input type="checkbox"><span class="soup-choice__mark" aria-hidden="true">…</span><span>Email updates</span></label>
```

## Usage and accessibility

Keep the native input inside its visible label. Checked, disabled, required, and focus states come from the native input; add .soup-choice--disabled when disabled.

## Script requirement

None; read input.checked and listen for change in the host app.

## Reference

Inspect `../../stories/Components/Checkbox/Basic.html` and all sibling story states. Compare them with `src/react/stories/Checkbox.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
