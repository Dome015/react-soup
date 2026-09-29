# Breadcrumbs

Hierarchical navigation before page content.

## API

`items: { label: string; href: string }[]` for ancestor pages; `current: string` for the current page. Native nav props are passed through; the default landmark label is `Breadcrumb` and can be overridden with `aria-label`.

## Example

```tsx
import { Breadcrumbs } from "../../index";
<Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: "Atlas", href: "/projects/atlas" }]} current="Report" />
```

## Usage rule

Supply real ancestor destinations in order, then the current page. The component renders a labeled navigation landmark and ordered list; ancestor links are keyboard-accessible, separators are decorative, and the current page is marked with `aria-current="page"`. Use no ancestor items for a top-level page. Do not use breadcrumbs for a user's history or a stepper.
