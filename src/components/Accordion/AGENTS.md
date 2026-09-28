# Accordion

Expandable sections for supporting information.

## API

Accordion wraps AccordionItem; each item needs title and children. Native details props such as open are accepted.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Accordion, AccordionItem } from "../../index";
<Accordion><AccordionItem title="How billing works"><p>Plans renew monthly.</p></AccordionItem></Accordion>
```

## Usage rule

Use for secondary content or FAQs. Do not hide the main action or critical information in a closed item.

Check the `Accordion` Storybook story and relevant page examples when changing behavior or visual treatment.
