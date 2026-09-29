# Table in plain HTML

Use a native table for records. Keep headers and cells in HTML, a caption or accessible name, and a focusable overflow region. A static table needs no Soup script.

```html
<div class="soup-table-scroll" role="region" aria-label="Scrollable table" tabindex="0">
  <table class="soup-table" aria-label="Projects">
    <thead><tr><th scope="col">Name</th><th scope="col">Status</th></tr></thead>
    <tbody><tr><td>Atlas</td><td>Active</td></tr></tbody>
  </table>
</div>
```

For local sorting or pagination, use the complete `SortAndPaginate.html` story. Its `.soup-table-data` wrapper has `data-page-size`, a native table, a Pagination nav, and a `<template data-soup-rows>` holding **all** row markup. The optional `../../dist/behavior.js` script clones those rows into the body and handles sortable header buttons. It emits bubbling `soup:sortchange` with `{field, direction}` and uses the Pagination component's `soup:pagechange`. The visible header reports `aria-sort`; the sort icon uses shared geometry. Preserve column order and place plain sortable values in the corresponding cells. For server managed data, let the application replace the `<tbody>`, update its template or use its own data handler, and keep the same ARIA and pagination contract.

Do not use `.soup-table-data` or the data row template when all rows are already present and no local controller is needed. Avoid paginating a DOM fragment that omits the rest of the dataset. Compare static, empty, sortable, and paginated stories with `src/react/stories/Table.stories.tsx` in auto, light, and dark themes and at narrow width.
