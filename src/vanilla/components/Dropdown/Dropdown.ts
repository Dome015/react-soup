import { createIcon } from '../../icon';

/** Enhances authored .soup-dropdown markup; options stay in an HTML <template>. */
export function enhanceDropdown(root: HTMLElement): () => void {
  const trigger = root.querySelector<HTMLButtonElement>('.soup-dropdown__trigger');
  const control = root.querySelector<HTMLElement>('.soup-dropdown__control');
  const source = root.querySelector<HTMLTemplateElement>('template[data-soup-options]');
  if (!trigger || !control || !source) return () => {};
  const id = trigger.id || `soup-dropdown-${crypto.randomUUID()}`;
  trigger.id = id;
  const listId = `${id}-listbox`;
  trigger.setAttribute('aria-controls', listId);
  const multiple = root.hasAttribute('data-multiple');
  const searchable = root.hasAttribute('data-searchable');
  const clearable = root.hasAttribute('data-clearable');
  const disabled = trigger.disabled;
  const placeholder = root.dataset.placeholder ?? 'Select an option';
  const emptyMessage = root.dataset.emptyMessage ?? 'No matching options';
  const optionNodes = Array.from(source.content.querySelectorAll<HTMLElement>('[data-value]'));
  let selected = root.dataset.value ? root.dataset.value.split(',').filter(Boolean) : [];
  let query = '';
  let selecting = false;
  let panel: HTMLDivElement | undefined;
  let search: HTMLInputElement | undefined;
  let outside: AbortController | undefined;
  const listeners = new AbortController();
  const signal = listeners.signal;
  const values = () => multiple ? [...selected] : selected[0] ?? '';
  const announce = () => root.dispatchEvent(new CustomEvent('soup:change', { detail: { value: values() }, bubbles: true }));
  const renderValue = () => {
    const label = selected.map(value => optionNodes.find(node => node.dataset.value === value)?.querySelector('strong')?.textContent ?? value).join(', ');
    const text = trigger.querySelector<HTMLElement>('.soup-dropdown__value, .soup-dropdown__placeholder');
    if (text) { text.textContent = label || placeholder; text.className = label ? 'soup-dropdown__value' : 'soup-dropdown__placeholder'; }
    control.querySelector('.soup-icon-button')?.remove();
    if (clearable && selected.length && !disabled) {
      const clear = document.createElement('button');
      clear.type = 'button'; clear.className = 'soup-icon-button soup-button--secondary soup-button--md';
      clear.setAttribute('aria-label', `Clear ${trigger.getAttribute('aria-label') ?? 'selection'}`);
      clear.append(createIcon('close'));
      clear.addEventListener('click', () => { selected = []; update(); announce(); }, { signal });
      control.append(clear);
    }
    root.querySelectorAll('input[data-soup-hidden-value]').forEach(input => input.remove());
    const name = root.dataset.name;
    if (name && !disabled) for (const value of selected) {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = name; input.value = value;
      input.dataset.soupHiddenValue = '';
      root.prepend(input);
    }
  };
  const focusOptions = () => Array.from(panel?.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ?? []);
  const focusOption = (index: number) => { const options = focusOptions(); if (options.length) options[(index + options.length) % options.length].focus(); };
  const close = (focus = false) => {
    panel?.remove(); panel = undefined; search = undefined; query = '';
    trigger.setAttribute('aria-expanded', 'false'); outside?.abort(); outside = undefined;
    if (focus) trigger.focus();
  };
  const renderOptions = () => {
    const host = panel?.querySelector<HTMLElement>('.soup-dropdown__options');
    if (!host) return;
    host.replaceChildren();
    const filtered = optionNodes.filter(node => !searchable || node.textContent?.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    if (!filtered.length) {
      const empty = document.createElement('p'); empty.className = 'soup-dropdown__empty'; empty.textContent = emptyMessage; host.append(empty); return;
    }
    for (const original of filtered) {
      const option = original.cloneNode(true) as HTMLElement;
      const value = original.dataset.value ?? '';
      const active = selected.includes(value);
      option.classList.add('soup-dropdown__option');
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(active));
      option.tabIndex = original.hasAttribute('data-disabled') ? -1 : 0;
      if (original.hasAttribute('data-disabled')) option.setAttribute('aria-disabled', 'true');
      if (active) option.append(createIcon('check'));
      const choose = () => {
        if (original.hasAttribute('data-disabled')) return;
        selecting = true;
        selected = multiple ? active ? selected.filter(item => item !== value) : [...selected, value] : [value];
        update(); announce();
        if (!multiple) close(true);
        else if (searchable) search?.focus();
        else Array.from(panel?.querySelectorAll<HTMLElement>('[role="option"]') ?? []).find(item => item.dataset.value === value)?.focus();
        queueMicrotask(() => { selecting = false; });
      };
      option.addEventListener('click', choose, { signal });
      option.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(); } }, { signal });
      host.append(option);
    }
  };
  const update = () => { root.dataset.value = selected.join(','); renderValue(); renderOptions(); };
  const open = () => {
    if (panel || disabled) return;
    trigger.setAttribute('aria-expanded', 'true');
    panel = document.createElement('div'); panel.className = 'soup-dropdown__panel';
    if (searchable) {
      const wrapper = document.createElement('div'); wrapper.className = 'soup-dropdown__search';
      search = document.createElement('input'); search.type = 'search';
      search.setAttribute('aria-label', `Search ${trigger.getAttribute('aria-label') ?? 'options'}`);
      search.placeholder = root.dataset.searchPlaceholder ?? 'Search options';
      search.addEventListener('input', () => { query = search!.value; renderOptions(); }, { signal });
      search.addEventListener('keydown', event => { if (event.key === 'ArrowDown') { event.preventDefault(); focusOption(0); } }, { signal });
      wrapper.append(search); panel.append(wrapper);
    }
    const list = document.createElement('div'); list.id = listId; list.className = 'soup-dropdown__list';
    list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', trigger.getAttribute('aria-label') ?? 'Options');
    if (multiple) list.setAttribute('aria-multiselectable', 'true');
    const optionHost = document.createElement('div'); optionHost.className = 'soup-dropdown__options'; list.append(optionHost);
    list.addEventListener('keydown', event => {
      const options = focusOptions(); const index = options.indexOf(document.activeElement as HTMLElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); focusOption(index + 1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); focusOption(index - 1); }
      if (event.key === 'Home') { event.preventDefault(); focusOption(0); }
      if (event.key === 'End') { event.preventDefault(); focusOption(options.length - 1); }
    }, { signal });
    panel.append(list); root.append(panel); renderOptions();
    outside = new AbortController();
    document.addEventListener('pointerdown', event => { if (!root.contains(event.target as Node)) close(); }, { signal: outside.signal });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(true); } }, { signal: outside.signal });
    requestAnimationFrame(() => searchable ? search?.focus() : focusOption(Math.max(optionNodes.findIndex(node => selected.includes(node.dataset.value ?? '')), 0)));
  };
  trigger.addEventListener('click', () => panel ? close() : open(), { signal });
  trigger.addEventListener('keydown', event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(); requestAnimationFrame(() => focusOption(event.key === 'ArrowDown' ? 0 : -1)); } }, { signal });
  root.addEventListener('soup:setvalue', event => {
    const value = (event as CustomEvent<{ value: string | string[] }>).detail.value;
    selected = Array.isArray(value) ? [...value] : value ? [value] : [];
    update();
  }, { signal });
  root.addEventListener('focusout', event => { if (!selecting && (!event.relatedTarget || !root.contains(event.relatedTarget as Node))) close(); }, { signal });
  update();
  return () => { close(); listeners.abort(); };
}
