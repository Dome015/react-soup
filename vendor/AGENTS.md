# Vendor inventory and dependency policy

No third-party runtime library is vendored here. The local `Icon` component replaces an icon package, so `vendor/` has no library subdirectories.

React and React DOM are supplied by the host application as peer dependencies (`>=18`). They are installed locally only for development and Storybook. The exact installed development versions are recorded in `package-lock.json` once dependencies are installed. TypeScript, Vite, and Storybook are development tools and do not enter copied runtime sources.

Current local development versions: React and React DOM `19.3.0`, Storybook and `@storybook/react-vite` `10.6.0`, Vite `8.3.1`, and TypeScript `7.0.2`. Their transitive versions are pinned by `package-lock.json`. None of these packages is copied into `vendor/`.

If a future runtime dependency is truly necessary, first consider a small local implementation. If vendoring it, create `vendor/<library>/` with its source, exact upstream version, license, source URL, modifications, and a local `AGENTS.md`. Update this inventory and verify the dependency is compatible with the host app.
