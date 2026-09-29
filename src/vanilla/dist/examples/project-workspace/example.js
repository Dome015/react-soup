import {
  enhancePagination
} from "../../chunks/chunk-QLRK2CXA.js";
import {
  notify
} from "../../chunks/chunk-SYBGXCQL.js";
import {
  enhanceDropdownMenu
} from "../../chunks/chunk-CJC6JA7U.js";
import {
  createIcon
} from "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/project-workspace/example.ts
var initial = [
  { id: 1, name: "Atlas", owner: "Ada Lovelace", type: "Design", status: "Active" },
  { id: 2, name: "Orion", owner: "Grace Hopper", type: "Engineering", status: "Active" },
  { id: 3, name: "Meridian", owner: "Lin Chen", type: "Research", status: "Draft" },
  { id: 4, name: "Vector", owner: "Ada Lovelace", type: "Design", status: "Draft" },
  { id: 5, name: "Harbor", owner: "Grace Hopper", type: "Engineering", status: "Active" },
  { id: 6, name: "Signal", owner: "Lin Chen", type: "Research", status: "Active" },
  { id: 7, name: "Canvas", owner: "Ada Lovelace", type: "Design", status: "Draft" },
  { id: 8, name: "Relay", owner: "Grace Hopper", type: "Engineering", status: "Draft" }
];
var card = document.querySelector("main article.soup-card");
var cardStack = card?.querySelector(":scope > .soup-stack");
var template = document.querySelector("template[data-soup-workspace-card]");
var fullStack = cardStack?.querySelector(".soup-table-data") ? cardStack.cloneNode(true) : template?.content.querySelector("article.soup-card > .soup-stack")?.cloneNode(true);
var rowPattern = fullStack?.querySelector(".soup-table tbody tr");
var tablePattern = fullStack?.querySelector(".soup-table-data");
var formDialog = document.querySelector("#soup-dialog-0");
var deleteDialog = document.querySelector("#soup-dialog-1");
var form = document.querySelector("#project-workspace-form");
var nameInput = form?.querySelector("#workspace-name");
var ownerInput = form?.querySelector("#workspace-owner");
var typeInput = form?.querySelector("#workspace-type");
var statusInput = form?.querySelector("#workspace-draft-status");
var viewport = document.querySelector(".soup-toast-viewport");
var projects = cardStack?.querySelector(".soup-alert strong")?.textContent === "No projects yet" ? [] : [...initial];
var query = cardStack?.querySelector("#workspace-query")?.value ?? "";
var status = cardStack?.querySelector("#workspace-status")?.value ?? "all";
var page = 1;
var sortIndex = -1;
var direction = null;
var mode = null;
var selected;
function makeAlert(title, message) {
  const alert = document.createElement("div");
  alert.className = "soup-alert soup-tone--info";
  alert.setAttribute("role", "status");
  alert.append(createIcon("info"));
  const body = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = title;
  const detail = document.createElement("div");
  detail.textContent = message;
  body.append(strong, detail);
  alert.append(body);
  return alert;
}
function clearError() {
  form?.querySelector("#workspace-name-error")?.remove();
  nameInput?.setAttribute("aria-invalid", "false");
  nameInput?.removeAttribute("aria-describedby");
}
function showError(message) {
  if (!nameInput) return;
  clearError();
  const error = document.createElement("p");
  error.className = "soup-field__error";
  error.id = "workspace-name-error";
  error.setAttribute("role", "alert");
  error.textContent = message;
  nameInput.closest(".soup-field")?.append(error);
  nameInput.setAttribute("aria-invalid", "true");
  nameInput.setAttribute("aria-describedby", error.id);
  nameInput.focus();
}
function fillForm(project) {
  if (!nameInput || !ownerInput || !typeInput || !statusInput || !formDialog) return;
  nameInput.value = project?.name ?? "";
  ownerInput.value = project?.owner ?? "Ada Lovelace";
  typeInput.value = project?.type ?? "Design";
  statusInput.value = project?.status ?? "Draft";
  const title = project ? "Edit project" : "New project";
  formDialog.setAttribute("aria-label", title);
  const heading = formDialog.querySelector("h2");
  if (heading) heading.textContent = title;
  const submit = formDialog.querySelector('.soup-dialog__footer button[type="submit"]');
  if (submit) submit.textContent = project ? "Save changes" : "Create project";
  clearError();
}
function rowFor(project) {
  const row = rowPattern?.cloneNode(true);
  row.dataset.projectId = String(project.id);
  row.cells[0].querySelector("strong").textContent = project.name;
  row.cells[1].textContent = project.owner;
  row.cells[2].textContent = project.type;
  const badge = row.cells[3].querySelector(".soup-badge");
  badge.textContent = project.status;
  badge.className = `soup-badge soup-tone--${project.status === "Active" ? "success" : "neutral"}`;
  const menu = row.cells[4].querySelector(".soup-menu");
  const trigger = menu.querySelector(".soup-menu__trigger");
  trigger.setAttribute("aria-label", `Actions for ${project.name}`);
  trigger.removeAttribute("aria-controls");
  enhanceDropdownMenu(menu);
  return row;
}
function pagination(count) {
  const nav = document.createElement("nav");
  nav.className = "soup-pagination";
  nav.setAttribute("aria-label", "Pagination");
  const summary = document.createElement("span");
  summary.className = "soup-pagination__summary";
  summary.textContent = `Page ${page} of ${count}`;
  const controls = document.createElement("div");
  controls.className = "soup-pagination__controls";
  const iconButton = (label, icon, disabled) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "soup-pagination__button";
    button.setAttribute("aria-label", label);
    button.disabled = disabled;
    button.append(createIcon(icon));
    return button;
  };
  controls.append(iconButton("First page", "firstPage", page <= 1), iconButton("Previous page", "arrowLeft", page <= 1));
  const visible = /* @__PURE__ */ new Set();
  for (let number = 1; number <= count; number++) if (number === 1 || number === count || Math.abs(number - page) <= 1) visible.add(number);
  const pages = [...visible].sort((a, b) => a - b);
  pages.forEach((number, index) => {
    const previous = pages[index - 1];
    if (previous && number - previous > 2) {
      const dots = document.createElement("span");
      dots.className = "soup-pagination__ellipsis";
      dots.setAttribute("aria-hidden", "true");
      dots.textContent = "\u2026";
      controls.append(dots);
    }
    if (previous && number - previous === 2) {
      const middle = document.createElement("button");
      middle.type = "button";
      middle.className = "soup-pagination__button soup-pagination__page";
      middle.setAttribute("aria-label", `Page ${previous + 1}`);
      middle.textContent = String(previous + 1);
      controls.append(middle);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "soup-pagination__button soup-pagination__page";
    button.setAttribute("aria-label", `Page ${number}`);
    button.textContent = String(number);
    if (number === page) button.setAttribute("aria-current", "page");
    if (number === 1 || number === count) button.dataset.boundary = "true";
    controls.append(button);
  });
  controls.append(iconButton("Next page", "arrowRight", page >= count), iconButton("Last page", "lastPage", page >= count));
  nav.append(summary, controls);
  enhancePagination(nav);
  return nav;
}
function attachFilters() {
  const search = cardStack?.querySelector("#workspace-query");
  const select = cardStack?.querySelector("#workspace-status");
  search?.addEventListener("input", () => {
    query = search.value;
    page = 1;
    render();
  });
  select?.addEventListener("change", () => {
    status = select.value;
    page = 1;
    render();
  });
}
function render() {
  if (!cardStack || !fullStack || !tablePattern || !rowPattern) return;
  if (!projects.length) {
    cardStack.replaceChildren(makeAlert("No projects yet", "Create a project to start organizing your team\u2019s work."));
    return;
  }
  if (!cardStack.querySelector("#workspace-query")) {
    cardStack.replaceChildren(...Array.from(fullStack.childNodes).map((node) => node.cloneNode(true)));
    attachFilters();
  }
  const search = cardStack.querySelector("#workspace-query");
  if (search) search.value = query;
  const select = cardStack.querySelector("#workspace-status");
  if (select) select.value = status;
  const visible = projects.filter((project) => project.name.toLowerCase().includes(query.trim().toLowerCase()) && (status === "all" || project.status === status));
  const summary = cardStack.querySelector('strong[role="status"]');
  if (summary) summary.textContent = `${visible.length} ${visible.length === 1 ? "project" : "projects"}`;
  const summaryRow = summary?.parentElement;
  if (summaryRow) {
    summaryRow.querySelector("button")?.remove();
    if (query || status !== "all") {
      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "soup-button soup-button--ghost soup-button--md";
      clear.textContent = "Clear filters";
      summaryRow.append(clear);
    }
  }
  const oldResult = summaryRow?.nextElementSibling;
  if (!visible.length) {
    oldResult?.replaceWith(makeAlert("No matching projects", "Try a different search or clear the filters."));
    return;
  }
  const table = oldResult?.matches(".soup-table-data") ? oldResult : tablePattern.cloneNode(true);
  if (table !== oldResult) oldResult?.replaceWith(table);
  const ordered = [...visible];
  if (sortIndex >= 0 && direction) {
    const keys = ["name", "owner", "type", "status"];
    const field = keys[sortIndex];
    ordered.sort((a, b) => String(a[field]).localeCompare(String(b[field]), void 0, { numeric: true, sensitivity: "base" }) * (direction === "asc" ? 1 : -1));
  }
  const pageCount = Math.max(1, Math.ceil(ordered.length / 4));
  page = Math.min(page, pageCount);
  table.querySelector("tbody")?.replaceChildren(...ordered.slice((page - 1) * 4, page * 4).map(rowFor));
  table.querySelectorAll("thead th").forEach((header, index) => {
    if (index === sortIndex && direction) header.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");
    else header.removeAttribute("aria-sort");
    const svg = header.querySelector("svg");
    if (svg) svg.replaceWith(createIcon(index === sortIndex && direction ? direction === "asc" ? "sortAsc" : "sortDesc" : "sortNone"));
  });
  const footer = table.querySelector(".soup-table__pagination");
  if (pageCount > 1) {
    const nav = pagination(pageCount);
    if (footer) footer.replaceChildren(nav);
    else {
      const wrapper = document.createElement("div");
      wrapper.className = "soup-table__pagination";
      wrapper.append(nav);
      table.append(wrapper);
    }
  } else footer?.remove();
}
if (cardStack?.querySelector("#workspace-query")) attachFilters();
var createButton = document.querySelector('[data-soup-dialog-open="soup-dialog-0"]');
createButton?.addEventListener("click", () => {
  mode = "create";
  selected = void 0;
  fillForm();
});
card?.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest("button")?.textContent?.trim() === "Clear filters") {
    query = "";
    status = "all";
    page = 1;
    render();
    return;
  }
  const sort = target.closest(".soup-table__sort");
  if (!sort) return;
  const headers = Array.from(card.querySelectorAll(".soup-table__sort"));
  const index = headers.indexOf(sort);
  if (index !== sortIndex) {
    sortIndex = index;
    direction = "asc";
  } else if (direction === "asc") direction = "desc";
  else {
    sortIndex = -1;
    direction = null;
  }
  page = 1;
  render();
});
card?.addEventListener("soup:pagechange", (event) => {
  page = event.detail.page;
  render();
});
card?.addEventListener("soup:select", (event) => {
  const menu = event.target;
  const row = menu.closest("tr");
  selected = projects.find((project) => project.name === row?.cells[0]?.textContent?.trim());
  if (!selected) return;
  const action = event.detail.action;
  if (action === "Edit project" && formDialog) {
    mode = "edit";
    fillForm(selected);
    formDialog.showModal();
  }
  if (action === "Delete project" && deleteDialog) {
    mode = "delete";
    const name = deleteDialog.querySelector(".soup-dialog__body strong");
    if (name) name.textContent = selected.name;
    deleteDialog.showModal();
  }
});
nameInput?.addEventListener("input", clearError);
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity() || !nameInput || !ownerInput || !typeInput || !statusInput) return;
  const name = nameInput.value.trim();
  if (!name) {
    showError("Enter a project name.");
    return;
  }
  if (projects.some((project) => project.id !== selected?.id && project.name.toLowerCase() === name.toLowerCase())) {
    showError("A project with this name already exists.");
    return;
  }
  const draft = { name, owner: ownerInput.value, type: typeInput.value, status: statusInput.value };
  if (mode === "edit" && selected) {
    Object.assign(selected, draft);
    if (viewport) notify(viewport, { title: "Project updated", description: name, tone: "success" });
  } else if (mode === "create") {
    projects.push({ id: Math.max(0, ...projects.map((project) => project.id)) + 1, ...draft });
    query = "";
    status = "all";
    page = 1;
    if (viewport) notify(viewport, { title: "Project created", description: name, tone: "success" });
  }
  formDialog?.close();
  mode = null;
  selected = void 0;
  render();
});
deleteDialog?.addEventListener("soup:confirm", () => {
  if (!selected) return;
  projects = projects.filter((project) => project.id !== selected.id);
  if (viewport) notify(viewport, { title: "Project deleted", description: selected.name });
  mode = null;
  selected = void 0;
  render();
});
formDialog?.addEventListener("soup:close", () => {
  mode = null;
  selected = void 0;
  clearError();
});
deleteDialog?.addEventListener("soup:close", () => {
  mode = null;
  selected = void 0;
});
