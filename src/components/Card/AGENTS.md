# Card

Quiet surface grouping related content. It has no visible border and gives direct children a consistent shared spacing rhythm, so headings begin at the card padding.

## API

as?: article | section | div; standard element props.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Card, Stack } from "../../index";
<Card><Stack><h2>Usage</h2><p>12 projects</p></Stack></Card>
```

## Usage rule

Use for a coherent group, not as decoration around every element.
Use an `h2` for a card section title; it shares the large title size and tight line height with dialog and chart titles. Use `Stack` for nested spacing and let the Card handle spacing between direct children.

Check the `Card` Storybook story and relevant page examples when changing behavior or visual treatment.
