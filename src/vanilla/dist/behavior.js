import {
  enhancePagination
} from "./chunks/chunk-QLRK2CXA.js";
import {
  enhanceChartTooltip
} from "./chunks/chunk-USGUEH7Y.js";
import {
  enhanceToastDismiss
} from "./chunks/chunk-SYBGXCQL.js";
import {
  enhanceDropdownMenu
} from "./chunks/chunk-CJC6JA7U.js";
import {
  createIcon,
  iconShapes
} from "./chunks/chunk-OUDMSHVE.js";

// src/vanilla/components/Dropdown/Dropdown.ts
function enhanceDropdown(root) {
  const trigger = root.querySelector(".soup-dropdown__trigger");
  const control = root.querySelector(".soup-dropdown__control");
  const source = root.querySelector("template[data-soup-options]");
  if (!trigger || !control || !source) return () => {
  };
  const id = trigger.id || `soup-dropdown-${crypto.randomUUID()}`;
  trigger.id = id;
  const listId = `${id}-listbox`;
  trigger.setAttribute("aria-controls", listId);
  const multiple = root.hasAttribute("data-multiple");
  const searchable = root.hasAttribute("data-searchable");
  const clearable = root.hasAttribute("data-clearable");
  const disabled = trigger.disabled;
  const placeholder = root.dataset.placeholder ?? "Select an option";
  const emptyMessage = root.dataset.emptyMessage ?? "No matching options";
  const optionNodes = Array.from(source.content.querySelectorAll("[data-value]"));
  let selected = root.dataset.value ? root.dataset.value.split(",").filter(Boolean) : [];
  let query = "";
  let selecting = false;
  let panel;
  let search;
  let outside;
  const listeners = new AbortController();
  const signal = listeners.signal;
  const values = () => multiple ? [...selected] : selected[0] ?? "";
  const announce = () => root.dispatchEvent(new CustomEvent("soup:change", { detail: { value: values() }, bubbles: true }));
  const renderValue = () => {
    const label = selected.map((value) => optionNodes.find((node) => node.dataset.value === value)?.querySelector("strong")?.textContent ?? value).join(", ");
    const text = trigger.querySelector(".soup-dropdown__value, .soup-dropdown__placeholder");
    if (text) {
      text.textContent = label || placeholder;
      text.className = label ? "soup-dropdown__value" : "soup-dropdown__placeholder";
    }
    control.querySelector(".soup-icon-button")?.remove();
    if (clearable && selected.length && !disabled) {
      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "soup-icon-button soup-button--secondary soup-button--md";
      clear.setAttribute("aria-label", `Clear ${trigger.getAttribute("aria-label") ?? "selection"}`);
      clear.append(createIcon("close"));
      clear.addEventListener("click", () => {
        selected = [];
        update();
        announce();
      }, { signal });
      control.append(clear);
    }
    root.querySelectorAll("input[data-soup-hidden-value]").forEach((input) => input.remove());
    const name = root.dataset.name;
    if (name && !disabled) for (const value of selected) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      input.dataset.soupHiddenValue = "";
      root.prepend(input);
    }
  };
  const focusOptions = () => Array.from(panel?.querySelectorAll('[role="option"]:not([aria-disabled="true"])') ?? []);
  const focusOption = (index) => {
    const options = focusOptions();
    if (options.length) options[(index + options.length) % options.length].focus();
  };
  const close = (focus = false) => {
    panel?.remove();
    panel = void 0;
    search = void 0;
    query = "";
    trigger.setAttribute("aria-expanded", "false");
    outside?.abort();
    outside = void 0;
    if (focus) trigger.focus();
  };
  const renderOptions = () => {
    const host = panel?.querySelector(".soup-dropdown__options");
    if (!host) return;
    host.replaceChildren();
    const filtered = optionNodes.filter((node) => !searchable || node.textContent?.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "soup-dropdown__empty";
      empty.textContent = emptyMessage;
      host.append(empty);
      return;
    }
    for (const original of filtered) {
      const option = original.cloneNode(true);
      const value = original.dataset.value ?? "";
      const active = selected.includes(value);
      option.classList.add("soup-dropdown__option");
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(active));
      option.tabIndex = original.hasAttribute("data-disabled") ? -1 : 0;
      if (original.hasAttribute("data-disabled")) option.setAttribute("aria-disabled", "true");
      if (active) option.append(createIcon("check"));
      const choose = () => {
        if (original.hasAttribute("data-disabled")) return;
        selecting = true;
        selected = multiple ? active ? selected.filter((item) => item !== value) : [...selected, value] : [value];
        update();
        announce();
        if (!multiple) close(true);
        else if (searchable) search?.focus();
        else Array.from(panel?.querySelectorAll('[role="option"]') ?? []).find((item) => item.dataset.value === value)?.focus();
        queueMicrotask(() => {
          selecting = false;
        });
      };
      option.addEventListener("click", choose, { signal });
      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      }, { signal });
      host.append(option);
    }
  };
  const update = () => {
    root.dataset.value = selected.join(",");
    renderValue();
    renderOptions();
  };
  const open = () => {
    if (panel || disabled) return;
    trigger.setAttribute("aria-expanded", "true");
    panel = document.createElement("div");
    panel.className = "soup-dropdown__panel";
    if (searchable) {
      const wrapper = document.createElement("div");
      wrapper.className = "soup-dropdown__search";
      search = document.createElement("input");
      search.type = "search";
      search.setAttribute("aria-label", `Search ${trigger.getAttribute("aria-label") ?? "options"}`);
      search.placeholder = root.dataset.searchPlaceholder ?? "Search options";
      search.addEventListener("input", () => {
        query = search.value;
        renderOptions();
      }, { signal });
      search.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusOption(0);
        }
      }, { signal });
      wrapper.append(search);
      panel.append(wrapper);
    }
    const list = document.createElement("div");
    list.id = listId;
    list.className = "soup-dropdown__list";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-label", trigger.getAttribute("aria-label") ?? "Options");
    if (multiple) list.setAttribute("aria-multiselectable", "true");
    const optionHost = document.createElement("div");
    optionHost.className = "soup-dropdown__options";
    list.append(optionHost);
    list.addEventListener("keydown", (event) => {
      const options = focusOptions();
      const index = options.indexOf(document.activeElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusOption(index + 1);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        focusOption(index - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        focusOption(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        focusOption(options.length - 1);
      }
    }, { signal });
    panel.append(list);
    root.append(panel);
    renderOptions();
    outside = new AbortController();
    document.addEventListener("pointerdown", (event) => {
      if (!root.contains(event.target)) close();
    }, { signal: outside.signal });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    }, { signal: outside.signal });
    requestAnimationFrame(() => searchable ? search?.focus() : focusOption(Math.max(optionNodes.findIndex((node) => selected.includes(node.dataset.value ?? "")), 0)));
  };
  trigger.addEventListener("click", () => panel ? close() : open(), { signal });
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
      requestAnimationFrame(() => focusOption(event.key === "ArrowDown" ? 0 : -1));
    }
  }, { signal });
  root.addEventListener("soup:setvalue", (event) => {
    const value = event.detail.value;
    selected = Array.isArray(value) ? [...value] : value ? [value] : [];
    update();
  }, { signal });
  root.addEventListener("focusout", (event) => {
    if (!selecting && (!event.relatedTarget || !root.contains(event.relatedTarget))) close();
  }, { signal });
  update();
  return () => {
    close();
    listeners.abort();
  };
}

