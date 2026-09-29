import { notify } from '../../components/Toast/Toast';
import { createIcon } from '../../icon';

type Role = 'Owner' | 'Editor' | 'Viewer';
type Member = { name: string; email: string; role: Role };
type Invitation = { id: number; email: string; role: 'Editor' | 'Viewer' };
const members: Member[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'Owner' },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor' },
  { name: 'Lin Chen', email: 'lin@example.com', role: 'Viewer' },
];
let invitations: Invitation[] = document.querySelector('table[aria-label="Pending invitations"]')
  ? [{ id: 1, email: 'sam@example.com', role: 'Editor' }, { id: 2, email: 'maya@example.com', role: 'Viewer' }]
  : [];
const tabs = document.querySelector<HTMLElement>('.soup-tabs');
const memberTab = tabs?.querySelector<HTMLButtonElement>('[role="tab"][aria-controls$="-panel-members"]');
const invitationTab = tabs?.querySelector<HTMLButtonElement>('[role="tab"][aria-controls$="-panel-invitations"]');
const invitationPanel = tabs?.querySelector<HTMLElement>('[role="tabpanel"][id$="-panel-invitations"]');
const invitationStack = invitationPanel?.querySelector<HTMLElement>('.soup-card > .soup-stack');
const inviteDialog = document.querySelector<HTMLDialogElement>('#soup-dialog-0');
const revokeDialog = document.querySelector<HTMLDialogElement>('#soup-dialog-1');
const form = document.querySelector<HTMLFormElement>('#team-invitation-form');
const emailInput = form?.querySelector<HTMLInputElement>('#team-invite-email');
const roleInput = form?.querySelector<HTMLSelectElement>('#team-invite-role');
const viewport = document.querySelector<HTMLElement>('.soup-toast-viewport');
let revokeTarget: Invitation | undefined;

