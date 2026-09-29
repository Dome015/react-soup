# Toast in plain HTML

A static toast is ordinary semantic HTML; the optional `notify` function is for messages created after an action.

```html
<div class="soup-toast-viewport" aria-label="Notifications"></div>
```

Compile and import `notify` from `src/vanilla/components/Toast/Toast.ts` when needed:

```ts
import { notify } from './Toast/Toast';
const viewport = document.querySelector<HTMLElement>('.soup-toast-viewport')!;
notify(viewport, { title: 'Settings saved', tone: 'success' });
```

`notify` adds a toast with a dismiss button and removes it after five seconds; its return function dismisses it sooner. Valid tones are neutral, info, success, warning, and danger. Danger uses `role="alert"`; other tones use `role="status"`. Keep critical form errors beside their field as well. A prewritten toast's dismiss button is wired by the optional `src/vanilla/dist/behavior.js` script. The Basic story demonstrates a native button with `data-soup-toast-title` and `data-soup-toast-tone` for a declarative demo trigger.

Inspect `../../stories/Components/Toast/` and `../../examples/authentication/`. Compare stacking, focus, dismiss, and auto removal with `src/react/stories/Toast.stories.tsx` in all theme modes. All visual values come from shared CSS tokens.
