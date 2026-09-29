import { useEffect, useId, useRef, type ReactNode } from 'react';
import { IconButton } from '../IconButton/IconButton';

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Dialog({ open, onOpenChange, title, description, children, footer }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const descriptionId = useId();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);
  return <dialog ref={ref} className="soup-dialog" aria-label={title} aria-describedby={description ? descriptionId : undefined} onCancel={event => { event.preventDefault(); onOpenChange(false); }} onClose={() => { if (open) onOpenChange(false); }}>
    <div className="soup-dialog__header"><div><h2>{title}</h2>{description && <p id={descriptionId}>{description}</p>}</div><IconButton icon="close" label="Close dialog" onClick={() => onOpenChange(false)} /></div>
    <div className="soup-dialog__body">{children}</div>
    {footer && <div className="soup-dialog__footer">{footer}</div>}
  </dialog>;
}
