const dialog = document.querySelector<HTMLDialogElement>('.soup-dialog');
dialog?.addEventListener('soup:confirm', () => {
  const badge = document.querySelector<HTMLElement>('.soup-card .soup-badge');
  const publish = document.querySelector<HTMLButtonElement>('[data-soup-dialog-open]');
  if (badge) { badge.textContent = 'Published'; badge.className = 'soup-badge soup-tone--success'; }
  if (publish) publish.disabled = true;
});
