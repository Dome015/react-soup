# Vendor inventory and dependency policy

No third-party runtime library is vendored here. Shared icon geometry in `src/shared/icons.ts` replaces an icon package, so `vendor/` has no library subdirectories.

Vendor `src/shared` with exactly one implementation. React projects copy `src/react` and supply React and React DOM as peer dependencies (`>=18`). Framework-free projects copy `src/vanilla`, whose optional behavior uses browser APIs and has no framework runtime dependency. In both cases include the selected implementation's stories, examples, and AGENTS files as usage references. Import the shared stylesheet once.

React and React DOM are installed locally for development and Storybook. The exact installed development versions are recorded in `package-lock.json` once dependencies are installed. TypeScript, Vite, esbuild, and Storybook are development tools. The library builds and checks in `src/vanilla/dist`; a vanilla host copies the complete directory and serves its JavaScript directly. Build tools do not enter the copied browser runtime.

Current local development versions: React and React DOM `19.3.0`, Storybook and `@storybook/react-vite` `10.6.0`, Vite `8.3.1`, and TypeScript `7.0.2`. Their transitive versions are pinned by `package-lock.json`. None of these packages is copied into `vendor/`.

If a future runtime dependency is truly necessary, first consider a small local implementation. If vendoring it, create `vendor/<library>/` with its source, exact upstream version, license, source URL, modifications, and a local `AGENTS.md`. Update this inventory and verify the dependency is compatible with the host app.