// src/vanilla/components/Popover/Popover.ts
function enhancePopover(root) {
  const trigger = root.querySelector(".soup-popover__trigger");
  const template = root.querySelector("template[data-soup-popover]");
  if (!trigger || !template) return () => {
  };
  const id = trigger.getAttribute("aria-controls") || `soup-popover-${crypto.randomUUID()}`;
  trigger.setAttribute("aria-controls", id);
  const listeners = new AbortController();
  let openListeners;
  let panel;
  const close = (restoreFocus = false) => {
    openListeners?.abort();
    openListeners = void 0;
    panel?.remove();
    panel = void 0;
    trigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) trigger.focus();
  };
  const position = () => {
    if (!panel) return;
    const box = trigger.getBoundingClientRect();
    const panelBox = panel.getBoundingClientRect();
    const gutter = parseFloat(getComputedStyle(panel).paddingLeft);
    const overlap = parseFloat(getComputedStyle(trigger).borderBottomWidth);
    const preferredLeft = root.dataset.align === "end" ? box.right - panelBox.width : box.left;
    const left = Math.max(gutter, Math.min(preferredLeft, window.innerWidth - panelBox.width - gutter));
    const below = box.bottom - overlap;
    const above = box.top - panelBox.height + overlap;
    const preferredTop = below + panelBox.height + gutter > window.innerHeight && above >= gutter ? above : below;
    const top = Math.max(gutter, Math.min(preferredTop, window.innerHeight - panelBox.height - gutter));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.classList.remove("soup-popover__panel--unpositioned");
  };
  const open = () => {
    if (panel || trigger.disabled) return;
    panel = document.createElement("div");
    panel.id = id;
    panel.className = "soup-popover__panel soup-popover__panel--unpositioned";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", root.dataset.label ?? "More information");
    const theme = root.closest("[data-theme]")?.dataset.theme;
    if (theme) panel.dataset.theme = theme;
    panel.append(template.content.cloneNode(true));
    (root.closest("dialog[open]") ?? document.body).append(panel);
    trigger.setAttribute("aria-expanded", "true");
    openListeners = new AbortController();
    const signal = openListeners.signal;
    document.addEventListener("pointerdown", (event) => {
      if (!root.contains(event.target) && !panel?.contains(event.target)) close();
    }, { signal });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    }, { signal });
    panel.addEventListener("click", (event) => {
      if (event.target.closest("[data-soup-close]")) close(true);
    }, { signal });
    panel.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !panel?.contains(event.relatedTarget) && !root.contains(event.relatedTarget)) close();
    }, { signal });
    window.addEventListener("resize", position, { signal });
    window.addEventListener("scroll", position, { signal, capture: true });
    position();
  };
  trigger.addEventListener("click", () => panel ? close() : open(), { signal: listeners.signal });
  return () => {
    close();
    listeners.abort();
  };
}

