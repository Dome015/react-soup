# Button: vanilla HTML contract

## Native pattern

```html
<button type="button" class="soup-button soup-button--primary soup-button--md">Save changes</button>
```

## Usage and accessibility

Choose primary for the region’s main action, secondary or ghost for supporting actions, and danger for destructive actions. Use type="submit" explicitly in a form. For loading, set disabled and aria-busy="true", prepend .soup-button__loader, and show action-specific text.

```html
<button type="submit" class="soup-button soup-button--primary soup-button--md" disabled aria-busy="true">
  <span class="soup-button__loader" aria-hidden="true"></span>Saving…
</button>
```

Restore the original label and enabled state when the action finishes. Keep a separate status message when a later result or error needs to be announced.

## Script requirement

Only the application’s own state change is needed for loading; there is no Soup factory.

## Reference

Inspect `../../stories/Components/Button/Basic.html` and all sibling story states. Compare them with `src/react/stories/Button.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
