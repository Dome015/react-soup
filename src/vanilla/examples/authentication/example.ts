import { notify } from '../../components/Toast/Toast';

const form = document.querySelector<HTMLFormElement>('.soup-auth form');
const viewport = document.querySelector<HTMLElement>('.soup-toast-viewport');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity() || !viewport) return;
  const email = form.querySelector<HTMLInputElement>('#auth-email')?.value ?? '';
  notify(viewport, { title: 'Demo sign in submitted', description: email, tone: 'success' });
});
