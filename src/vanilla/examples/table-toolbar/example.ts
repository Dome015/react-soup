const search = document.querySelector<HTMLInputElement>('input[aria-label="Search team members"]');
const role = document.querySelector<HTMLSelectElement>('select[aria-label="Filter by role"]');
const rows = Array.from(document.querySelectorAll<HTMLTableRowElement>('.soup-table tbody tr'));
const caption = document.querySelector<HTMLElement>('.soup-example-caption');
function filter() {
  const query = search?.value.toLowerCase() ?? '';
  const selected = role?.value ?? 'all';
  let visible = 0;
  rows.forEach(row => {
    const name = row.cells[0]?.textContent?.toLowerCase() ?? '';
    const personRole = row.cells[1]?.textContent?.trim() ?? '';
    row.hidden = !name.includes(query) || (selected !== 'all' && personRole !== selected);
    if (!row.hidden) visible++;
  });
  if (caption) caption.textContent = `Showing ${visible} of ${rows.length} members`;
}
search?.addEventListener('input', filter);
role?.addEventListener('change', filter);
export {};
