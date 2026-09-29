# Pagination in plain HTML

Pagination is an ordinary `<nav>` with native buttons. Start from the complete markup in `../../stories/Components/Pagination/ManyPages.html`; include the summary, first/previous buttons, numbered page buttons, next/last buttons, and the shared SVG icons. The optional script reads the initial `Page N of M` summary and updates the same markup.

```html
<nav class="soup-pagination" aria-label="Pagination">
  <span class="soup-pagination__summary">Page 1 of 3</span>
  <div class="soup-pagination__controls">
    <!-- First and Previous page buttons with the shared SVG icons. -->
    <button type="button" class="soup-pagination__button soup-pagination__page"
      aria-label="Page 1" aria-current="page" data-boundary="true">1</button>
    <button type="button" class="soup-pagination__button soup-pagination__page" aria-label="Page 2">2</button>
    <!-- Page 3, Next, and Last page buttons. -->
  </div>
</nav>
```

Load `../../behavior.ts` once when page numbers should change. The root emits bubbling `soup:pagechange` with `detail.page`; the application must update its list or table for that page. Dispatch `new CustomEvent('soup:setpage', {detail: {page: 1}})` on the nav to change the current page from application code. The enhancer updates summary, visible page window, `aria-current`, and disabled boundaries. `data-sibling-count` optionally changes the number of adjacent page buttons. Omit the entire nav for zero or one page. Numbering starts at one.

Inspect both pagination stories and `../../examples/pagination/`; compare first, middle, and last pages against `src/react/stories/Pagination.stories.tsx` in all theme modes. Shared CSS tokens control size, spacing, colors, and focus.
