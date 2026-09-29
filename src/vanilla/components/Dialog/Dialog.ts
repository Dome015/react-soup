/** Uses the browser's native modal dialog, focus trap, and Escape handling. */
export function enhanceDialog(dialog: HTMLDialogElement): () => void {
  const listeners = new AbortController();
  const signal = listeners.signal;
  const openers = dialog.id
    ? Array.from(document.querySelectorAll<HTMLButtonElement>(`[data-soup-dialog-open="${CSS.escape(dialog.id)}"]`))
    : [];
  openers.forEach(button => button.addEventListener('click', () => {
    if (!dialog.open && !button.disabled) dialog.showModal();
  }, { signal }));
  dialog.querySelector<HTMLButtonElement>('.soup-dialog__header [aria-label="Close dialog"]')
    ?.addEventListener('click', () => dialog.close(), { signal });
  dialog.querySelectorAll<HTMLButtonElement>('.soup-dialog__footer button').forEach(button => {
    if (button.type === 'submit') return;
    button.addEventListener('click', () => {
      if (button.disabled) return;
      if (button.textContent?.trim() !== 'Cancel') {
        dialog.dispatchEvent(new CustomEvent('soup:confirm', { bubbles: true, detail: { action: button.textContent?.trim() } }));
      }
      dialog.close();
    }, { signal });
  });
  dialog.addEventListener('close', () => dialog.dispatchEvent(new CustomEvent('soup:close', { bubbles: true })), { signal });
  return () => listeners.abort();
}
