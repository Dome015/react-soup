# Switch: vanilla HTML contract

## Native pattern

```html
<label class="soup-switch"><input type="checkbox" role="switch"><span class="soup-switch__track" aria-hidden="true"></span><span>Email notifications</span></label>
```

## Usage and accessibility

Keep the native checkbox and visible label. Use role="switch" for an on/off setting, not a multi-choice selection. Add .soup-switch--disabled when disabled.

## Script requirement

None; read input.checked and listen for change in the host app.

## Reference

Inspect `../../stories/Components/Switch/Basic.html` and all sibling story states. Compare them with `src/react/stories/Switch.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
