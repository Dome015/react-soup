# Source map

`index.ts` is the public import surface. `components/` contains vendorable React components and their local agent guides. `styles/` contains the only CSS values and shared styles. `stories/` and `examples/` teach usage and are not runtime requirements. Keep exports aligned with component additions. No component may import Storybook or example code.
