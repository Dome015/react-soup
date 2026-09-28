import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { IconButton } from '../IconButton/IconButton';
import { cx, type Tone } from '../shared';

export type ToastData = { id: string; title: string; description?: string; tone?: Exclude<Tone, 'accent'> };
export type ToastProps = ToastData & { onDismiss: () => void };

export function Toast({ title, description, tone = 'neutral', onDismiss }: ToastProps) {
  return <div className={cx('soup-toast', `soup-tone--${tone}`)} role={tone === 'danger' ? 'alert' : 'status'}><div><strong>{title}</strong>{description && <p>{description}</p>}</div><IconButton icon="close" label="Dismiss notification" onClick={onDismiss} /></div>;
}

type ToastContextValue = { notify: (toast: Omit<ToastData, 'id'>) => void; dismiss: (id: string) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const dismiss = useCallback((id: string) => setToasts(current => current.filter(toast => toast.id !== id)), []);
  const notify = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = globalThis.crypto?.randomUUID?.() ?? String(Date.now());
    setToasts(current => [...current, { ...toast, id }]);
    globalThis.setTimeout(() => dismiss(id), 5000);
  }, [dismiss]);
  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);
  return <ToastContext.Provider value={value}>{children}<div className="soup-toast-viewport" aria-label="Notifications">{toasts.map(toast => <Toast key={toast.id} {...toast} onDismiss={() => dismiss(toast.id)} />)}</div></ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
