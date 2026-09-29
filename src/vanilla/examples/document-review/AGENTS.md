# Document Review: vanilla example

HTML states: MultipleFiles.html, SingleFile.html. Each page links `src/shared/styles/index.css` and `src/shared/styles/examples.css`. Vendor this directory with `src/shared` and the rest of `src/vanilla`.

## Pattern

Use `Breadcrumbs` for a real parent destination, `Field` with native `FileUpload` for selection, a loading `Button` to block repeated work, and `Progress` for task progress. This demo reads selected files locally with `FileReader`: it does not upload or persist them. Replace the read operation and progress events with an actual host workflow when copying the pattern. Keep the native file input required so form validation runs before starting, and disable file selection while work runs. The selected count is a status message; completion is acknowledged with `Alert`. On a failed read, show a Field error tied to the file control. Handle cleanup of in-progress work when the view unmounts.

## Vanilla implementation

`example.ts` contains only this page's state transitions. Load it after the optional `../../behavior.ts` enhancement script, as the standalone HTML does. Keep form submissions and state changes in the page script; do not instantiate simple components in JavaScript.

Compare the same state and interaction with `src/react/examples/document-review/Example.tsx` in auto, light, and dark themes and at narrow width. See each component directory’s `AGENTS.md` for exact markup, ARIA, and event contracts.
