import { useMemo, useState, type HTMLAttributes, type Key, type ReactNode, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import { Pagination } from '../Pagination/Pagination';
import { cx } from '../shared';

export type TableSort = { field: string; direction: 'asc' | 'desc' } | null;
export type TableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number | null | undefined;
  sortable?: boolean;
};
export type TablePagination = {
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  /** Supply pageCount when rows already contain one server page. */
  pageCount?: number;
};
export type TableDataProps<T> = Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> & {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => Key;
  /** Controlled sort. Omit for local sorting state. */
  sort?: TableSort;
  defaultSort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
  /** Server supplies rows in display order and handles onSortChange. */
  manualSorting?: boolean;
  pagination?: TablePagination;
  emptyMessage?: string;
};

export function Table<T>(props: TableHTMLAttributes<HTMLTableElement> | TableDataProps<T>) {
  if ('columns' in props && 'rows' in props) return <DataTable {...props} />;
  const { className, ...tableProps } = props;
  return <div className="soup-table-scroll" role="region" aria-label="Scrollable table" tabIndex={0}><table className={cx('soup-table', className)} {...tableProps} /></div>;
}

function DataTable<T>({ columns, rows, rowKey, sort: controlledSort, defaultSort = null, onSortChange, manualSorting = false, pagination, emptyMessage = 'No results', className, ...tableProps }: TableDataProps<T>) {
  const [localSort, setLocalSort] = useState<TableSort>(defaultSort);
  const sort = controlledSort === undefined ? localSort : controlledSort;
  const sorted = useMemo(() => {
    if (manualSorting || !sort) return rows;
    const column = columns.find(item => item.id === sort.field);
    if (!column?.sortValue) return rows;
    return [...rows].sort((a, b) => {
      const left = column.sortValue!(a);
      const right = column.sortValue!(b);
      if (left == null) return right == null ? 0 : 1;
      if (right == null) return -1;
      const comparison = typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' });
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }, [rows, columns, sort, manualSorting]);
  const pageCount = pagination ? pagination.pageCount ?? Math.ceil(sorted.length / pagination.pageSize) : 0;
  const displayed = !pagination || pagination.pageCount !== undefined ? sorted : sorted.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize);
  const toggleSort = (field: string) => {
    const next: TableSort = sort?.field !== field ? { field, direction: 'asc' } : sort.direction === 'asc' ? { field, direction: 'desc' } : null;
    if (controlledSort === undefined) setLocalSort(next);
    onSortChange?.(next);
    if (pagination && pagination.page !== 1) pagination.onPageChange(1);
  };
  return <div className="soup-table-data">
    <div className="soup-table-scroll" role="region" aria-label="Scrollable table" tabIndex={0}><table className={cx('soup-table', className)} {...tableProps}>
      <thead><tr>{columns.map(column => <th key={column.id} scope="col" aria-sort={sort?.field === column.id ? sort.direction === 'asc' ? 'ascending' : 'descending' : undefined}>{column.sortValue || (manualSorting && column.sortable) ? <button type="button" className="soup-table__sort" onClick={() => toggleSort(column.id)}>{column.header}<Icon name={sort?.field === column.id ? sort.direction === 'asc' ? 'sortAsc' : 'sortDesc' : 'sortNone'} /></button> : column.header}</th>)}</tr></thead>
      <tbody>{displayed.length ? displayed.map(row => <tr key={rowKey(row)}>{columns.map(column => <td key={column.id}>{column.cell(row)}</td>)}</tr>) : <tr><td colSpan={columns.length} className="soup-table__empty">{emptyMessage}</td></tr>}</tbody>
    </table></div>
    {pagination && pageCount > 1 && <div className="soup-table__pagination"><Pagination page={pagination.page} pageCount={pageCount} onPageChange={pagination.onPageChange} /></div>}
  </div>;
}

export function TableHead(props: HTMLAttributes<HTMLTableSectionElement>) { return <thead {...props} />; }
export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) { return <tbody {...props} />; }
export function TableRow(props: HTMLAttributes<HTMLTableRowElement>) { return <tr {...props} />; }
export function TableHeader(props: ThHTMLAttributes<HTMLTableCellElement>) { return <th scope="col" {...props} />; }
export function TableCell(props: TdHTMLAttributes<HTMLTableCellElement>) { return <td {...props} />; }
