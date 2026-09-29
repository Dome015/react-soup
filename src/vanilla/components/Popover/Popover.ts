/** Attaches a popup to a button; the popup content is authored in HTML. */
export function enhancePopover(root: HTMLElement): () => void {
  const trigger = root.querySelector<HTMLButtonElement>('.soup-popover__trigger');
  const template = root.querySelector<HTMLTemplateElement>('template[data-soup-popover]');
  if (!trigger || !template) return () => {};
  const id = trigger.getAttribute('aria-controls') || `soup-popover-${crypto.randomUUID()}`;
  trigger.setAttribute('aria-controls', id);
  const listeners = new AbortController();
  let openListeners: AbortController | undefined;
  let panel: HTMLElement | undefined;
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
    const gutter = parseFloat(getComputedStyle(panel).paddingLeft);
    const overlap = parseFloat(getComputedStyle(trigger).borderBottomWidth);
    const preferredLeft = root.dataset.align === 'end' ? box.right - panelBox.width : box.left;
    const left = Math.max(gutter, Math.min(preferredLeft, window.innerWidth - panelBox.width - gutter));
    const below = box.bottom - overlap;
    const above = box.top - panelBox.height + overlap;
    const preferredTop = below + panelBox.height + gutter > window.innerHeight && above >= gutter ? above : below;
    const top = Math.max(gutter, Math.min(preferredTop, window.innerHeight - panelBox.height - gutter));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.classList.remove('soup-popover__panel--unpositioned');
  };
  const open = () => {
    if (panel || trigger.disabled) return;
    panel = document.createElement('div');
    panel.id = id;
    panel.className = 'soup-popover__panel soup-popover__panel--unpositioned';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', root.dataset.label ?? 'More information');
    const theme = root.closest<HTMLElement>('[data-theme]')?.dataset.theme;
    if (theme) panel.dataset.theme = theme;
    panel.append(template.content.cloneNode(true));
    (root.closest('dialog[open]') ?? document.body).append(panel);
    trigger.setAttribute('aria-expanded', 'true');
    openListeners = new AbortController();
    const signal = openListeners.signal;
    document.addEventListener('pointerdown', event => {
      if (!root.contains(event.target as Node) && !panel?.contains(event.target as Node)) close();
    }, { signal });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(true); }
    }, { signal });
    panel.addEventListener('click', event => {
      if ((event.target as Element).closest('[data-soup-close]')) close(true);
    }, { signal });
    panel.addEventListener('focusout', event => {
      if (event.relatedTarget && !panel?.contains(event.relatedTarget as Node) && !root.contains(event.relatedTarget as Node)) close();
    }, { signal });
    window.addEventListener('resize', position, { signal });
    window.addEventListener('scroll', position, { signal, capture: true });
    position();
  };
  trigger.addEventListener('click', () => panel ? close() : open(), { signal: listeners.signal });
  return () => { close(); listeners.abort(); };
}
