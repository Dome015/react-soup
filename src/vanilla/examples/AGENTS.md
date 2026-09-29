# Vanilla page examples

Each directory contains plain HTML starting states matching the React example stories. These are copyable page and workflow references. `CompletePattern.html` is the main view where present; other files show meaningful empty, filtered, pending, or alternate states. Keep the shared CSS token classes and semantic markup. Do not introduce a page rendering framework.

Attach small TypeScript event handlers only for workflows that change state. Use native form validation, explicit labels, focus management, and status feedback. A static snapshot by itself does not establish functional parity. Check each action against the equivalent React example and document state transitions in this directory's `AGENTS.md`.
