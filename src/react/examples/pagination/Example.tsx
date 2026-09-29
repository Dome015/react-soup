import { useState } from 'react';
import * as Soup from '../../index';

const entries = Array.from({ length: 123 }, (_, index) => ({ id: index + 1, name: `Project ${String(index + 1).padStart(3, '0')}`, status: index % 3 === 0 ? 'Draft' : 'Active' }));
const pageSize = 5;

export function PaginationExample() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Soup.TableSort>(null);
  const sorted = [...entries].sort((a, b) => {
    if (!sort) return 0;
    const comparison = sort.field === 'name' ? a.name.localeCompare(b.name) : a.status.localeCompare(b.status);
    return sort.direction === 'asc' ? comparison : -comparison;
  });
  const pageCount = Math.ceil(entries.length / pageSize);
  const shown = sorted.slice((page - 1) * pageSize, page * pageSize);
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg"><header><h1>Project directory</h1><p className="soup-example-lead">Sort the directory and move between pages.</p></header><Soup.Card><Soup.Table
    columns={[
      { id: 'name', header: 'Name', cell: entry => entry.name, sortable: true },
      { id: 'status', header: 'Status', cell: entry => <Soup.Badge tone={entry.status === 'Active' ? 'success' : 'neutral'}>{entry.status}</Soup.Badge>, sortable: true },
    ]}
    rows={shown}
    rowKey={entry => entry.id}
    sort={sort}
    onSortChange={setSort}
    manualSorting
    pagination={{ page, pageSize, pageCount, onPageChange: setPage }}
    aria-label="Project directory"
  /></Soup.Card></Soup.Stack></main></Soup.Container>;
}
