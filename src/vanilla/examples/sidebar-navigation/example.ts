export {};

const navigation = document.querySelector<HTMLElement>('.soup-example-nav');
const title = document.querySelector<HTMLElement>('.soup-example-main h1');
const cardTitle = document.querySelector<HTMLElement>('.soup-example-main h2');
navigation?.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button');
  if (!button) return;
  navigation.querySelectorAll('button[aria-current]').forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  const section = button.textContent?.trim() ?? '';
  if (title) title.textContent = section;
  if (cardTitle) cardTitle.textContent = `${section} workspace`;
});
