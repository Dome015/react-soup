# FileUpload

Native file chooser with shared control styling.

## API

Native file-input props except `type`, `value`, and `defaultValue`; ref forwarded. Use `accept`, `multiple`, `required`, and `disabled` when appropriate. Files are available through `event.currentTarget.files` or the forwarded ref.

## Example

```tsx
import { Field, FileUpload } from "../../index";
<Field label="Attachment" htmlFor="attachment" description="Choose a PDF">
  <FileUpload id="attachment" accept=".pdf" aria-describedby="attachment-description" required onChange={event => setFile(event.currentTarget.files?.[0] ?? null)} />
</Field>
```

## Usage rule

Pair with `Field` or another visible label. Preserve the native picker and keyboard behavior. `accept` guides selection but does not validate file contents; validate files in the host application. FileUpload only selects files—it does not transfer them. Show selected names or a count and connect errors with `aria-describedby`. Use `Progress` for measurable file processing or transfer, as shown in `Examples/Document Review`.
