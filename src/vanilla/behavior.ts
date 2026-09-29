import { enhanceDropdown } from './components/Dropdown/Dropdown';
import { enhanceDropdownMenu } from './components/DropdownMenu/DropdownMenu';
import { enhancePopover } from './components/Popover/Popover';
import { enhancePagination } from './components/Pagination/Pagination';
import { enhanceDialog } from './components/Dialog/Dialog';
import { enhanceDataTable } from './components/Table/Table';
import { enhanceToastDismiss } from './components/Toast/Toast';
import { enhanceChartTooltip } from './components/Chart/shared';

/** Optional progressive enhancement for markup that needs shared keyboard behavior. */
export function enhanceVanilla(root: ParentNode = document): () => void {
  const listeners = new AbortController();
  const signal = listeners.signal;
  const cleanups = [
    ...Array.from(root.querySelectorAll<HTMLElement>('.soup-dropdown')).map(enhanceDropdown),
    ...Array.from(root.querySelectorAll<HTMLElement>('.soup-menu')).map(enhanceDropdownMenu),
    ...Array.from(root.querySelectorAll<HTMLElement>('.soup-popover')).map(enhancePopover),
    ...Array.from(root.querySelectorAll<HTMLElement>('.soup-pagination')).map(enhancePagination),
    ...Array.from(root.querySelectorAll<HTMLDialogElement>('dialog.soup-dialog')).map(enhanceDialog),
    ...Array.from(root.querySelectorAll<HTMLElement>('.soup-table-data')).map(enhanceDataTable),
    enhanceToastDismiss(root),
    ...Array.from(root.querySelectorAll<HTMLElement>('.soup-chart')).map(enhanceChartTooltip),
  ];

  root.querySelectorAll<HTMLElement>('.soup-tabs').forEach(tabs => {
    const buttons = Array.from(tabs.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const panels = Array.from(tabs.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
    const select = (button: HTMLButtonElement) => {
      if (button.disabled) return;
      buttons.forEach(item => { item.setAttribute('aria-selected', String(item === button)); item.tabIndex = item === button ? 0 : -1; });
      panels.forEach(panel => { panel.hidden = panel.id !== button.getAttribute('aria-controls'); });
      tabs.dispatchEvent(new CustomEvent('soup:change', { detail: { value: button.id }, bubbles: true }));
    };
    buttons.forEach(button => {
      button.addEventListener('click', () => select(button), { signal });
      button.addEventListener('keydown', event => {
        const enabled = buttons.filter(item => !item.disabled);
        const current = enabled.indexOf(button);
        const target = event.key === 'ArrowRight' ? enabled[(current + 1) % enabled.length]
          : event.key === 'ArrowLeft' ? enabled[(current - 1 + enabled.length) % enabled.length]
          : event.key === 'Home' ? enabled[0]
          : event.key === 'End' ? enabled[enabled.length - 1] : undefined;
        if (target) { event.preventDefault(); select(target); target.focus(); }
      }, { signal });
    });
  });

  root.querySelectorAll<HTMLElement>('.soup-file-tree').forEach(tree => {
    tree.querySelectorAll<HTMLButtonElement>('.soup-file-tree__file').forEach(file => {
      file.addEventListener('click', () => {
        tree.querySelectorAll('.soup-file-tree__file[aria-current]').forEach(item => item.removeAttribute('aria-current'));
        file.setAttribute('aria-current', 'true');
        tree.dispatchEvent(new CustomEvent('soup:select', { detail: { label: file.textContent?.trim() }, bubbles: true }));
      }, { signal });
    });
  });

  return () => { cleanups.forEach(cleanup => cleanup()); listeners.abort(); };
}

if (typeof document !== 'undefined') enhanceVanilla(document);
