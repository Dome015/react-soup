# Select: vanilla HTML contract

## Native pattern

```html
<span class="soup-select-wrap"><select id="role" class="soup-input soup-select"><option>Viewer</option></select><svg class="soup-icon" aria-hidden="true">…</svg></span>
```

## Usage and accessibility

Prefer this native select for short simple choices. Omit the decorative chevron for multiple or size>1. Keep the visible label outside the wrapper and use native validation.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Select/Basic.html` and all sibling story states. Compare them with `src/react/stories/Select.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