function updateCounts() {
  if (memberTab) memberTab.textContent = `Members (${members.length})`;
  if (invitationTab) invitationTab.textContent = `Invitations (${invitations.length})`;
}
function clearEmailError() {
  form?.querySelector('#team-invite-email-error')?.remove();
  emailInput?.setAttribute('aria-invalid', 'false');
  emailInput?.removeAttribute('aria-describedby');
}
function showEmailError() {
  if (!emailInput) return;
  clearEmailError();
  const error = document.createElement('p'); error.id = 'team-invite-email-error'; error.className = 'soup-field__error'; error.setAttribute('role', 'alert');
  error.textContent = 'This person is already a member or has a pending invitation.';
  emailInput.closest('.soup-field')?.append(error);
  emailInput.setAttribute('aria-invalid', 'true'); emailInput.setAttribute('aria-describedby', error.id); emailInput.focus();
}
function makeInvitationRow(item: Invitation): HTMLTableRowElement {
  const row = document.createElement('tr'); row.dataset.invitationId = String(item.id);
  const email = document.createElement('strong'); email.textContent = item.email; row.insertCell().append(email);
  row.insertCell().textContent = item.role;
  const badge = document.createElement('span'); badge.className = 'soup-badge soup-tone--warning'; badge.textContent = 'Pending'; row.insertCell().append(badge);
  const revoke = document.createElement('button'); revoke.type = 'button'; revoke.className = 'soup-button soup-button--ghost soup-button--sm'; revoke.setAttribute('aria-label', `Revoke invitation for ${item.email}`); revoke.textContent = 'Revoke'; row.insertCell().append(revoke);
  return row;
}
function makeInvitationTable(): HTMLElement {
  const data = document.createElement('div'); data.className = 'soup-table-data';
  const scroll = document.createElement('div'); scroll.className = 'soup-table-scroll'; scroll.setAttribute('role', 'region'); scroll.setAttribute('aria-label', 'Scrollable table'); scroll.tabIndex = 0;
  const table = document.createElement('table'); table.className = 'soup-table'; table.setAttribute('aria-label', 'Pending invitations');
  const headers = table.createTHead().insertRow();
  for (const label of ['Email', 'Role', 'Status', 'Actions']) {
    const th = document.createElement('th'); th.scope = 'col';
    if (label === 'Email' || label === 'Role') { const button = document.createElement('button'); button.type = 'button'; button.className = 'soup-table__sort'; button.append(document.createTextNode(label), createIcon('sortNone')); th.append(button); }
    else th.textContent = label;
    headers.append(th);
  }
  table.createTBody(); scroll.append(table); data.append(scroll); return data;
}
function showInvitationEmpty() {
  if (!invitationStack) return;
  const alert = document.createElement('div'); alert.className = 'soup-alert soup-tone--info'; alert.setAttribute('role', 'status'); alert.append(createIcon('info'));
  const body = document.createElement('div'); const title = document.createElement('strong'); title.textContent = 'No pending invitations';
  const detail = document.createElement('div'); detail.textContent = 'There are no invitations waiting for a response. Invite someone new when you are ready.';
  body.append(title, detail); alert.append(body);
  invitationStack.querySelector('.soup-table-data, .soup-alert')?.replaceWith(alert);
}
function renderInvitations() {
  if (!invitationStack) return;
  if (!invitations.length) { showInvitationEmpty(); return; }
  let data = invitationStack.querySelector<HTMLElement>('.soup-table-data');
  if (!data) {
    data = makeInvitationTable();
    invitationStack.querySelector('.soup-alert')?.replaceWith(data);
  }
  data.querySelector('tbody')?.replaceChildren(...invitations.map(makeInvitationRow));
}
function setMenuDisabled() {
  document.querySelectorAll<HTMLElement>('table[aria-label="Workspace members"] .soup-menu').forEach(menu => {
    const row = menu.closest<HTMLTableRowElement>('tr');
    const member = members.find(item => item.email === row?.cells[1]?.textContent?.trim());
    if (!member) return;
    const template = menu.querySelector<HTMLTemplateElement>('template[data-soup-menu]');
    template?.content.querySelectorAll<HTMLButtonElement>('[role="menuitem"]').forEach(button => {
      button.disabled = button.dataset.action === `Make ${member.role.toLowerCase()}`;
    });
  });
}
setMenuDisabled();
const inviteButton = document.querySelector<HTMLButtonElement>('[data-soup-dialog-open="soup-dialog-0"]');
inviteButton?.addEventListener('click', () => { if (emailInput) emailInput.value = ''; if (roleInput) roleInput.value = 'Viewer'; clearEmailError(); });
emailInput?.addEventListener('input', clearEmailError);
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity() || !emailInput || !roleInput) return;
  const email = emailInput.value.trim().toLowerCase();
  if ([...members, ...invitations].some(person => person.email.toLowerCase() === email)) { showEmailError(); return; }
  invitations.push({ id: Math.max(0, ...invitations.map(item => item.id)) + 1, email, role: roleInput.value as Invitation['role'] });
  renderInvitations(); updateCounts(); inviteDialog?.close(); invitationTab?.click();
  if (viewport) notify(viewport, { title: 'Invitation sent', description: email, tone: 'success' });
});
inviteDialog?.addEventListener('soup:close', clearEmailError);
document.querySelector('table[aria-label="Workspace members"]')?.addEventListener('soup:select', event => {
  const row = (event.target as Element).closest<HTMLTableRowElement>('tr');
  const member = members.find(item => item.email === row?.cells[1]?.textContent?.trim());
  if (!member) return;
  const action = (event as CustomEvent<{ action: string }>).detail.action;
  const role = action === 'Make editor' ? 'Editor' : action === 'Make viewer' ? 'Viewer' : undefined;
  if (!role || member.role === role) return;
  member.role = role;
  const badge = row?.cells[2]?.querySelector<HTMLElement>('.soup-badge');
  if (badge) badge.textContent = role;
  setMenuDisabled();
  if (viewport) notify(viewport, { title: 'Role updated', description: `${member.name} is now ${role === 'Editor' ? 'an editor' : 'a viewer'}.`, tone: 'success' });
});
invitationPanel?.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button[aria-label^="Revoke invitation for "]');
  if (!button || !revokeDialog) return;
  const email = button.getAttribute('aria-label')!.replace('Revoke invitation for ', '');
  revokeTarget = invitations.find(item => item.email === email);
  const name = revokeDialog.querySelector<HTMLElement>('.soup-dialog__body strong'); if (name) name.textContent = email;
  revokeDialog.showModal();
});
revokeDialog?.addEventListener('soup:confirm', () => {
  if (!revokeTarget) return;
  invitations = invitations.filter(item => item.id !== revokeTarget!.id);
  renderInvitations(); updateCounts();
  if (viewport) notify(viewport, { title: 'Invitation revoked', description: revokeTarget.email });
  revokeTarget = undefined;
});
revokeDialog?.addEventListener('soup:close', () => { revokeTarget = undefined; });
const sortState = new WeakMap<HTMLTableElement, { index: number; direction: 'asc' | 'desc' | null }>();
tabs?.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('.soup-table__sort');
  const table = button?.closest<HTMLTableElement>('table');
  const body = table?.tBodies[0];
  if (!button || !table || !body) return;
  const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>('thead th'));
  const index = headers.indexOf(button.closest('th')!);
  const previous = sortState.get(table) ?? { index: -1, direction: null };
  const direction = index !== previous.index ? 'asc' : previous.direction === 'asc' ? 'desc' : null;
  const active = direction ? index : -1;
  sortState.set(table, { index: active, direction });
  const rows = Array.from(body.rows);
  if (direction) rows.sort((a, b) => (a.cells[index]?.textContent ?? '').localeCompare(b.cells[index]?.textContent ?? '', undefined, { numeric: true, sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1));
  else {
    const order = table.getAttribute('aria-label') === 'Workspace members'
      ? members.map(member => member.email)
      : invitations.map(invitation => invitation.email);
    rows.sort((a, b) => order.indexOf(a.cells[table.getAttribute('aria-label') === 'Workspace members' ? 1 : 0]?.textContent?.trim() ?? '') - order.indexOf(b.cells[table.getAttribute('aria-label') === 'Workspace members' ? 1 : 0]?.textContent?.trim() ?? ''));
  }
  body.replaceChildren(...rows);
  headers.forEach((header, headerIndex) => {
    if (headerIndex === active && direction) header.setAttribute('aria-sort', direction === 'asc' ? 'ascending' : 'descending'); else header.removeAttribute('aria-sort');
    header.querySelector('svg')?.replaceWith(createIcon(headerIndex === active && direction ? direction === 'asc' ? 'sortAsc' : 'sortDesc' : 'sortNone'));
  });
});
