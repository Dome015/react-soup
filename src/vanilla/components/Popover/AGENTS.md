# Popover in plain HTML

Use for a nonmodal detail or small action group. Keep the content as HTML in a `<template>`; the optional script only attaches, positions, and dismisses the panel.

```html
<div class="soup-popover" data-label="Project details">
  <button type="button" class="soup-popover__trigger" aria-expanded="false">Project details</button>
  <template data-soup-popover>
    <div class="soup-stack soup-gap--sm"><strong>Atlas</strong><span>Updated today</span></div>
  </template>
</div>
```

Load `../../dist/behavior.js` once when using popovers. Set `data-align="end"` when the panel should align to the trigger's right edge. A button inside the template with `data-soup-close` closes the panel and returns focus. Escape and outside click also dismiss it. The panel has `role="dialog"` and takes its accessible name from `data-label`; keep meaningful button text and labels inside. Use native `<dialog>` for a modal decision.

Inspect `../../stories/Components/Popover/` and compare open, focus, light/dark, and narrow viewport states with `src/react/stories/Popover.stories.tsx`. Shared CSS tokens control every visual value.
