# Document Review example

`Example.tsx` exports `DocumentReviewExample`; Storybook shows single-file and multiple-file variants under `Examples/Document Review`.

## Pattern

Use `Breadcrumbs` for a real parent destination, `Field` with native `FileUpload` for selection, a loading `Button` to block repeated work, and `Progress` for task progress. This demo reads selected files locally with `FileReader`: it does not upload or persist them. Replace the read operation and progress events with an actual host workflow when copying the pattern. Keep the native file input required so form validation runs before starting, and disable file selection while work runs. The selected count is a status message; completion is acknowledged with `Alert`. On a failed read, show a Field error tied to the file control. Handle cleanup of in-progress work when the view unmounts.
