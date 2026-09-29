# Separator: vanilla HTML contract

## Native pattern

```html
<hr class="soup-separator soup-separator--horizontal" role="separator" aria-orientation="horizontal">
```

## Usage and accessibility

Use horizontal between stacked regions and vertical between inline items. Keep it semantic; do not substitute a border on an unrelated element.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Separator/Basic.html` and all sibling story states. Compare them with `src/react/stories/Separator.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
