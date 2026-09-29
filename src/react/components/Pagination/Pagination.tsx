import { Icon } from '../Icon/Icon';

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  label?: string;
};

export function Pagination({ page, pageCount, onPageChange, siblingCount = 1, label = 'Pagination' }: PaginationProps) {
  const count = Math.max(0, Math.floor(pageCount));
  if (count <= 1) return null;
  const current = Math.min(Math.max(1, Math.floor(page)), count);
  const siblings = Math.max(0, Math.floor(siblingCount));
  const visible = new Set<number>();
  for (let number = 1; number <= count; number++) {
    if (number === 1 || number === count || Math.abs(number - current) <= siblings) visible.add(number);
  }
  const pages = [...visible].sort((a, b) => a - b);
  const items: (number | 'ellipsis')[] = [];
  pages.forEach((number, index) => {
    const previous = pages[index - 1];
    if (previous && number - previous === 2) items.push(previous + 1);
    if (previous && number - previous > 2) items.push('ellipsis');
    items.push(number);
  });
  const go = (number: number) => { if (number >= 1 && number <= count && number !== current) onPageChange(number); };
  return <nav className="soup-pagination" aria-label={label}>
    <span className="soup-pagination__summary">Page {current} of {count}</span>
    <div className="soup-pagination__controls">
      <button type="button" className="soup-pagination__button" aria-label="First page" disabled={current <= 1} onClick={() => go(1)}><Icon name="firstPage" /></button>
      <button type="button" className="soup-pagination__button" aria-label="Previous page" disabled={current <= 1} onClick={() => go(current - 1)}><Icon name="arrowLeft" /></button>
      {items.map((item, index) => item === 'ellipsis' ? <span key={`ellipsis-${index}`} className="soup-pagination__ellipsis" aria-hidden="true">…</span> : <button key={item} type="button" className="soup-pagination__button soup-pagination__page" aria-label={`Page ${item}`} aria-current={item === current ? 'page' : undefined} data-boundary={item === 1 || item === count ? 'true' : undefined} onClick={() => go(item)}>{item}</button>)}
      <button type="button" className="soup-pagination__button" aria-label="Next page" disabled={current === count} onClick={() => go(current + 1)}><Icon name="arrowRight" /></button>
      <button type="button" className="soup-pagination__button" aria-label="Last page" disabled={current === count} onClick={() => go(count)}><Icon name="lastPage" /></button>
    </div>
  </nav>;
}
