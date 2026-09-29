// src/vanilla/examples/sidebar-navigation/example.ts
var navigation = document.querySelector(".soup-example-nav");
var title = document.querySelector(".soup-example-main h1");
var cardTitle = document.querySelector(".soup-example-main h2");
navigation?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  navigation.querySelectorAll("button[aria-current]").forEach((item) => item.removeAttribute("aria-current"));
  button.setAttribute("aria-current", "page");
  const section = button.textContent?.trim() ?? "";
  if (title) title.textContent = section;
  if (cardTitle) cardTitle.textContent = `${section} workspace`;
});
