# Tabs: vanilla HTML contract

## Native pattern

```html
<div class="soup-tabs">
  <div class="soup-tabs__list" role="tablist" aria-label="Sections">
    <button id="overview-tab" type="button" role="tab" aria-selected="true"
      aria-controls="overview-panel" tabindex="0">Overview</button>
    <button id="details-tab" type="button" role="tab" aria-selected="false"
      aria-controls="details-panel" tabindex="-1">Details</button>
  </div>
  <div id="overview-panel" role="tabpanel" class="soup-tabs__panel" aria-labelledby="overview-tab">Overview content</div>
  <div id="details-panel" role="tabpanel" class="soup-tabs__panel" aria-labelledby="details-tab" hidden>Details content</div>
</div>
```

## Usage and accessibility

Each tab needs a unique ID and `aria-controls` pointing to one panel. Each panel's `aria-labelledby` points back to its tab. Disabled tabs are skipped. Arrow Left/Right and Home/End move selection and focus; inactive panels are hidden and the selected tab has `tabindex="0"`.

## Script requirement

Load the prebuilt `src/vanilla/dist/behavior.js` once as a browser module. It enhances the existing tablist and panels and emits bubbling `soup:change` from the root with `event.detail.value` set to the selected tab ID. Native buttons still handle pointer and Enter/Space activation.

## Reference

Inspect `../../stories/Components/Tabs/Basic.html` and all sibling story states. Compare them with `src/react/stories/Tabs.stories.tsx` in light, dark, and auto themes. Styling and every aesthetic value come from `src/shared/styles`; do not add component-local CSS values.
