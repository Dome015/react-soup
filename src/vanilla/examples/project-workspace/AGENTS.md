# Project workspace: vanilla example

HTML states: FullDirectory.html, NoFilterMatches.html, NoProjectsYet.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use this when a screen must combine finding records with editing them. Keep search and status filters in the page script, reset the page when they change, and sort and paginate the entire filtered collection before replacing table rows. If a server owns the order, send the selected sort field and direction to it instead. Clamp the page after deletion so the last page never appears empty by accident.

Put record actions in a labeled `DropdownMenu`. Open a focused `Dialog` for create/edit and a separate confirmation `Dialog` for deletion; never nest dialogs. A form in the dialog body uses an explicit form ID so the footer submit button triggers native validation. Show a Field error for duplicate names and connect it with `aria-describedby`. `Toast` acknowledges a completed mutation. Distinguish a truly empty collection from an empty filtered result and give each a useful next step.

The example mutates local demo state. A host app should replace those updates with real persistence and show success only after it completes. Copy the composition and accessibility pattern, then consult the relevant component `AGENTS.md` files for API details.

## Vanilla implementation

`example.ts` holds this page’s local state transitions. The HTML states are the starting markup, and `../../behavior.ts` enhances only interactive Soup patterns. Keep the page script tied to native forms, buttons, menu events, and DOM updates; do not instantiate styled native controls through a Soup API. In a host, replace local demo mutations with persistence and show success only after it succeeds.

Compare the same state and interaction with `src/react/examples/project-workspace/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
