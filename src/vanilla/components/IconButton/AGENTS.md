# IconButton: vanilla HTML contract

## Native pattern

```html
<button type="button" class="soup-icon-button soup-button--ghost soup-button--md" aria-label="Add item"><svg class="soup-icon" aria-hidden="true">…</svg></button>
```

## Usage and accessibility

Always provide a concise aria-label. Use secondary, ghost, or danger treatment and the shared button size. Keep native disabled and focus states.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/IconButton/Basic.html` and all sibling story states. Compare them with `src/react/stories/IconButton.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
