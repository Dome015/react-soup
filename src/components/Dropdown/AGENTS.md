# Dropdown

`Dropdown` is a choice input with four modes: ordinary single choice, searchable single choice, multiple choice, and searchable multiple choice. Use native `Select` for a short simple list when built-in browser behavior is preferred. `DropdownMenu` is for commands, not values.

## API

- `options: { value, label, description?, disabled? }[]` and `label: string` are required. Option values must be unique and stable.
- `multiple` enables an array of selected values. `searchable` adds a search field. Both may be used together.
- `value` with `onValueChange` is controlled; `defaultValue` enables internal state. Single mode emits a string, multiple mode emits a string array.
- `clearable` shows a clear button when there is a selection. `placeholder`, `searchPlaceholder`, and `emptyMessage` customize copy.
- `id`, `name`, `disabled`, `aria-describedby`, and `aria-invalid` support forms. `name` emits one hidden input per selected value. Custom dropdowns do not provide native required-field validation; validate controlled values in the form handler.

## Examples

```tsx
import { Dropdown, Field } from "../../index";
<Field label="Timezone" htmlFor="timezone">
<Dropdown id="timezone" label="Timezone" searchable options={zones} value={zone} onValueChange={value => setZone(value as string)} />
</Field>

<Field label="Project types" htmlFor="types">
<Dropdown id="types" label="Project types" multiple searchable clearable options={types} value={selectedTypes} onValueChange={value => setSelectedTypes(value as string[])} />
</Field>
```

The trigger opens the list; typing filters options in a plain text search field; Arrow Up/Down, Home/End, Enter/Space, Escape, pointer selection, and clearing are supported. Multi-select stays open after choosing. The `Search + filters` and `Settings form` examples show real composition. All visual rules are in `src/styles/components.css` and use theme tokens only.
The trigger and option rows follow the medium control height and small control text tokens.
