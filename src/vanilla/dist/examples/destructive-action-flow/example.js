import {
  createIcon
} from "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/destructive-action-flow/example.ts
var dialog = document.querySelector(".soup-dialog");
var confirmation = dialog?.querySelector("#delete-confirmation");
var remove = dialog?.querySelector(".soup-dialog__footer .soup-button--danger");
confirmation?.addEventListener("input", () => {
  if (remove) remove.disabled = confirmation.value !== "Northstar Studio";
});
dialog?.addEventListener("soup:close", () => {
  if (confirmation) confirmation.value = "";
  if (remove) remove.disabled = true;
});
dialog?.addEventListener("soup:confirm", () => {
  const card = document.querySelector("main > .soup-stack > article.soup-card");
  if (!card) return;
  const alert = document.createElement("div");
  alert.className = "soup-alert soup-tone--success";
  alert.setAttribute("role", "status");
  alert.append(createIcon("info"));
  const text = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = "Workspace deleted";
  const description = document.createElement("div");
  description.textContent = "The demo workspace has been removed.";
  text.append(title, description);
  alert.append(text);
  card.replaceWith(alert);
});
