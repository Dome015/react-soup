# Vanilla web implementation: agent entry point

React Soup already has the UI building blocks listed below. **Before rebuilding an existing screen, map each visible element to a Soup component or a composition of components. Use the existing markup and shared styles. Do not recreate a table, file picker, button, field, dialog, chart, or any other listed component from scratch.** The host app adds its data and workflow logic, not a second visual system.

Vendor this directory with `../shared`, including `components/`, `stories/`, `examples/`, all `AGENTS.md` files, and the complete `dist/` directory. Import `../shared/styles/index.css` once. This implementation is HTML first: copy semantic markup and `soup-` classes from stories or examples. Ordinary components need no Soup JavaScript API or factory. Load the prebuilt `dist/behavior.js` once on pages with interactive Soup patterns; it enhances markup already in the document. Copy all of `dist/` because entry files may import shared chunks. A host needs no Node, TypeScript, or bundler.

## Required workflow for a screen

1. Inventory the actions, form controls, tables, uploads, status, navigation, charts, overlays, and layout. Match each to the inventory below. For a compound page, start from the closest full page in `examples/`.
2. Read `components/<Name>/AGENTS.md` and the matching `stories/Components/<Name>/` HTML **before coding**. The guide defines the native element, required classes, state attributes, accessibility, and script needs. Copy that pattern and replace demo content with application content.
3. Compose existing pieces. Use Container, Stack, Inline, and Grid for layout; Field for labels/errors; Card for grouped content; the existing actions and status components for feedback. Use Table for tabular data and FileUpload for file selection. `examples/document-review/` shows FileUpload, Progress, and a loading Button together.
4. Add only application behavior. Native controls, validation, links, `<details>`, and `<progress>` work as HTML. Use `dist/behavior.js` and its documented events for interactions such as Dropdown, DropdownMenu, Tabs, Dialog, Pagination, sortable Table, Popover, Toast, and FileTree selection. Keep page scripts limited to application state, data fetching, and persistence. Fixed charts can use authored HTML; changing data uses the small chart renderers.
5. Check labels, keyboard access, focus, disabled/loading/error states, and meaningful empty states. Compare matching stories or examples in auto, light, and dark themes and at narrow and wide widths. Keep the React counterpart equivalent when changing the library.

## Complete public component inventory

Every name below has `components/<Name>/AGENTS.md` and a matching HTML story under `stories/Components/<Name>/`. `components/Chart/` contains internal helpers for the four chart components; it is not a public component.

| Need | Existing components | Use them for |
| --- | --- | --- |
| Actions | **Button**, **IconButton**, **Link**, **Icon** | Labeled actions, accessible icon actions, navigation links, and shared SVG icons. Button has loading and danger states. |
| Form text | **Field**, **Input**, **Textarea**, **Select** | Labels, hints/errors, text and native date/time inputs, multiline text, and native single select. |
| Choices and files | **Dropdown**, **Checkbox**, **Radio**, **Switch**, **FileUpload** | Searchable/multiple choice, Boolean/exclusive choices, toggles, and native single/multiple file selection. |
| Layout | **Container**, **Stack**, **Inline**, **Grid** | Page width, vertical rhythm, horizontal groups, and responsive grids. |
| Surfaces and feedback | **Card**, **Separator**, **Badge**, **Avatar**, **Alert**, **Toast**, **Skeleton**, **Progress** | Sections, dividers, status, people, messages, placeholders, and task progress. |
| Navigation and hierarchy | **Breadcrumbs**, **Tabs**, **Accordion**, **FileTree**, **Pagination** | Ancestor links, local views, disclosure, file/folder trees, and page navigation. |
| Overlays and hints | **Dialog**, **Popover**, **DropdownMenu**, **Tooltip** | Modal decisions/forms, nonmodal details, action menus, and short hints. |
| Data | **Table**, **BarChart**, **LineChart**, **PieChart**, **ScatterChart** | Semantic tables with optional sorting/pagination and four chart types. |

**Table:** Copy `stories/Components/Table/` or `examples/table-toolbar/` before writing a table. Keep `<table>`, `<thead>`, `<tbody>`, scoped headers, and the focusable `.soup-table-scroll` wrapper. For local sorting and pagination, use the documented `.soup-table-data` structure and `dist/behavior.js`. Do not replace it with div rows or custom cell CSS.

**FileUpload:** Copy `stories/Components/FileUpload/` or `examples/document-review/`. Use `<input type="file" class="soup-file-upload">` with a real Field label and native `accept`, `multiple`, `required`, and `disabled` attributes. Read `input.files` in application code. Use Progress for actual progress and Button's loading state to block repeat activation. Do not draw a replacement file picker.

**Forms and layout:** Prefer native Input, Select, and Textarea with Field and native validation. Date, time, and `datetime-local` are Input modes. Use the four layout primitives before writing page-specific flex, grid, gap, or width rules. Compose components before proposing a new variant.

## CSS and source rules

**Do not add custom CSS merely to reproduce an existing Soup look.** Reuse shared classes, variants, layout primitives, and tokens. Avoid hardcoded colors, spacing, font metrics, sizes, borders, radii, shadows, timing, and inline aesthetic styles. If a genuinely new visual requirement remains after checking the inventory and examples, extend the shared design system: first look for a suitable token in `../shared/styles/theme.css`, add a semantic token only if needed, and use it from `../shared/styles/components.css` or `../shared/styles/examples.css`. Keep light and dark values together and update both implementations, guides, stories, and examples. Host-specific CSS should be limited to integration or content needs Soup cannot express and should use `var(--soup-*)` for visual values.

Use native `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`, `<progress>`, `<details>`, `<dialog>`, and semantic tables. Controllers attach to existing markup only where HTML needs help; do not create a component factory or framework. Preserve keyboard behavior and focus return for overlays.

TypeScript here is editable source and provides types for agents. `npm run build-vanilla` bundles it into checked-in browser JavaScript in `dist/`, including example scripts and shared chunks. Standalone HTML pages load those `.js` files. Rebuild and commit `dist/` whenever vanilla TypeScript changes; never edit generated JavaScript by hand. The runtime uses browser APIs and local shared code only.
