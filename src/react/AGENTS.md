# React implementation: agent entry point

React Soup already exports the UI building blocks listed below from `index.ts`. **Before rebuilding an existing screen, map each visible element to a Soup component or a composition of components. Import the existing component instead of recreating a table, upload control, field, dialog, chart, button, or any other listed element.** The host app supplies data and workflow logic; Soup supplies visual and interaction patterns.

Vendor this directory with `../shared`, including `components/`, `stories/`, `examples/`, `index.ts`, and all `AGENTS.md` files. Import `../shared/styles/index.css` once in the host application. React and React DOM are host peer dependencies. TypeScript and Storybook are development tools. React runtime code may import shared code, but must not import vanilla components, Storybook, or examples.

## Required workflow for a screen

1. Inventory the actions, forms, tables, file selection, status, navigation, charts, overlays, and layout. Match each to the inventory below. For a compound page, start from the closest pattern in `examples/`.
2. Read `components/<Name>/AGENTS.md`, the matching `stories/<Name>.stories.tsx`, and public props/types in `index.ts` **before coding**. Reuse normal, error, loading, disabled, empty, and interactive states instead of imitating markup or CSS.
3. Compose existing pieces. Use Container, Stack, Inline, and Grid for layout; Field for labels/errors; Card for grouped content. Use Table and its exported primitives for tabular data, including its sorting/pagination API. Use FileUpload for native file selection, with Progress and a loading Button for ongoing work. `examples/document-review/` shows that combination.
4. Write only application logic. Connect props and callbacks to state, data fetching, and persistence. Do not create local lookalike components, a custom table, a styled file input, or one-off CSS because that seems quicker. Prefer existing variants and composition.
5. Keep semantic labels, keyboard access, focus, validation, disabled/loading/error states, and meaningful empty states. Compare the matching Storybook story in auto, light, and dark themes and at narrow and wide widths. Keep the vanilla counterpart equivalent when changing the library.

## Complete public component inventory

These are the public components exported from `index.ts`. Each has `components/<Name>/AGENTS.md` and `stories/<Name>.stories.tsx`. `components/chart-shared.tsx` and `components/shared.ts` are internal helpers.

| Need | Existing components | Use them for |
| --- | --- | --- |
| Actions | **Button**, **IconButton**, **Link**, **Icon** | Labeled actions, accessible icon actions, navigation links, and shared SVG icons. Button has loading and danger states. |
| Form text | **Field**, **Input**, **Textarea**, **Select** | Labels, hints/errors, text and native date/time inputs, multiline text, and native single select. |
| Choices and files | **Dropdown**, **Checkbox**, **Radio**, **Switch**, **FileUpload** | Searchable/multiple choice, Boolean/exclusive choices, toggles, and native single/multiple file selection. |
| Layout | **Container**, **Stack**, **Inline**, **Grid** | Page width, vertical rhythm, horizontal groups, and responsive grids. |
| Surfaces and feedback | **Card**, **Separator**, **Badge**, **Avatar**, **Alert**, **Toast**, **Skeleton**, **Progress** | Sections, dividers, status, people, messages, placeholders, and task progress. Toast also exports `ToastProvider` and `useToast`. |
| Navigation and hierarchy | **Breadcrumbs**, **Tabs**, **Accordion**, **FileTree**, **Pagination** | Ancestor links, local views, disclosure, file/folder trees, and page navigation. Accordion also exports `AccordionItem`. |
| Overlays and hints | **Dialog**, **Popover**, **DropdownMenu**, **Tooltip** | Modal decisions/forms, nonmodal details, action menus, and short hints. |
| Data | **Table**, **BarChart**, **LineChart**, **PieChart**, **ScatterChart** | Semantic tables with optional sorting/pagination and four chart types. Table also exports `TableHead`, `TableBody`, `TableRow`, `TableHeader`, and `TableCell`. |

**Table:** Read `components/Table/AGENTS.md`, `stories/Table.stories.tsx`, and `examples/table-toolbar/` before adding a table. Use Table and its cell primitives for authored rows or its data API for sorting and pagination. Keep native table semantics and accessible headers. Do not replace it with div rows or write a parallel table stylesheet.

**FileUpload:** Read `components/FileUpload/AGENTS.md`, `stories/FileUpload.stories.tsx`, and `examples/document-review/`. Use FileUpload instead of styling a new file input or building a dropzone. Combine it with Progress and Button's loading state when processing files; preserve native `accept`, `multiple`, `required`, disabled, and validation behavior.

**Forms and layout:** Use Field with Input, Textarea, Select, Dropdown, or FileUpload; Checkbox, Radio, and Switch include visible labels. Input handles native date/time modes. Use Container, Stack, Inline, and Grid before adding page-specific flex, grid, spacing, or width rules. Prefer controlled props for data and stateful flows, and set `type="submit"` explicitly for form buttons.

## CSS and source rules

**Do not add custom CSS merely to reproduce an existing Soup look.** Reuse component variants, composition, layout primitives, and shared tokens. Avoid hardcoded colors, spacing, font metrics, sizes, borders, radii, shadows, timing, and inline aesthetic styles. If a genuinely new visual requirement remains after checking the inventory and examples, extend the shared design system: first look for a suitable token in `../shared/styles/theme.css`, add a semantic token only if needed, and use it from `../shared/styles/components.css` or `../shared/styles/examples.css`. Keep light and dark values together and update both implementations, guides, stories, and examples. Host-specific CSS should be limited to integration or content needs Soup cannot express and should use `var(--soup-*)` for visual values.

Components pass through standard HTML props where possible. Keep labels meaningful, use native validation where applicable, and connect errors with `aria-describedby`. For visual consistency, compare controls with `Foundations/Visual Rhythm` in Storybook: text controls and triggers share the medium control height and small text, icon-only triggers use the icon control width, and Card, Dialog, and chart titles share the large title token. Read the nearest `AGENTS.md` before changing a component.
