# Project workspace example

`Example.tsx` exports `ProjectWorkspaceExample`; Storybook exposes full, empty collection, and no filter match states under `Examples/Project Workspace`.

## Pattern

Use this when a screen must combine finding records with editing them. Keep search and status filters controlled, reset the page when they change, and pass the entire filtered collection to Table for local sorting and pagination. Let Table own its local sort; use `manualSorting` only when the server owns order. The page is clamped after deletion so the last page never appears empty by accident.

Put record actions in a labeled `DropdownMenu`. Open a focused `Dialog` for create/edit and a separate confirmation `Dialog` for deletion; never nest dialogs. A form in the dialog body uses an explicit form ID so the footer submit button triggers native validation. Show a Field error for duplicate names and connect it with `aria-describedby`. `Toast` acknowledges a completed mutation. Distinguish a truly empty collection from an empty filtered result and give each a useful next step.

The example mutates local demo state. A host app should replace those updates with real persistence and show success only after it completes. Copy the composition and accessibility pattern, then consult the relevant component `AGENTS.md` files for API details.
