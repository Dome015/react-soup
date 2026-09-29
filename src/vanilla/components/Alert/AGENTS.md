# Alert: vanilla HTML contract

## Native pattern

```html
<div class="soup-alert soup-tone--info" role="status"><svg class="soup-icon" aria-hidden="true">…</svg><div><strong>Information</strong><div>Message</div></div></div>
```

## Usage and accessibility

Use role="alert" for danger messages that require immediate announcement; use role="status" for the other tones. Keep the icon decorative and the message as real text.

## Script requirement

None for a static alert.

## Reference

Inspect `../../stories/Components/Alert/Basic.html` and all sibling story states. Compare them with `src/react/stories/Alert.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
