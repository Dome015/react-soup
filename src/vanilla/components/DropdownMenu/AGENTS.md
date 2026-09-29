# DropdownMenu in plain HTML

Use this for commands; use Dropdown or `<select>` for field values. The menu items are ordinary authored buttons inside an inert HTML `<template>`. The optional script opens and positions them beside the trigger.

```html
<div class="soup-menu" data-align="end">
  <button type="button" class="soup-menu__trigger" aria-label="Project actions"
    aria-haspopup="menu" aria-expanded="false">
    <!-- Inline the shared more icon from the story. -->
  </button>
  <template data-soup-menu>
    <button type="button" role="menuitem" class="soup-menu__item" data-action="edit">Edit</button>
    <button type="button" role="menuitem" class="soup-menu__item soup-menu__item--danger" data-action="delete">Delete</button>
  </template>
</div>
```

Load `../../dist/behavior.js` once when using menus. Listen for bubbling `soup:select` on the root; `event.detail.action` is the selected `data-action` value (or item text). Handle the command in the page's own script. Use real disabled buttons for unavailable commands. The enhancer uses Arrow keys, Home/End, Escape, outside click, focus return, and viewport-aware positioning. `data-align="end"` aligns the panel's right edge with the trigger; otherwise it starts at the trigger's left edge. Include icon SVG from `src/shared/icons.ts` when an item needs one.

Inspect `../../stories/Components/DropdownMenu/` and the menu examples in `../../examples/crud-list/` and `../../examples/project-workspace/`. Compare the opened panel, keyboard focus, danger color, and border overlap with the React counterpart in auto, light, and dark themes. Every aesthetic value comes from `src/shared/styles` tokens.
