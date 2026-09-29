import {
  notify
} from "../../chunks/chunk-SYBGXCQL.js";
import "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/authentication/example.ts
var form = document.querySelector(".soup-auth form");
var viewport = document.querySelector(".soup-toast-viewport");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity() || !viewport) return;
  const email = form.querySelector("#auth-email")?.value ?? "";
  notify(viewport, { title: "Demo sign in submitted", description: email, tone: "success" });
});
