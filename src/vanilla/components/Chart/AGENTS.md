# Internal chart DOM helpers

`shared.ts` is used by the four typed chart renderers and by the optional progressive enhancement script. It creates SVG elements, shared axes, semantic data tables, legends, empty states, and focus/hover tooltips. Do not call its helpers directly from a host page; use the matching BarChart, LineChart, PieChart, or ScatterChart renderer with an existing `<figure>`.

All color comes from `src/shared/styles/theme.css`; chart geometry uses unitless SVG coordinates and shared calculations in `src/shared/charts.ts` and `src/shared/chart-geometry.ts`. Keep axis calculations aligned with the React counterparts. The static HTML stories are the canonical output examples; `src/vanilla/stories/ChartFromData.html` demonstrates all four renderers.
