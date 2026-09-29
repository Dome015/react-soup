# Dialog in plain HTML

Use a native `<dialog>` for modal decisions. The browser supplies focus trapping and Escape behavior. Keep the title, description, body, and optional footer in authored HTML.

```html
<button type="button" class="soup-button soup-button--primary soup-button--md"
  data-soup-dialog-open="confirm-dialog">Open dialog</button>
<dialog id="confirm-dialog" class="soup-dialog" aria-label="Delete project" aria-describedby="confirm-description">
  <div class="soup-dialog__header">
    <div><h2>Delete project</h2><p id="confirm-description">This cannot be undone.</p></div>
    <button type="button" aria-label="Close dialog" class="soup-icon-button soup-button--ghost soup-button--md">…</button>
  </div>
  <div class="soup-dialog__body"><p>Project files will be removed.</p></div>
  <div class="soup-dialog__footer">
    <button type="button" class="soup-button soup-button--secondary soup-button--md">Cancel</button>
    <button type="button" class="soup-button soup-button--danger soup-button--md">Delete</button>
  </div>
</dialog>
```

Load `../../behavior.ts` for the optional `data-soup-dialog-open` trigger and footer handling, or call `dialog.showModal()` / `dialog.close()` directly in your page. The enhancer emits bubbling `soup:confirm` for a non-submit footer action (`detail.action` is its visible text) and `soup:close` when the dialog closes. The header close button and a footer button reading “Cancel” close it. A footer submit button preserves native form submission and is handled by the host form handler. Never rely on color alone to explain a destructive action.

Inspect `../../stories/Components/Dialog/` and `../../examples/confirmation-dialog/`. Compare focus, Escape, cancel, confirm, and narrow layouts with `src/react/stories/Dialog.stories.tsx` in all theme modes. Shared CSS tokens control appearance.
