# Link: vanilla HTML contract

## Native pattern

```html
<a class="soup-link" href="/projects">Projects</a>
```

## Usage and accessibility

Use a real href for navigation. Add soup-link--subtle only for the quieter link treatment. Do not use a button for navigation.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Link/Basic.html` and all sibling story states. Compare them with `src/react/stories/Link.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
