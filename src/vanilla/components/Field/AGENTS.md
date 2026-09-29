# Field: vanilla HTML contract

## Native pattern

```html
<div class="soup-field"><label class="soup-field__label" for="email">Email</label><input id="email" class="soup-input"></div>
```

## Usage and accessibility

The label for must match the control id. Description uses id="<control-id>-description" and error uses id="<control-id>-error" with role="alert". Set aria-describedby and aria-invalid on the control explicitly.

## Script requirement

None; form validation remains with the host app.

## Reference

Inspect `../../stories/Components/Field/Basic.html` and all sibling story states. Compare them with `src/react/stories/Field.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
