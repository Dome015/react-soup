# Component selection guide

Read the complete public inventory and required workflow in `../AGENTS.md` before building a screen. Use a listed component or composition whenever it covers the need; do not recreate its markup, behavior, or styling independently. This applies especially to Table and FileUpload. Each public component directory has a `.tsx` implementation and an `AGENTS.md` guide. Public exports are in `src/react/index.ts`; shared internal types and `cx` are in `shared.ts`.

## Choose by job

- Actions: `Button` for labeled actions, including a loading state that blocks repeat activation; `IconButton` for compact actions with a required accessible label; `Link` for navigation.
- Forms: `Field` wraps and labels `Input`, `Textarea`, `Select`, `Dropdown`, or `FileUpload`; `Checkbox`, `Radio`, and `Switch` include their own visible labels. `Input` supports native date and time modes. `FileUpload` keeps native file selection. `Select` is native; `Dropdown` supports search and multiple choices. Use native validation where applicable and connect `aria-describedby` to Field hint/error IDs.
- Surfaces and status: `Card`, `Badge`, `Avatar`, `Alert`, `Toast`, `Skeleton`, `Progress`, `Separator`. Skeleton reserves the shape of pending content; Progress conveys task completion or an indeterminate task.
- Layers and navigation: `Dialog` for a blocking decision or form, `Popover` for nonmodal information, `Tooltip` for a short hint, `DropdownMenu` for a list of actions, `Tabs` for local content views, `Accordion` for disclosure, and `Breadcrumbs` for a page's ancestor hierarchy.
- Data: `Table` and its cell primitives for tabular data; its data API adds sorting and pagination. Use `Pagination` for independently paginated content and `FileTree` for a directory hierarchy. Use `PieChart`/donut for parts of a whole, `LineChart`/area/sparkline for ordered trends, `BarChart` for category comparisons, and `ScatterChart` for relationships between two numeric measures. All charts share SVG axes, colors, keyboard-focusable marks, and accessible data tables.
- Chart sizing: figures fill available space up to a theme-controlled maximum width; pie and donut figures use a smaller cap. This keeps charts at a readable scale in wide page containers. Cartesian plots scroll internally when the viewport is too narrow for their labels.
- Layout: `Stack`, `Inline`, `Container`, `Grid`. Use these before writing page-specific flex or grid CSS.
- Icons: `Icon` is the local SVG set. Add only icons needed by real UI, and keep stroke style consistent.

## General API rules

Components pass through standard HTML props where possible. `Button` defaults to `type="button"`; set `type="submit"` explicitly for forms. Prefer controlled props for data and stateful flows. Keep labels meaningful, do not use placeholder as a label, and test keyboard access. Do not add custom CSS when existing components, variants, tokens, or layout primitives cover the design. Component CSS lives in `src/shared/styles/components.css`; visual values come from `src/shared/styles/theme.css`.

For visual consistency, compare new controls with `Foundations/Visual Rhythm` in Storybook: text triggers, tabs, menu choices, and tree rows use the shared medium control height and small text; icon-only triggers use the icon control width. Card, dialog, and chart section titles use the same large type. Chart legend labels use body ink beside categorical swatches.
