# Grid

Responsive equal-width card grid.

## API

gap?: sm | md | lg; div props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Grid, Card } from "../../index";
<Grid><Card>Revenue</Card><Card>Users</Card><Card>Growth</Card></Grid>
```

## Usage rule

Columns adapt to available width based on the global minimum width token.

Check the `Grid` Storybook story and relevant page examples when changing behavior or visual treatment.