// src/vanilla/components/Dialog/Dialog.ts
function enhanceDialog(dialog) {
  const listeners = new AbortController();
  const signal = listeners.signal;
  const openers = dialog.id ? Array.from(document.querySelectorAll(`[data-soup-dialog-open="${CSS.escape(dialog.id)}"]`)) : [];
  openers.forEach((button) => button.addEventListener("click", () => {
    if (!dialog.open && !button.disabled) dialog.showModal();
  }, { signal }));
  dialog.querySelector('.soup-dialog__header [aria-label="Close dialog"]')?.addEventListener("click", () => dialog.close(), { signal });
  dialog.querySelectorAll(".soup-dialog__footer button").forEach((button) => {
    if (button.type === "submit") return;
    button.addEventListener("click", () => {
      if (button.disabled) return;
      if (button.textContent?.trim() !== "Cancel") {
        dialog.dispatchEvent(new CustomEvent("soup:confirm", { bubbles: true, detail: { action: button.textContent?.trim() } }));
      }
      dialog.close();
    }, { signal });
  });
  dialog.addEventListener("close", () => dialog.dispatchEvent(new CustomEvent("soup:close", { bubbles: true })), { signal });
  return () => listeners.abort();
}

// src/vanilla/components/Table/Table.ts
function enhanceDataTable(root) {
  const table = root.querySelector("table.soup-table");
  const body = table?.tBodies[0];
  const rowTemplate = root.querySelector("template[data-soup-rows]");
  if (!table || !body || !rowTemplate) return () => {
  };
  const rows = Array.from(rowTemplate.content.querySelectorAll("tr"));
  const headers = Array.from(table.querySelectorAll("thead th"));
  const pagination = root.querySelector(".soup-pagination");
  const pageSize = Number(root.dataset.pageSize || rows.length);
  let page = Number(pagination?.querySelector(".soup-pagination__summary")?.textContent?.match(/^Page (\d+)/)?.[1] ?? 1);
  let sortIndex = -1;
  let direction = null;
  const listeners = new AbortController();
  const setSortIcon = (header, name) => {
    const svg = header.querySelector("svg");
    if (!svg) return;
    svg.replaceChildren(...iconShapes[name].map((shape) => {
      const node = document.createElementNS("http://www.w3.org/2000/svg", shape.tag);
      for (const [key, value] of Object.entries(shape)) if (key !== "tag") node.setAttribute(key, String(value));
      return node;
    }));
  };
  const render = () => {
    const ordered = [...rows];
    if (sortIndex >= 0 && direction) ordered.sort((left, right) => {
      const a = left.cells[sortIndex]?.textContent?.trim() ?? "";
      const b = right.cells[sortIndex]?.textContent?.trim() ?? "";
      const comparison = !Number.isNaN(Number(a)) && !Number.isNaN(Number(b)) ? Number(a) - Number(b) : a.localeCompare(b, void 0, { numeric: true, sensitivity: "base" });
      return direction === "asc" ? comparison : -comparison;
    });
    const visible = pagination ? ordered.slice((page - 1) * pageSize, page * pageSize) : ordered;
    body.replaceChildren(...visible.map((row) => row.cloneNode(true)));
    headers.forEach((header, index) => {
      if (index === sortIndex && direction) header.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");
      else header.removeAttribute("aria-sort");
      setSortIcon(header, index === sortIndex && direction ? direction === "asc" ? "sortAsc" : "sortDesc" : "sortNone");
    });
  };
  headers.forEach((header, index) => {
    header.querySelector(".soup-table__sort")?.addEventListener("click", () => {
      if (sortIndex !== index) {
        sortIndex = index;
        direction = "asc";
      } else if (direction === "asc") direction = "desc";
      else {
        sortIndex = -1;
        direction = null;
      }
      root.dispatchEvent(new CustomEvent("soup:sortchange", { bubbles: true, detail: {
        field: sortIndex < 0 ? null : headers[sortIndex]?.textContent?.trim(),
        direction
      } }));
      if (pagination && page !== 1) pagination.dispatchEvent(new CustomEvent("soup:setpage", { detail: { page: 1 } }));
      else render();
    }, { signal: listeners.signal });
  });
  root.addEventListener("soup:pagechange", (event) => {
    page = event.detail.page;
    render();
  }, { signal: listeners.signal });
  return () => listeners.abort();
}

