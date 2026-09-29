import {
  notify
} from "../../chunks/chunk-SYBGXCQL.js";
import {
  createIcon
} from "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/team-management/example.ts
var members = [
  { name: "Ada Lovelace", email: "ada@example.com", role: "Owner" },
  { name: "Grace Hopper", email: "grace@example.com", role: "Editor" },
  { name: "Lin Chen", email: "lin@example.com", role: "Viewer" }
];
var invitations = document.querySelector('table[aria-label="Pending invitations"]') ? [{ id: 1, email: "sam@example.com", role: "Editor" }, { id: 2, email: "maya@example.com", role: "Viewer" }] : [];
var tabs = document.querySelector(".soup-tabs");
var memberTab = tabs?.querySelector('[role="tab"][aria-controls$="-panel-members"]');
var invitationTab = tabs?.querySelector('[role="tab"][aria-controls$="-panel-invitations"]');
var invitationPanel = tabs?.querySelector('[role="tabpanel"][id$="-panel-invitations"]');
var invitationStack = invitationPanel?.querySelector(".soup-card > .soup-stack");
var inviteDialog = document.querySelector("#soup-dialog-0");
var revokeDialog = document.querySelector("#soup-dialog-1");
var form = document.querySelector("#team-invitation-form");
var emailInput = form?.querySelector("#team-invite-email");
var roleInput = form?.querySelector("#team-invite-role");
var viewport = document.querySelector(".soup-toast-viewport");
var revokeTarget;
function updateCounts() {
  if (memberTab) memberTab.textContent = `Members (${members.length})`;
  if (invitationTab) invitationTab.textContent = `Invitations (${invitations.length})`;
}
function clearEmailError() {
  form?.querySelector("#team-invite-email-error")?.remove();
  emailInput?.setAttribute("aria-invalid", "false");
  emailInput?.removeAttribute("aria-describedby");
}
function showEmailError() {
  if (!emailInput) return;
  clearEmailError();
  const error = document.createElement("p");
  error.id = "team-invite-email-error";
  error.className = "soup-field__error";
  error.setAttribute("role", "alert");
  error.textContent = "This person is already a member or has a pending invitation.";
  emailInput.closest(".soup-field")?.append(error);
  emailInput.setAttribute("aria-invalid", "true");
  emailInput.setAttribute("aria-describedby", error.id);
  emailInput.focus();
}
function makeInvitationRow(item) {
  const row = document.createElement("tr");
  row.dataset.invitationId = String(item.id);
  const email = document.createElement("strong");
  email.textContent = item.email;
  row.insertCell().append(email);
  row.insertCell().textContent = item.role;
  const badge = document.createElement("span");
  badge.className = "soup-badge soup-tone--warning";
  badge.textContent = "Pending";
  row.insertCell().append(badge);
  const revoke = document.createElement("button");
  revoke.type = "button";
  revoke.className = "soup-button soup-button--ghost soup-button--sm";
  revoke.setAttribute("aria-label", `Revoke invitation for ${item.email}`);
  revoke.textContent = "Revoke";
  row.insertCell().append(revoke);
  return row;
}
function makeInvitationTable() {
  const data = document.createElement("div");
  data.className = "soup-table-data";
  const scroll = document.createElement("div");
  scroll.className = "soup-table-scroll";
  scroll.setAttribute("role", "region");
  scroll.setAttribute("aria-label", "Scrollable table");
  scroll.tabIndex = 0;
  const table = document.createElement("table");
  table.className = "soup-table";
  table.setAttribute("aria-label", "Pending invitations");
  const headers = table.createTHead().insertRow();
  for (const label of ["Email", "Role", "Status", "Actions"]) {
    const th = document.createElement("th");
    th.scope = "col";
    if (label === "Email" || label === "Role") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "soup-table__sort";
      button.append(document.createTextNode(label), createIcon("sortNone"));
      th.append(button);
    } else th.textContent = label;
    headers.append(th);
  }
  table.createTBody();
  scroll.append(table);
  data.append(scroll);
  return data;
}
function showInvitationEmpty() {
  if (!invitationStack) return;
  const alert = document.createElement("div");
  alert.className = "soup-alert soup-tone--info";
  alert.setAttribute("role", "status");
  alert.append(createIcon("info"));
  const body = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = "No pending invitations";
  const detail = document.createElement("div");
  detail.textContent = "There are no invitations waiting for a response. Invite someone new when you are ready.";
  body.append(title, detail);
  alert.append(body);
  invitationStack.querySelector(".soup-table-data, .soup-alert")?.replaceWith(alert);
}
function renderInvitations() {
  if (!invitationStack) return;
  if (!invitations.length) {
    showInvitationEmpty();
    return;
  }
  let data = invitationStack.querySelector(".soup-table-data");
  if (!data) {
    data = makeInvitationTable();
    invitationStack.querySelector(".soup-alert")?.replaceWith(data);
  }
  data.querySelector("tbody")?.replaceChildren(...invitations.map(makeInvitationRow));
}
function setMenuDisabled() {
  document.querySelectorAll('table[aria-label="Workspace members"] .soup-menu').forEach((menu) => {
    const row = menu.closest("tr");
    const member = members.find((item) => item.email === row?.cells[1]?.textContent?.trim());
    if (!member) return;
    const template = menu.querySelector("template[data-soup-menu]");
    template?.content.querySelectorAll('[role="menuitem"]').forEach((button) => {
      button.disabled = button.dataset.action === `Make ${member.role.toLowerCase()}`;
    });
  });
}
setMenuDisabled();
var inviteButton = document.querySelector('[data-soup-dialog-open="soup-dialog-0"]');
inviteButton?.addEventListener("click", () => {
  if (emailInput) emailInput.value = "";
  if (roleInput) roleInput.value = "Viewer";
  clearEmailError();
});
emailInput?.addEventListener("input", clearEmailError);
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity() || !emailInput || !roleInput) return;
  const email = emailInput.value.trim().toLowerCase();
  if ([...members, ...invitations].some((person) => person.email.toLowerCase() === email)) {
    showEmailError();
    return;
  }
  invitations.push({ id: Math.max(0, ...invitations.map((item) => item.id)) + 1, email, role: roleInput.value });
  renderInvitations();
  updateCounts();
  inviteDialog?.close();
  invitationTab?.click();
  if (viewport) notify(viewport, { title: "Invitation sent", description: email, tone: "success" });
});
inviteDialog?.addEventListener("soup:close", clearEmailError);
document.querySelector('table[aria-label="Workspace members"]')?.addEventListener("soup:select", (event) => {
  const row = event.target.closest("tr");
  const member = members.find((item) => item.email === row?.cells[1]?.textContent?.trim());
  if (!member) return;
  const action = event.detail.action;
  const role = action === "Make editor" ? "Editor" : action === "Make viewer" ? "Viewer" : void 0;
  if (!role || member.role === role) return;
  member.role = role;
  const badge = row?.cells[2]?.querySelector(".soup-badge");
  if (badge) badge.textContent = role;
  setMenuDisabled();
  if (viewport) notify(viewport, { title: "Role updated", description: `${member.name} is now ${role === "Editor" ? "an editor" : "a viewer"}.`, tone: "success" });
});
invitationPanel?.addEventListener("click", (event) => {
  const button = event.target.closest('button[aria-label^="Revoke invitation for "]');
  if (!button || !revokeDialog) return;
  const email = button.getAttribute("aria-label").replace("Revoke invitation for ", "");
  revokeTarget = invitations.find((item) => item.email === email);
  const name = revokeDialog.querySelector(".soup-dialog__body strong");
  if (name) name.textContent = email;
  revokeDialog.showModal();
});
revokeDialog?.addEventListener("soup:confirm", () => {
  if (!revokeTarget) return;
  invitations = invitations.filter((item) => item.id !== revokeTarget.id);
  renderInvitations();
  updateCounts();
  if (viewport) notify(viewport, { title: "Invitation revoked", description: revokeTarget.email });
  revokeTarget = void 0;
});
revokeDialog?.addEventListener("soup:close", () => {
  revokeTarget = void 0;
});
var sortState = /* @__PURE__ */ new WeakMap();
tabs?.addEventListener("click", (event) => {
  const button = event.target.closest(".soup-table__sort");
  const table = button?.closest("table");
  const body = table?.tBodies[0];
  if (!button || !table || !body) return;
  const headers = Array.from(table.querySelectorAll("thead th"));
  const index = headers.indexOf(button.closest("th"));
  const previous = sortState.get(table) ?? { index: -1, direction: null };
  const direction = index !== previous.index ? "asc" : previous.direction === "asc" ? "desc" : null;
  const active = direction ? index : -1;
  sortState.set(table, { index: active, direction });
  const rows = Array.from(body.rows);
  if (direction) rows.sort((a, b) => (a.cells[index]?.textContent ?? "").localeCompare(b.cells[index]?.textContent ?? "", void 0, { numeric: true, sensitivity: "base" }) * (direction === "asc" ? 1 : -1));
  else {
    const order = table.getAttribute("aria-label") === "Workspace members" ? members.map((member) => member.email) : invitations.map((invitation) => invitation.email);
    rows.sort((a, b) => order.indexOf(a.cells[table.getAttribute("aria-label") === "Workspace members" ? 1 : 0]?.textContent?.trim() ?? "") - order.indexOf(b.cells[table.getAttribute("aria-label") === "Workspace members" ? 1 : 0]?.textContent?.trim() ?? ""));
  }
  body.replaceChildren(...rows);
  headers.forEach((header, headerIndex) => {
    if (headerIndex === active && direction) header.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");
    else header.removeAttribute("aria-sort");
    header.querySelector("svg")?.replaceWith(createIcon(headerIndex === active && direction ? direction === "asc" ? "sortAsc" : "sortDesc" : "sortNone"));
  });
});
