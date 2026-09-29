import {
  createIcon
} from "./chunk-OUDMSHVE.js";

// src/vanilla/components/Toast/Toast.ts
function notify(viewport, message) {
  const toast = document.createElement("div");
  const tone = message.tone ?? "neutral";
  toast.className = `soup-toast soup-tone--${tone}`;
  toast.setAttribute("role", tone === "danger" ? "alert" : "status");
  const content = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = message.title;
  content.append(title);
  if (message.description) {
    const description = document.createElement("p");
    description.textContent = message.description;
    content.append(description);
  }
  const dismiss = document.createElement("button");
  dismiss.type = "button";
  dismiss.className = "soup-icon-button soup-button--ghost soup-button--md";
  dismiss.setAttribute("aria-label", "Dismiss notification");
  dismiss.append(createIcon("close"));
  toast.append(content, dismiss);
  viewport.append(toast);
  const timer = window.setTimeout(() => toast.remove(), 5e3);
  const remove = () => {
    window.clearTimeout(timer);
    toast.remove();
  };
  dismiss.addEventListener("click", remove, { once: true });
  return remove;
}
function enhanceToastDismiss(root = document) {
  const listeners = new AbortController();
  root.querySelectorAll('.soup-toast [aria-label="Dismiss notification"]').forEach((button) => {
    button.addEventListener("click", () => button.closest(".soup-toast")?.remove(), { signal: listeners.signal });
  });
  root.querySelectorAll("[data-soup-toast-title]").forEach((button) => {
    button.addEventListener("click", () => {
      const viewport = root.querySelector(".soup-toast-viewport");
      if (viewport) notify(viewport, { title: button.dataset.soupToastTitle ?? "", description: button.dataset.soupToastDescription, tone: button.dataset.soupToastTone });
    }, { signal: listeners.signal });
  });
  return () => listeners.abort();
}

export {
  notify,
  enhanceToastDismiss
};
