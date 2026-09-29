# Progress

Labeled task progress using native `<progress>`.

## API

`label` required; `value?`, `max?` (default 100), `showValue?` (default true), and native progress attributes. Omit `value` for indeterminate work. A valid determinate value shows a visual percentage; the native element exposes its value to assistive technology.

## Example

```tsx
import { Progress } from "../../index";
<Progress label="Uploading files" value={uploadedBytes} max={totalBytes} />
<Progress label="Preparing files" />
```

## Usage rule

Use for a task that is in progress, not a static measurement or a multi-step navigation indicator. Update `value` from real task progress. Pair an updating region with `aria-busy` and a useful status message as needed; progress value changes alone are not a live announcement. See `Examples/Document Review` for a local file-reading workflow.
