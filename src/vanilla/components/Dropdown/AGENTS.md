# Dropdown in plain HTML

Use native `<select class="soup-input soup-select">` for a short single choice. Use Dropdown when search or multiple selection helps. Its markup is authored HTML; the optional behavior script attaches to it. There is no constructor or JSX-like configuration object.

```html
<div class="soup-field">
  <label class="soup-field__label" for="assignee">Assignee</label>
  <div class="soup-dropdown" data-searchable data-clearable data-placeholder="Choose a person" data-name="assignee">
    <div class="soup-dropdown__control">
      <button id="assignee" type="button" class="soup-dropdown__trigger"
        aria-label="Assignee" aria-haspopup="listbox" aria-expanded="false">
        <span class="soup-dropdown__placeholder">Choose a person</span>
        <!-- Inline the shared chevronDown icon from the story. -->
      </button>
    </div>
    <template data-soup-options>
      <div data-value="ada"><div><strong>Ada Lovelace</strong><small>Design</small></div></div>
      <div data-value="grace"><div><strong>Grace Hopper</strong><small>Engineering</small></div></div>
      <div data-value="lin" data-disabled><div><strong>Lin Chen</strong></div></div>
    </template>
  </div>
</div>
```

Load `../../behavior.ts` once through the host's TypeScript build. The script reads the native `<template>`, manages focus, filtering, selected values, hidden form inputs, and `aria-expanded`. `data-multiple`, `data-searchable`, and `data-clearable` are Boolean attributes. `data-value` is the initial selected value or a comma-separated list for multiple selection. `data-name` creates hidden input(s) for native form submission. Each option value must be unique and must not contain a comma in multiple mode. Use `data-search-placeholder` and `data-empty-message` for copy overrides.

The root emits bubbling `soup:change` with `event.detail.value` as a string for single selection or a string array for multiple selection. An application can set it by dispatching `new CustomEvent('soup:setvalue', {detail: {value}})` on the root. Use the native form handler for required-field validation. The trigger keeps its real label, disabled state, `aria-invalid`, and `aria-describedby` when applicable. Escape closes and restores focus; Arrow keys, Home, and End navigate options.

Inspect all files under `../../stories/Components/Dropdown/`, especially Searchable, Multiple, and DisabledAndEmpty. Compare against `src/react/stories/Dropdown.stories.tsx` in auto, light, and dark themes. Styling comes only from `src/shared/styles` tokens.
