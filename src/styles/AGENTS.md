# Theme and CSS contract

`theme.css` is the sole source of literal visual values. It defines the light palette, dark palette, type scale, spacing scale, control sizes, surfaces, borders, radii, shadows, timing, and layout measurements. `components.css` contains reusable component selectors; it must use `var(--soup-*)` for visual values. `index.css` imports both.

Default theme follows `prefers-color-scheme`. Set `data-theme="light"` or `data-theme="dark"` on an ancestor to force a mode; `data-theme="auto"` follows the system. CSS variables inherit into components. The `color-scheme` property keeps native form controls consistent.

Before introducing a token, compare the desired value with the existing scale. Name new tokens by role, not by the component requesting one. For palette additions, define light and dark values. Avoid component-local CSS custom properties except aliases to global tokens (such as `--soup-gap`). Structural CSS keywords, intrinsic layout expressions, and selectors are fine; visual numeric literals belong in `theme.css`.

The blue accent color is reserved for primary actions, active states, and links. Destructive actions use red danger tokens. Rectangular surfaces have zero radius; circular avatar, switch, and circular skeleton shapes are deliberate exceptions. Use borders only where they communicate control boundaries, and overlap adjacent trigger and panel borders. Neutral surfaces carry most of the interface. Use Helvetica with system fallbacks; no web font download is required.

Text entry controls, including search fields and textareas, use the normal text caret cursor. Click-only controls, including buttons, selects, checkboxes, radios, switches, file/color/range inputs, and button-like inputs, use a pointer cursor. Disabled controls and their visible labels use `not-allowed`. Keep the cursor stable between checked and unchecked states.
