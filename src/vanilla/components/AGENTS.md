# Vanilla component selection

Read the complete public inventory and required workflow in `../AGENTS.md` before building a screen. Use a listed component or composition whenever it covers the need; do not recreate its markup, behavior, or styling independently. This applies especially to Table and FileUpload. Use semantic HTML with the shared `soup-` classes. Read the component directory guide and matching HTML story before copying a pattern. Do not use a JavaScript factory for a styled native element.

## HTML and CSS only

- Actions: Button, IconButton, Link. A loading Button keeps its native `disabled` state and `aria-busy="true"` while showing a spinner and action-specific text.
- Forms: Input, Textarea, Select, FileUpload, Field, Checkbox, Radio, Switch. Keep real labels and native validation. Date/time modes are native input types.
- Surfaces and status: Card, Badge, Avatar, Alert, Skeleton, Progress, Separator.
- Layout: Stack, Inline, Grid, Container. Prefer these classes to page-specific spacing rules.
- Disclosure and hierarchy: Accordion uses `<details>`; Breadcrumbs uses `<nav><ol>`; FileTree uses nested lists and `<details>` for folders.
- Icons: inline SVG uses the geometry in `../../shared/icons.ts` and the shared `.soup-icon` style. Keep accessible labels on icon-only buttons.
- Static Table uses native `<table>`, headings, and a focusable overflow wrapper.
- Tooltip uses a focusable target and `aria-describedby`; the shared CSS handles reveal on hover and focus.

## TypeScript only when interaction needs it

Dialog opens and closes its native `<dialog>` with `showModal()` and `close()`. Dropdown, DropdownMenu, Popover, Tabs, Pagination, sortable Table, Toast, and charts need focused behavior modules to match the React implementation. An app may control the same markup directly if it preserves the documented keyboard and ARIA behavior. Keep the controller's public interface small and use the existing DOM as its input.

The HTML stories reproduce every React story state. They are reference markup; live interactive stories must be checked against their React counterpart. Do not add custom CSS when existing classes, variants, tokens, or layout primitives cover the design. A truly new visual rule belongs in `src/shared/styles`, using semantic theme tokens in both modes. When updating a component, update its guide, story states, and any full-page example that uses it.
