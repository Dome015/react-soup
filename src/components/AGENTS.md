# Component selection guide

Each child directory has a `.tsx` implementation and an `AGENTS.md` guide. Public exports are in `src/index.ts`; shared internal types and `cx` are in `shared.ts`.

## Choose by job

- Actions: `Button` for labeled actions, `IconButton` for compact actions with a required accessible label, `Link` for navigation.
- Forms: `Field` wraps and labels `Input`, `Textarea`, `Select`, or `Dropdown`; `Checkbox`, `Radio`, and `Switch` include their own visible labels. `Select` is native; `Dropdown` supports search and multiple choices. Use native validation where applicable and connect `aria-describedby` to Field hint/error IDs.
- Surfaces and status: `Card`, `Badge`, `Avatar`, `Alert`, `Toast`, `Skeleton`, `Separator`.
- Layers and navigation: `Dialog` for a blocking decision or form, `Popover` for nonmodal information, `Tooltip` for a short hint, `DropdownMenu` for a list of actions, `Tabs` for local content views, `Accordion` for disclosure.
- Data: `Table` and its cell primitives for tabular data; its data API adds sorting and pagination. Use `Pagination` for independently paginated content and `FileTree` for a directory hierarchy.
- Layout: `Stack`, `Inline`, `Container`, `Grid`. Use these before writing page-specific flex or grid CSS.
- Icons: `Icon` is the local SVG set. Add only icons needed by real UI, and keep stroke style consistent.

## General API rules

Components pass through standard HTML props where possible. `Button` defaults to `type="button"`; set `type="submit"` explicitly for forms. Prefer controlled props for data and stateful flows. Keep labels meaningful, do not use placeholder as a label, and test keyboard access. Component CSS lives in `src/styles/components.css`; visual values come from `src/styles/theme.css`.
