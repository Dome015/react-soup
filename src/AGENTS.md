# Source map

`shared/` contains the sole CSS token and component stylesheets and any framework-neutral code. `react/` and `vanilla/` are independently vendorable implementations, each with a public index, components, stories, examples, and local agent guides. Always vendor `shared/` with either implementation. Keep the public component inventories and their visual, behavioral, and accessibility states in parity. Story and example code teaches usage and is not a runtime requirement. No component may import Storybook or example code.
