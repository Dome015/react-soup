# Tooltip: vanilla HTML contract

## Native pattern

```html
<span class="soup-tooltip soup-tooltip--bottom soup-tooltip--start"><span class="soup-tooltip__target" aria-describedby="tip-id">…focusable target…</span><span id="tip-id" class="soup-tooltip__content" role="tooltip">Hint</span></span>
```

## Usage and accessibility

Use only for a short supplemental hint, never essential instructions. Target must be focusable; CSS shows the hint on hover and focus-within. Pair by id/aria-describedby.

## Script requirement

None for reveal; CSS handles hover and focus.

## Reference

Inspect `../../stories/Components/Tooltip/Basic.html` and all sibling story states. Compare them with `src/react/stories/Tooltip.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
