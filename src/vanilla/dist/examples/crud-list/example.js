import {
  enhanceDropdownMenu
} from "../../chunks/chunk-CJC6JA7U.js";
import {
  createIcon
} from "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/crud-list/example.ts
var initial = [
  { id: 1, name: "Atlas", owner: "Ada Lovelace", status: "Active" },
  { id: 2, name: "Orion", owner: "Grace Hopper", status: "Draft" },
  { id: 3, name: "Meridian", owner: "Lin Chen", status: "Active" }
];
var projects = document.querySelector(".soup-table") ? [...initial] : [];
var nextId = 4;
var target;
var card = document.querySelector("main article.soup-card");
var dialog = document.querySelector(".soup-dialog");
var addButton = Array.from(document.querySelectorAll("main button")).find((button) => button.textContent?.trim() === "New project");
function makeMenu(project) {
  const menu = document.createElement("div");
  menu.className = "soup-menu";
  menu.dataset.align = "end";
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "soup-menu__trigger";
  trigger.setAttribute("aria-label", `Actions for ${project.name}`);
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");
  trigger.append(createIcon("more"));
  const template = document.createElement("template");
  template.dataset.soupMenu = "";
  const active = document.createElement("button");
  active.type = "button";
  active.className = "soup-menu__item";
  active.setAttribute("role", "menuitem");
  active.dataset.action = "Mark active";
  active.append(createIcon("check"), document.createTextNode("Mark active"));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "soup-menu__item soup-menu__item--danger";
  remove.setAttribute("role", "menuitem");
  remove.dataset.action = "Delete";
  remove.append(createIcon("trash"), document.createTextNode("Delete"));
  template.content.append(active, remove);
  menu.append(trigger, template);
  enhanceDropdownMenu(menu);
  return menu;
}
function makeRow(project) {
  const row = document.createElement("tr");
  row.dataset.projectId = String(project.id);
  const name = row.insertCell();
  const strong = document.createElement("strong");
  strong.textContent = project.name;
  name.append(strong);
  row.insertCell().textContent = project.owner;
  const status = row.insertCell();
  const badge = document.createElement("span");
  badge.className = `soup-badge soup-tone--${project.status === "Active" ? "success" : "neutral"}`;
  badge.textContent = project.status;
  status.append(badge);
  row.insertCell().append(makeMenu(project));
  return row;
}
function showEmpty() {
  if (!card) return;
  const alert = document.createElement("div");
  alert.className = "soup-alert soup-tone--info";
  alert.setAttribute("role", "status");
  alert.append(createIcon("info"));
  const text = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = "No projects";
  const detail = document.createElement("div");
  detail.textContent = "Create your first project to get started.";
  text.append(title, detail);
  alert.append(text);
  card.replaceChildren(alert);
}
function ensureTable() {
  if (!card) return;
  let body = card.querySelector("tbody");
  if (body) return body;
  const region = document.createElement("div");
  region.className = "soup-table-scroll";
  region.setAttribute("role", "region");
  region.setAttribute("aria-label", "Scrollable table");
  region.tabIndex = 0;
  const table = document.createElement("table");
  table.className = "soup-table";
  const head = table.createTHead();
  const headings = head.insertRow();
  for (const label of ["Name", "Owner", "Status", "Actions"]) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = label;
    headings.append(th);
  }
  body = table.createTBody();
  region.append(table);
  card.replaceChildren(region);
  return body;
}
addButton?.addEventListener("click", () => {
  const project = { id: nextId, name: `New project ${nextId}`, owner: "Ada Lovelace", status: "Draft" };
  nextId++;
  projects.push(project);
  ensureTable()?.append(makeRow(project));
});
card?.addEventListener("soup:select", (event) => {
  const menu = event.target;
  const row = menu.closest("tr");
  const project = projects.find((item) => item.id === Number(row?.dataset.projectId) || item.name === row?.cells[0]?.textContent?.trim());
  if (!project || !row) return;
  const action = event.detail.action;
  if (action === "Mark active") {
    project.status = "Active";
    const badge = row.querySelector(".soup-badge");
    if (badge) {
      badge.textContent = "Active";
      badge.className = "soup-badge soup-tone--success";
    }
  }
  if (action === "Delete" && dialog) {
    target = project;
    const name = dialog.querySelector(".soup-dialog__body strong");
    if (name) name.textContent = project.name;
    dialog.showModal();
  }
});
dialog?.addEventListener("soup:confirm", () => {
  if (!target) return;
  projects = projects.filter((project) => project.id !== target.id);
  const row = Array.from(card?.querySelectorAll("tbody tr") ?? []).find((item) => item.cells[0]?.textContent?.trim() === target?.name);
  row?.remove();
  if (!projects.length) showEmpty();
  target = void 0;
});
dialog?.addEventListener("soup:close", () => {
  target = void 0;
});
