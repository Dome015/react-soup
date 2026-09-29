import { iconShapes } from '../../../shared/icons';

/** Sorts and pages an authored table; all row markup stays in HTML. */
export function enhanceDataTable(root: HTMLElement): () => void {
  const table = root.querySelector<HTMLTableElement>('table.soup-table');
  const body = table?.tBodies[0];
  const rowTemplate = root.querySelector<HTMLTemplateElement>('template[data-soup-rows]');
  if (!table || !body || !rowTemplate) return () => {};
  const rows = Array.from(rowTemplate.content.querySelectorAll<HTMLTableRowElement>('tr'));
  const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>('thead th'));
  const pagination = root.querySelector<HTMLElement>('.soup-pagination');
  const pageSize = Number(root.dataset.pageSize || rows.length);
  let page = Number(pagination?.querySelector('.soup-pagination__summary')?.textContent?.match(/^Page (\d+)/)?.[1] ?? 1);
  let sortIndex = -1;
  let direction: 'asc' | 'desc' | null = null;
  const listeners = new AbortController();
  const setSortIcon = (header: HTMLTableCellElement, name: 'sortAsc' | 'sortDesc' | 'sortNone') => {
    const svg = header.querySelector('svg');
    if (!svg) return;
    svg.replaceChildren(...iconShapes[name].map(shape => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', shape.tag);
      for (const [key, value] of Object.entries(shape)) if (key !== 'tag') node.setAttribute(key, String(value));
      return node;
    }));
  };
  const render = () => {
    const ordered = [...rows];
    if (sortIndex >= 0 && direction) ordered.sort((left, right) => {
      const a = left.cells[sortIndex]?.textContent?.trim() ?? '';
      const b = right.cells[sortIndex]?.textContent?.trim() ?? '';
      const comparison = !Number.isNaN(Number(a)) && !Number.isNaN(Number(b))
        ? Number(a) - Number(b)
        : a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      return direction === 'asc' ? comparison : -comparison;
    });
    const visible = pagination ? ordered.slice((page - 1) * pageSize, page * pageSize) : ordered;
    body.replaceChildren(...visible.map(row => row.cloneNode(true)));
    headers.forEach((header, index) => {
      if (index === sortIndex && direction) header.setAttribute('aria-sort', direction === 'asc' ? 'ascending' : 'descending');
      else header.removeAttribute('aria-sort');
      setSortIcon(header, index === sortIndex && direction ? direction === 'asc' ? 'sortAsc' : 'sortDesc' : 'sortNone');
    });
  };
  headers.forEach((header, index) => {
    header.querySelector<HTMLButtonElement>('.soup-table__sort')?.addEventListener('click', () => {
      if (sortIndex !== index) { sortIndex = index; direction = 'asc'; }
      else if (direction === 'asc') direction = 'desc';
      else { sortIndex = -1; direction = null; }
      root.dispatchEvent(new CustomEvent('soup:sortchange', { bubbles: true, detail: {
        field: sortIndex < 0 ? null : headers[sortIndex]?.textContent?.trim(), direction,
      } }));
      if (pagination && page !== 1) pagination.dispatchEvent(new CustomEvent('soup:setpage', { detail: { page: 1 } }));
      else render();
    }, { signal: listeners.signal });
  });
  root.addEventListener('soup:pagechange', event => {
    page = (event as CustomEvent<{ page: number }>).detail.page;
    render();
  }, { signal: listeners.signal });
  return () => listeners.abort();
}
