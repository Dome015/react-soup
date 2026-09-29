import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconName } from '../Icon/Icon';

export type DropdownMenuItem = { label: string; onSelect: () => void; icon?: IconName; danger?: boolean; disabled?: boolean };
export type DropdownMenuProps = { label: string; items: DropdownMenuItem[]; trigger?: ReactNode; align?: 'start' | 'end' };

export function DropdownMenu({ label, items, trigger, align = 'start' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const id = useId();
  const focusItem = (index: number) => {
    const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);
    buttons[(index + buttons.length) % buttons.length]?.focus();
  };
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!trigger || !panel) return;
      const wantedLeft = align === 'end' ? trigger.right - panel.width : trigger.left;
      const left = Math.max(0, Math.min(wantedLeft, window.innerWidth - panel.width));
      const overlap = parseFloat(getComputedStyle(triggerRef.current!).borderBottomWidth);
      const wantedTop = trigger.bottom - overlap;
      const top = wantedTop + panel.height > window.innerHeight && trigger.top >= panel.height ? trigger.top - panel.height + overlap : wantedTop;
      setPosition({ top, left });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [open, align]);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node) && !panelRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);
  const theme = rootRef.current?.closest<HTMLElement>('[data-theme]')?.dataset.theme;
  return <div className="soup-menu" ref={rootRef} onBlur={event => { const next = event.relatedTarget as Node | null; if (!next || (!rootRef.current?.contains(next) && !panelRef.current?.contains(next))) setOpen(false); }}>
    <button ref={triggerRef} type="button" className="soup-menu__trigger" aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={id} onClick={() => { setPosition(null); setOpen(!open); if (!open) requestAnimationFrame(() => focusItem(0)); }} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setPosition(null); setOpen(true); requestAnimationFrame(() => focusItem(0)); } }}>
      {trigger ?? <><span>{label}</span><Icon name="chevronDown" /></>}
    </button>
    {open && createPortal(<div ref={panelRef} id={id} role="menu" aria-label={label} data-theme={theme} style={position ?? undefined} className={`soup-menu__panel${position ? '' : ' soup-menu__panel--unpositioned'}`} onBlur={event => { const next = event.relatedTarget as Node | null; if (!next || (!panelRef.current?.contains(next) && !rootRef.current?.contains(next))) setOpen(false); }} onKeyDown={event => {
      const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); focusItem(index + 1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); focusItem(index - 1); }
      if (event.key === 'Home') { event.preventDefault(); focusItem(0); }
      if (event.key === 'End') { event.preventDefault(); focusItem(buttons.length - 1); }
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
    }}>
      {items.map((item, index) => <button key={`${item.label}-${index}`} type="button" role="menuitem" disabled={item.disabled} className={item.danger ? 'soup-menu__item soup-menu__item--danger' : 'soup-menu__item'} onClick={() => { item.onSelect(); setOpen(false); triggerRef.current?.focus(); }}>{item.icon && <Icon name={item.icon} />}{item.label}</button>)}
    </div>, rootRef.current?.closest('dialog[open]') ?? document.body)}
  </div>;
}
