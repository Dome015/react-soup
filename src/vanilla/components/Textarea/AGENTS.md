# Textarea: vanilla HTML contract

## Native pattern

```html
<textarea id="description" class="soup-input soup-textarea"></textarea>
```

## Usage and accessibility

Keep a visible label and native required, disabled, readonly, rows, and maxlength behavior. Connect hint/error with aria-describedby.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Textarea/Basic.html` and all sibling story states. Compare them with `src/react/stories/Textarea.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
