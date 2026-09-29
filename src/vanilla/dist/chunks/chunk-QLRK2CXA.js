// src/vanilla/components/Pagination/Pagination.ts
function enhancePagination(root) {
  const summary = root.querySelector(".soup-pagination__summary");
  const controls = root.querySelector(".soup-pagination__controls");
  const match = summary?.textContent?.match(/^Page (\d+) of (\d+)$/);
  if (!summary || !controls || !match) return () => {
  };
  let page = Number(match[1]);
  const pageCount = Number(match[2]);
  const siblings = Number(root.dataset.siblingCount ?? 1);
  const listeners = new AbortController();
  const buttons = Array.from(controls.querySelectorAll(".soup-pagination__button"));
  const first = buttons.find((button) => button.getAttribute("aria-label") === "First page");
  const previous = buttons.find((button) => button.getAttribute("aria-label") === "Previous page");
  const next = buttons.find((button) => button.getAttribute("aria-label") === "Next page");
  const last = buttons.find((button) => button.getAttribute("aria-label") === "Last page");
  const pagePattern = controls.querySelector(".soup-pagination__page");
  if (!first || !previous || !next || !last || !pagePattern) return () => {
  };
  const render = () => {
    summary.textContent = `Page ${page} of ${pageCount}`;
    first.disabled = previous.disabled = page <= 1;
    next.disabled = last.disabled = page >= pageCount;
    const visible = /* @__PURE__ */ new Set();
    for (let number = 1; number <= pageCount; number++) {
      if (number === 1 || number === pageCount || Math.abs(number - page) <= siblings) visible.add(number);
    }
    const sequence = [...visible].sort((a, b) => a - b);
    const children = [first, previous];
    const addPage = (number) => {
      const button = pagePattern.cloneNode(true);
      button.textContent = String(number);
      button.setAttribute("aria-label", `Page ${number}`);
      if (number === page) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
      if (number === 1 || number === pageCount) button.dataset.boundary = "true";
      else delete button.dataset.boundary;
      children.push(button);
    };
    sequence.forEach((number, index) => {
      const before = sequence[index - 1];
      if (before && number - before === 2) addPage(before + 1);
      if (before && number - before > 2) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "soup-pagination__ellipsis";
        ellipsis.setAttribute("aria-hidden", "true");
        ellipsis.textContent = "\u2026";
        children.push(ellipsis);
      }
      addPage(number);
    });
    controls.replaceChildren(...children, next, last);
  };
  const go = (number) => {
    if (number < 1 || number > pageCount || number === page) return;
    page = number;
    render();
    root.dispatchEvent(new CustomEvent("soup:pagechange", { detail: { page }, bubbles: true }));
  };
  controls.addEventListener("click", (event) => {
    const target = event.target.closest(".soup-pagination__button");
    if (!target || target.disabled) return;
    const label = target.getAttribute("aria-label");
    if (label === "First page") go(1);
    else if (label === "Previous page") go(page - 1);
    else if (label === "Next page") go(page + 1);
    else if (label === "Last page") go(pageCount);
    else if (label?.startsWith("Page ")) go(Number(label.slice(5)));
  }, { signal: listeners.signal });
  root.addEventListener("soup:setpage", (event) => {
    go(event.detail.page);
  }, { signal: listeners.signal });
  return () => listeners.abort();
}

export {
  enhancePagination
};
