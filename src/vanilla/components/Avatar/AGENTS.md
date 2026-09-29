# Avatar: vanilla HTML contract

## Native pattern

```html
<span class="soup-avatar" role="img" aria-label="Ada Lovelace">AL</span>
```

## Usage and accessibility

Use up to two initials when there is no image. When an image is present, place <img src="…" alt=""> inside the labeled span. Do not use initials as the only accessible name.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Avatar/Basic.html` and all sibling story states. Compare them with `src/react/stories/Avatar.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
