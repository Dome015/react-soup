# Pagination

Standalone page navigation. Import from `src/index.ts` or the vendored root. Styling uses only shared theme tokens.

## API

`page` is one-based; `pageCount` is the total number of pages; `onPageChange(page)` is called when the user chooses another page. Optional `siblingCount` controls how many nearby page numbers appear (default 1), and `label` names the navigation landmark. A page count of zero or one renders nothing. Larger counts show first, previous, numbered, next, and last actions with ellipses for skipped ranges. Current page uses `aria-current="page"`.

```tsx
const [page, setPage] = useState(1);
<Pagination page={page} pageCount={25} onPageChange={setPage} />
```

Use this for independently paginated content. Table's data API renders it automatically when `pagination` is provided. Page changes should update the URL or fetch data in a host app. See the Pagination Storybook story.
At narrow widths, the navigation retains first, current, and last page numbers plus all direction controls; intermediate numbers and ellipses are hidden to keep the controls on one row.
