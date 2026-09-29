# Icon: vanilla HTML contract

## Native pattern

```html
<svg class="soup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">…</svg>
```

## Usage and accessibility

Use local geometry from src/shared/icons.ts. Decorative icons are hidden from assistive technology; icon-only interactive controls need a label on their button.

## Script requirement

None for inline SVG.

## Reference

Inspect `../../stories/Components/Icon/Basic.html` and all sibling story states. Compare them with `src/react/stories/Icon.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
