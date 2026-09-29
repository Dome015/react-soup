import { createIcon } from '../../icon';

const projects = [
  { name: 'Atlas', type: 'Design', status: 'Active' },
  { name: 'Orion', type: 'Engineering', status: 'Active' },
  { name: 'Meridian', type: 'Design', status: 'Draft' },
  { name: 'Vector', type: 'Research', status: 'Draft' },
];
const page = document.querySelector<HTMLElement>('main > .soup-stack');
const search = page?.querySelector<HTMLInputElement>('#filter-query');
const types = page?.querySelector<HTMLElement>('.soup-dropdown');
const status = page?.querySelector<HTMLSelectElement>('#filter-status');
const count = page?.querySelector<HTMLElement>('[role="status"]:is(strong)');
const clear = Array.from(page?.querySelectorAll<HTMLButtonElement>('button') ?? []).find(button => button.textContent?.trim() === 'Clear filters');
const outlet = page?.lastElementChild;
const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = '<article class="soup-card"><div class="soup-stack soup-gap--sm"><div class="soup-inline soup-gap--md soup-align--center soup-justify--between"><strong></strong><span class="soup-badge"></span></div><span></span></div></article>';

function render() {
  if (!page || !outlet || !search || !types || !status) return;
  const selected = (types.dataset.value ?? '').split(',').filter(Boolean);
  const visible = projects.filter(project => project.name.toLowerCase().includes(search.value.toLowerCase())
    && (!selected.length || selected.includes(project.type))
    && (status.value === 'all' || project.status === status.value));
  if (count) count.textContent = `${visible.length} ${visible.length === 1 ? 'result' : 'results'}`;
  if (!visible.length) {
    const alert = document.createElement('div');
    alert.className = 'soup-alert soup-tone--info';
    alert.setAttribute('role', 'status');
    alert.append(createIcon('info'));
    const body = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = 'No matches';
    const detail = document.createElement('div'); detail.textContent = 'Try a different search or clear the filters.';
    body.append(title, detail); alert.append(body);
    page.replaceChild(alert, page.lastElementChild!);
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'soup-grid soup-gap--md';
  visible.forEach(project => {
    const card = cardTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
    card.querySelector('strong')!.textContent = project.name;
    const badge = card.querySelector<HTMLElement>('.soup-badge')!;
    badge.textContent = project.status;
    badge.classList.add(project.status === 'Active' ? 'soup-tone--success' : 'soup-tone--neutral');
    card.querySelector('.soup-stack > span')!.textContent = project.type;
    grid.append(card);
  });
  page.replaceChild(grid, page.lastElementChild!);
}

search?.addEventListener('input', render);
status?.addEventListener('change', render);
types?.addEventListener('soup:change', render);
clear?.addEventListener('click', () => {
  if (search) search.value = '';
  if (status) status.value = 'all';
  types?.dispatchEvent(new CustomEvent('soup:setvalue', { detail: { value: [] } }));
  render();
});
