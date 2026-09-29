# Breadcrumbs: vanilla HTML contract

## Native pattern

```html
<nav class="soup-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a class="soup-link" href="/projects">Projects</a></li>
    <li><svg class="soup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 5 7 7-7 7"></path></svg><span aria-current="page">Report</span></li>
  </ol>
</nav>
```

## Usage and accessibility

Ancestors are real links; the current page is text with aria-current="page". Keep separator icons decorative. A current-page-only trail is valid.

## Script requirement

None.

## Reference

Inspect `../../stories/Components/Breadcrumbs/Basic.html` and all sibling story states. Compare them with `src/react/stories/Breadcrumbs.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
