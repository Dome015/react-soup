# Accordion: vanilla HTML contract

## Native pattern

```html
<div class="soup-accordion"><details class="soup-accordion__item"><summary>Question <svg class="soup-icon" aria-hidden="true">…</svg></summary><div class="soup-accordion__content">Answer</div></details></div>
```

## Usage and accessibility

Native <details> supplies disclosure, keyboard activation, and open state. Keep the summary inside details and the answer in the content wrapper. Use open for initially expanded content.

## Script requirement

None; native HTML handles disclosure.

## Reference

Inspect `../../stories/Components/Accordion/Basic.html` and all sibling story states. Compare them with `src/react/stories/Accordion.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
