# Table

Semantic table with horizontal overflow. It supports hand-written cells for small static content and a data API for sortable, paginated records. Import from `src/index.ts` or the vendored root. Styling is in `src/styles/components.css`; values come from `src/styles/theme.css`.

## Static API

`Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeader`, and `TableCell` pass through native table props. Add a caption or an accessible nearby heading.

```tsx
<Table><TableHead><TableRow><TableHeader>Name</TableHeader></TableRow></TableHead><TableBody><TableRow><TableCell>Atlas</TableCell></TableRow></TableBody></Table>
```

## Data API

Pass `columns`, `rows`, and `rowKey`. A column has a stable `id`, `header`, and `cell(row)` function. `sortValue(row)` enables local sorting of strings or numbers. Set `sortable: true` for server columns whose order is decided outside the component. Clicking a heading cycles ascending, descending, and unsorted. These states use distinct icons. Sort buttons sit inside `th` and the header reports `aria-sort`.

```tsx
const [page, setPage] = useState(1);
<Table
  columns={[{ id: 'name', header: 'Name', cell: row => row.name, sortValue: row => row.name }]}
  rows={projects}
  rowKey={row => row.id}
  pagination={{ page, pageSize: 10, onPageChange: setPage }}
/>
```

For server data, pass only the current page as `rows`, set `manualSorting`, and supply `pagination.pageCount`. Keep `sort` controlled and use `onSortChange` to fetch sorted rows. `pagination.onPageChange` fetches the requested page. A sort change requests page 1. Omit `pageCount` for client data; Table sorts all rows then slices the current page. The footer is omitted when the calculated or supplied page count is zero or one. The caller owns page state in both modes. `emptyMessage` replaces the default empty text. Native table props, including `aria-label` and `caption` via the static API, remain available.

Use Table for comparable records, not page layout. The overflow wrapper is keyboard focusable. See `Table` stories and the `Pagination` example for both data modes.
