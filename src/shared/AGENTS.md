# Shared source contract

This directory is included whenever either `src/react` or `src/vanilla` is vendored. Place framework-neutral code used by both implementations here. Keep React, React DOM, Storybook, and example imports out of this directory.

`styles/` owns every aesthetic CSS value. Both implementations import the same files; never copy theme tokens or component CSS into an implementation directory. When changing a shared class or token, inspect the matching React and vanilla stories together in light, dark, and auto modes and at narrow and wide widths. Keep the two implementations equivalent for users, including focus and disabled states.

Shared TypeScript modules may contain icon geometry, chart calculations, and other pure data or functions. Browser DOM behavior belongs in `src/vanilla`; React behavior belongs in `src/react` unless it can be expressed as a genuinely framework-neutral function.
