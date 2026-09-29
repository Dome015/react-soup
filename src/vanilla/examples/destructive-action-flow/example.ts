import { createIcon } from '../../icon';

const dialog = document.querySelector<HTMLDialogElement>('.soup-dialog');
const confirmation = dialog?.querySelector<HTMLInputElement>('#delete-confirmation');
const remove = dialog?.querySelector<HTMLButtonElement>('.soup-dialog__footer .soup-button--danger');
confirmation?.addEventListener('input', () => { if (remove) remove.disabled = confirmation.value !== 'Northstar Studio'; });
dialog?.addEventListener('soup:close', () => { if (confirmation) confirmation.value = ''; if (remove) remove.disabled = true; });
dialog?.addEventListener('soup:confirm', () => {
  const card = document.querySelector<HTMLElement>('main > .soup-stack > article.soup-card');
  if (!card) return;
  const alert = document.createElement('div');
  alert.className = 'soup-alert soup-tone--success';
  alert.setAttribute('role', 'status');
  alert.append(createIcon('info'));
  const text = document.createElement('div');
  const title = document.createElement('strong'); title.textContent = 'Workspace deleted';
  const description = document.createElement('div'); description.textContent = 'The demo workspace has been removed.';
  text.append(title, description); alert.append(text);
  card.replaceWith(alert);
});
