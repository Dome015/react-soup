import { createIcon } from '../../icon';

export type ToastMessage = { title: string; description?: string; tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' };

/** A small notification function for an existing HTML viewport. */
export function notify(viewport: HTMLElement, message: ToastMessage): () => void {
  const toast = document.createElement('div');
  const tone = message.tone ?? 'neutral';
  toast.className = `soup-toast soup-tone--${tone}`;
  toast.setAttribute('role', tone === 'danger' ? 'alert' : 'status');
  const content = document.createElement('div');
  const title = document.createElement('strong');
  title.textContent = message.title;
  content.append(title);
  if (message.description) {
    const description = document.createElement('p');
    description.textContent = message.description;
    content.append(description);
  }
  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'soup-icon-button soup-button--ghost soup-button--md';
  dismiss.setAttribute('aria-label', 'Dismiss notification');
  dismiss.append(createIcon('close'));
  toast.append(content, dismiss);
  viewport.append(toast);
  const timer = window.setTimeout(() => toast.remove(), 5000);
  const remove = () => { window.clearTimeout(timer); toast.remove(); };
  dismiss.addEventListener('click', remove, { once: true });
  return remove;
}

export function enhanceToastDismiss(root: ParentNode = document): () => void {
  const listeners = new AbortController();
  root.querySelectorAll<HTMLButtonElement>('.soup-toast [aria-label="Dismiss notification"]').forEach(button => {
    button.addEventListener('click', () => button.closest('.soup-toast')?.remove(), { signal: listeners.signal });
  });
  root.querySelectorAll<HTMLButtonElement>('[data-soup-toast-title]').forEach(button => {
    button.addEventListener('click', () => {
      const viewport = root.querySelector<HTMLElement>('.soup-toast-viewport');
      if (viewport) notify(viewport, { title: button.dataset.soupToastTitle ?? '', description: button.dataset.soupToastDescription, tone: button.dataset.soupToastTone as ToastMessage['tone'] });
    }, { signal: listeners.signal });
  });
  return () => listeners.abort();
}
