// src/vanilla/examples/table-toolbar/example.ts
var search = document.querySelector('input[aria-label="Search team members"]');
var role = document.querySelector('select[aria-label="Filter by role"]');
var rows = Array.from(document.querySelectorAll(".soup-table tbody tr"));
var caption = document.querySelector(".soup-example-caption");
function filter() {
  const query = search?.value.toLowerCase() ?? "";
  const selected = role?.value ?? "all";
  let visible = 0;
  rows.forEach((row) => {
    const name = row.cells[0]?.textContent?.toLowerCase() ?? "";
    const personRole = row.cells[1]?.textContent?.trim() ?? "";
    row.hidden = !name.includes(query) || selected !== "all" && personRole !== selected;
    if (!row.hidden) visible++;
  });
  if (caption) caption.textContent = `Showing ${visible} of ${rows.length} members`;
}
search?.addEventListener("input", filter);
role?.addEventListener("change", filter);
