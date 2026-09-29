// src/vanilla/examples/confirmation-dialog/example.ts
var dialog = document.querySelector(".soup-dialog");
dialog?.addEventListener("soup:confirm", () => {
  const badge = document.querySelector(".soup-card .soup-badge");
  const publish = document.querySelector("[data-soup-dialog-open]");
  if (badge) {
    badge.textContent = "Published";
    badge.className = "soup-badge soup-tone--success";
  }
  if (publish) publish.disabled = true;
});
