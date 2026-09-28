import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../shared';

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  label?: string;
  align?: 'start' | 'end';
};

export function Popover({ trigger, children, label = 'More information', align = 'start' }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const triggerBox = triggerRef.current?.getBoundingClientRect();
      const panelBox = panelRef.current?.getBoundingClientRect();
      if (!triggerBox || !panelBox) return;
      const panelStyle = getComputedStyle(panelRef.current!);
      const gutter = parseFloat(panelStyle.paddingLeft);
      const overlap = parseFloat(getComputedStyle(triggerRef.current!).borderBottomWidth);
      const preferredLeft = align === 'end' ? triggerBox.right - panelBox.width : triggerBox.left;
      const left = Math.max(gutter, Math.min(preferredLeft, window.innerWidth - panelBox.width - gutter));
      const below = triggerBox.bottom - overlap;
      const above = triggerBox.top - panelBox.height + overlap;
      const preferredTop = below + panelBox.height + gutter > window.innerHeight && above >= gutter ? above : below;
      const top = Math.max(gutter, Math.min(preferredTop, window.innerHeight - panelBox.height - gutter));
      setPosition({ top, left });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node) && !panelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const theme = rootRef.current?.closest<HTMLElement>('[data-theme]')?.dataset.theme;
  const close = () => { setOpen(false); triggerRef.current?.focus(); };
  return <div className="soup-popover" ref={rootRef} onBlur={event => {
    const next = event.relatedTarget as Node | null;
    if (!next || (!rootRef.current?.contains(next) && !panelRef.current?.contains(next))) setOpen(false);
  }}>
    <button ref={triggerRef} type="button" className="soup-popover__trigger" aria-expanded={open} aria-controls={id} onClick={() => { setPosition(null); setOpen(value => !value); }}>{trigger}</button>
    {open && createPortal(<div ref={panelRef} id={id} role="dialog" aria-label={label} data-theme={theme} style={position ?? undefined} className={cx('soup-popover__panel', !position && 'soup-popover__panel--unpositioned')} onBlur={event => {
      const next = event.relatedTarget as Node | null;
      if (!next || (!panelRef.current?.contains(next) && !rootRef.current?.contains(next))) setOpen(false);
    }}>{typeof children === 'function' ? children(close) : children}</div>, rootRef.current?.closest('dialog[open]') ?? document.body)}
  </div>;
}