// src/vanilla/behavior.ts
function enhanceVanilla(root = document) {
  const listeners = new AbortController();
  const signal = listeners.signal;
  const cleanups = [
    ...Array.from(root.querySelectorAll(".soup-dropdown")).map(enhanceDropdown),
    ...Array.from(root.querySelectorAll(".soup-menu")).map(enhanceDropdownMenu),
    ...Array.from(root.querySelectorAll(".soup-popover")).map(enhancePopover),
    ...Array.from(root.querySelectorAll(".soup-pagination")).map(enhancePagination),
    ...Array.from(root.querySelectorAll("dialog.soup-dialog")).map(enhanceDialog),
    ...Array.from(root.querySelectorAll(".soup-table-data")).map(enhanceDataTable),
    enhanceToastDismiss(root),
    ...Array.from(root.querySelectorAll(".soup-chart")).map(enhanceChartTooltip)
  ];
  root.querySelectorAll(".soup-tabs").forEach((tabs) => {
    const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
    const select = (button) => {
      if (button.disabled) return;
      buttons.forEach((item) => {
        item.setAttribute("aria-selected", String(item === button));
        item.tabIndex = item === button ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== button.getAttribute("aria-controls");
      });
      tabs.dispatchEvent(new CustomEvent("soup:change", { detail: { value: button.id }, bubbles: true }));
    };
    buttons.forEach((button) => {
      button.addEventListener("click", () => select(button), { signal });
      button.addEventListener("keydown", (event) => {
        const enabled = buttons.filter((item) => !item.disabled);
        const current = enabled.indexOf(button);
        const target = event.key === "ArrowRight" ? enabled[(current + 1) % enabled.length] : event.key === "ArrowLeft" ? enabled[(current - 1 + enabled.length) % enabled.length] : event.key === "Home" ? enabled[0] : event.key === "End" ? enabled[enabled.length - 1] : void 0;
        if (target) {
          event.preventDefault();
          select(target);
          target.focus();
        }
      }, { signal });
    });
  });
  root.querySelectorAll(".soup-file-tree").forEach((tree) => {
    tree.querySelectorAll(".soup-file-tree__file").forEach((file) => {
      file.addEventListener("click", () => {
        tree.querySelectorAll(".soup-file-tree__file[aria-current]").forEach((item) => item.removeAttribute("aria-current"));
        file.setAttribute("aria-current", "true");
        tree.dispatchEvent(new CustomEvent("soup:select", { detail: { label: file.textContent?.trim() }, bubbles: true }));
      }, { signal });
    });
  });
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    listeners.abort();
  };
}
if (typeof document !== "undefined") enhanceVanilla(document);
export {
  enhanceVanilla
};
