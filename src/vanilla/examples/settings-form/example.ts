import { notify } from '../../components/Toast/Toast';

const form = document.querySelector<HTMLFormElement>('main form');
const viewport = document.querySelector<HTMLElement>('.soup-toast-viewport');
const timezone = document.querySelector<HTMLElement>('#settings-timezone')?.closest<HTMLElement>('.soup-dropdown');
const reminder = document.querySelector<HTMLElement>('#settings-review-time-description');
timezone?.addEventListener('soup:change', event => {
  const value = (event as CustomEvent<{ value: string }>).detail.value;
  if (reminder) reminder.textContent = `Local time in ${value}`;
});
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (form.reportValidity() && viewport) notify(viewport, { title: 'Settings saved', tone: 'success' });
});
