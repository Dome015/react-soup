# Tabs

One local content view at a time.

## API

label: string; tabs: {id, label, content, disabled?}[]; defaultValue?, value?, onValueChange?.

Import from `src/index.ts` in this repository or the equivalent root when vendored. Standard HTML props are passed through where applicable. Styling is in `src/styles/components.css`; all visual values come from `src/styles/theme.css`.

## Example

```tsx
import { Tabs } from "../../index";
<Tabs label="Account sections" tabs={[{id:"profile",label:"Profile",content:<p>Profile content</p>},{id:"security",label:"Security",content:<p>Security content</p>}]} />
```

## Usage rule

Use for peer views within the same page. Stable IDs are needed. Arrow keys move between enabled tabs.
Tab labels use the shared small control text and medium control height. Keep the selected label in ink with the accent underline, rather than coloring every tab accent blue.

Check the `Tabs` Storybook story and relevant page examples when changing behavior or visual treatment.
