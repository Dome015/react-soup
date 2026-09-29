import {
  notify
} from "../../chunks/chunk-SYBGXCQL.js";
import "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/settings-form/example.ts
var form = document.querySelector("main form");
var viewport = document.querySelector(".soup-toast-viewport");
var timezone = document.querySelector("#settings-timezone")?.closest(".soup-dropdown");
var reminder = document.querySelector("#settings-review-time-description");
timezone?.addEventListener("soup:change", (event) => {
  const value = event.detail.value;
  if (reminder) reminder.textContent = `Local time in ${value}`;
});
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (form.reportValidity() && viewport) notify(viewport, { title: "Settings saved", tone: "success" });
});
