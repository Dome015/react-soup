/** Progressive enhancement for authored menu markup and its item template. */
export function enhanceDropdownMenu(root: HTMLElement): () => void {
  const trigger = root.querySelector<HTMLButtonElement>('.soup-menu__trigger');
  const template = root.querySelector<HTMLTemplateElement>('template[data-soup-menu]');
  if (!trigger || !template) return () => {};
  const id = trigger.getAttribute('aria-controls') || `soup-menu-${crypto.randomUUID()}`;
  trigger.setAttribute('aria-controls', id);
  const listeners = new AbortController();
  let openListeners: AbortController | undefined;
  let panel: HTMLElement | undefined;
  const items = () => Array.from(panel?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);
  const focusItem = (index: number) => { const available = items(); available[(index + available.length) % available.length]?.focus(); };
  const close = (restoreFocus = false) => {
    openListeners?.abort(); openListeners = undefined;
    panel?.remove(); panel = undefined;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  };
  const position = () => {
    if (!panel) return;
    const box = trigger.getBoundingClientRect();
    const panelBox = panel.getBoundingClientRect();
    const preferred = root.dataset.align === 'end' ? box.right - panelBox.width : box.left;
    const left = Math.max(0, Math.min(preferred, window.innerWidth - panelBox.width));
    const overlap = parseFloat(getComputedStyle(trigger).borderBottomWidth);
    const below = box.bottom - overlap;
    const top = below + panelBox.height > window.innerHeight && box.top >= panelBox.height ? box.top - panelBox.height + overlap : below;
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.classList.remove('soup-menu__panel--unpositioned');
  };
  const open = () => {
    if (panel || trigger.disabled) return;
    panel = document.createElement('div');
    panel.id = id;
    panel.className = 'soup-menu__panel soup-menu__panel--unpositioned';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', trigger.getAttribute('aria-label') ?? 'Actions');
    const theme = root.closest<HTMLElement>('[data-theme]')?.dataset.theme;
    if (theme) panel.dataset.theme = theme;
    panel.append(template.content.cloneNode(true));
    (root.closest('dialog[open]') ?? document.body).append(panel);
    trigger.setAttribute('aria-expanded', 'true');
    openListeners = new AbortController();
    const signal = openListeners.signal;
    panel.addEventListener('click', event => {
      const item = (event.target as Element).closest<HTMLButtonElement>('[role="menuitem"]');
      if (!item || item.disabled) return;
      root.dispatchEvent(new CustomEvent('soup:select', { bubbles: true, detail: { action: item.dataset.action ?? item.textContent?.trim() } }));
      close(true);
    }, { signal });
    panel.addEventListener('keydown', event => {
      const index = items().indexOf(document.activeElement as HTMLButtonElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); focusItem(index + 1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); focusItem(index - 1); }
      if (event.key === 'Home') { event.preventDefault(); focusItem(0); }
      if (event.key === 'End') { event.preventDefault(); focusItem(items().length - 1); }
    }, { signal });
    document.addEventListener('pointerdown', event => {
      if (!root.contains(event.target as Node) && !panel?.contains(event.target as Node)) close();
    }, { signal });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(true); }
    }, { signal });
    window.addEventListener('resize', position, { signal });
    window.addEventListener('scroll', position, { signal, capture: true });
    panel.addEventListener('focusout', event => {
      if (event.relatedTarget && !panel?.contains(event.relatedTarget as Node) && !root.contains(event.relatedTarget as Node)) close();
    }, { signal });
    position();
    requestAnimationFrame(() => focusItem(0));
  };
  trigger.addEventListener('click', () => panel ? close() : open(), { signal: listeners.signal });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); open(); requestAnimationFrame(() => focusItem(0)); }
  }, { signal: listeners.signal });
  return () => { close(); listeners.abort(); };
}
