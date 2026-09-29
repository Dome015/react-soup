# Input: vanilla HTML contract

## Native pattern

```html
<input id="due-date" type="date" class="soup-input" required>
```

## Usage and accessibility

Keep native input types, especially date, time, and datetime-local. Use Field or another visible label; placeholder is not a label. Pass native min/max/step/required attributes and connect errors with aria-invalid and aria-describedby. Store timezone separately from datetime-local.

## Script requirement

None; read value and listen for input/change in the host app.

## Reference

Inspect `../../stories/Components/Input/Basic.html` and all sibling story states. Compare them with `src/react/stories/Input.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
