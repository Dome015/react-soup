# Radio: vanilla HTML contract

## Native pattern

```html
<label class="soup-choice soup-choice--radio"><input type="radio" name="billing" value="monthly"><span class="soup-choice__mark" aria-hidden="true"></span><span>Monthly</span></label>
```

## Usage and accessibility

Keep radio inputs in one named group and inside visible labels. Native checked, required, disabled, and focus states apply; add .soup-choice--disabled when disabled.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Radio/Basic.html` and all sibling story states. Compare them with `src/react/stories/Radio.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
