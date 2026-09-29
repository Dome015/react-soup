import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { iconShapes, type IconName } from '../src/shared/icons.ts';

/** Development scaffold: captures React's initial DOM as plain HTML parity fixtures. */
const root = process.cwd();
const storiesRoot = join(root, 'src/react/stories');
const vanillaRoot = join(root, 'src/vanilla/stories');
const vanillaExamplesRoot = join(root, 'src/vanilla/examples');
const sourceFiles = (await readdir(storiesRoot)).filter(name => name.endsWith('.stories.tsx'));

type Choice = { value: string; label: string; description?: string; disabled?: boolean };
type DropdownFixture = { options: Choice[]; value?: string[]; multiple?: boolean; searchable?: boolean; clearable?: boolean; placeholder?: string };
const dropdownFixtures: Record<string, DropdownFixture[]> = {
  'Components/Dropdown/Single': [{ options: [{ value: 'rome', label: 'Europe / Rome' }, { value: 'new-york', label: 'America / New York' }, { value: 'tokyo', label: 'Asia / Tokyo' }], value: ['rome'] }],
  'Components/Dropdown/Searchable': [{ options: [{ value: 'ada', label: 'Ada Lovelace', description: 'Design' }, { value: 'grace', label: 'Grace Hopper', description: 'Engineering' }, { value: 'lin', label: 'Lin Chen', description: 'Research' }], searchable: true, clearable: true, placeholder: 'Choose a person' }],
  'Components/Dropdown/Multiple': [{ options: [{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }, { value: 'research', label: 'Research' }], multiple: true, clearable: true, value: ['design', 'research'] }],
  'Components/Dropdown/SearchableMultiple': [{ options: [{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }, { value: 'research', label: 'Research' }, { value: 'marketing', label: 'Marketing' }], multiple: true, searchable: true, clearable: true, value: ['design'] }],
  'Components/Dropdown/DisabledAndEmpty': [{ options: [] }, { options: [], searchable: true }],
  'Examples/Search Filters/CompletePattern': [{ options: [{ value: 'Design', label: 'Design' }, { value: 'Engineering', label: 'Engineering' }, { value: 'Research', label: 'Research' }], multiple: true, searchable: true, clearable: true, placeholder: 'All types' }],
  'Examples/Search Filters/CombinedFilters': [{ options: [{ value: 'Design', label: 'Design' }, { value: 'Engineering', label: 'Engineering' }, { value: 'Research', label: 'Research' }], multiple: true, searchable: true, clearable: true, placeholder: 'All types', value: ['Design'] }],
  'Examples/Search Filters/NoMatches': [{ options: [{ value: 'Design', label: 'Design' }, { value: 'Engineering', label: 'Engineering' }, { value: 'Research', label: 'Research' }], multiple: true, searchable: true, clearable: true, placeholder: 'All types' }],
  'Examples/Settings Form/CompletePattern': [{ options: [{ value: 'Europe/Rome', label: 'Europe / Rome' }, { value: 'America/New_York', label: 'America / New York' }, { value: 'Asia/Tokyo', label: 'Asia / Tokyo' }], searchable: true, value: ['Europe/Rome'] }],
  'Foundations/Visual Rhythm/Controls': [{ options: [{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }], value: ['design'] }],
};

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function icon(name: IconName): string {
  const shapes = iconShapes[name].map(shape => shape.tag === 'path'
    ? `<path d="${shape.d}"></path>`
    : `<circle cx="${shape.cx}" cy="${shape.cy}" r="${shape.r}"></circle>`).join('');
  return `<svg class="soup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes}</svg>`;
}

function injectIntoRoots(markup: string, className: string, fixtures: { attributes?: string; content: string }[], key: string): string {
  const starts = [...markup.matchAll(new RegExp(`<div class="${className}(?: [^"]+)?"`, 'g'))].map(match => match.index);
  if (starts.length !== fixtures.length) throw new Error(`${className} fixture mismatch: ${key} (${starts.length} found, ${fixtures.length} expected)`);
  for (let index = starts.length - 1; index >= 0; index--) {
    const start = starts[index];
    const fixture = fixtures[index];
    const openingEnd = markup.indexOf('>', start);
    if (fixture.attributes) markup = `${markup.slice(0, openingEnd)} ${fixture.attributes}${markup.slice(openingEnd)}`;
    let depth = 0;
    let closingStart = -1;
    const tags = /<\/?div\b[^>]*>/g;
    tags.lastIndex = start;
    for (const tag of markup.matchAll(tags)) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (depth === 0) { closingStart = tag.index; break; }
    }
    if (closingStart < 0) throw new Error(`Unclosed ${className}: ${key}`);
    markup = `${markup.slice(0, closingStart)}${fixture.content}${markup.slice(closingStart)}`;
  }
  return markup;
}

type MenuChoice = { label: string; icon?: IconName; danger?: boolean; disabled?: boolean; action?: string };
function menuTemplate(items: MenuChoice[]): string {
  return `<template data-soup-menu>${items.map(item => `<button type="button" role="menuitem" data-action="${escapeAttribute(item.action ?? item.label)}"${item.disabled ? ' disabled' : ''} class="soup-menu__item${item.danger ? ' soup-menu__item--danger' : ''}">${item.icon ? icon(item.icon) : ''}${escapeAttribute(item.label)}</button>`).join('')}</template>`;
}

function annotateMenus(markup: string, key: string): string {
  let items: MenuChoice[] | undefined;
  let align = '';
  if (key === 'Components/DropdownMenu/Basic') items = [{ label: 'Edit', icon: 'edit' }, { label: 'Duplicate', icon: 'plus' }, { label: 'Delete', icon: 'trash', danger: true }];
  if (key === 'Components/DropdownMenu/MoreStates') items = [{ label: 'Unavailable', disabled: true }];
  if (key === 'Foundations/Visual Rhythm/Controls') items = [{ label: 'Edit project', icon: 'edit' }, { label: 'Delete project', icon: 'trash', danger: true }];
  if (key.startsWith('Examples/Crud List/')) { items = [{ label: 'Mark active', icon: 'check' }, { label: 'Delete', icon: 'trash', danger: true }]; align = 'data-align="end"'; }
  if (key.startsWith('Examples/Project Workspace/')) { items = [{ label: 'Edit project', icon: 'edit' }, { label: 'Delete project', icon: 'trash', danger: true }]; align = 'data-align="end"'; }
  if (key.startsWith('Examples/Team Management/')) { items = [{ label: 'Make editor' }, { label: 'Make viewer' }]; align = 'data-align="end"'; }
  if (!items) return markup;
  const count = [...markup.matchAll(/<div class="soup-menu"/g)].length;
  return injectIntoRoots(markup, 'soup-menu', Array.from({ length: count }, () => ({ attributes: align, content: menuTemplate(items) })), key);
}

function annotatePopovers(markup: string, key: string): string {
  const content = key === 'Components/Popover/Basic' || key === 'Foundations/Visual Rhythm/Controls'
    ? '<div class="soup-stack soup-gap--sm"><strong>Atlas</strong><span>Updated today</span></div>'
    : key === 'Components/Popover/MoreStates'
      ? '<button type="button" class="soup-button soup-button--primary soup-button--md" data-soup-close>Done</button>' : undefined;
  if (!content) return markup;
  const attributes = key === 'Components/Popover/MoreStates' ? 'data-align="end" data-label="Extra actions"' : 'data-label="Project details"';
  return injectIntoRoots(markup, 'soup-popover', [{ attributes, content: `<template data-soup-popover>${content}</template>` }], key);
}

function annotateDialogs(markup: string, key: string): string {
  let count = 0;
  markup = markup.replaceAll('<dialog class="soup-dialog"', () => `<dialog id="soup-dialog-${count++}" class="soup-dialog"`);
  const trigger = key === 'Components/Dialog/Basic' ? 'Open dialog'
    : key === 'Examples/Confirmation Dialog/CompletePattern' ? 'Publish release'
    : key === 'Examples/Destructive Action Flow/CompletePattern' ? 'Delete workspace'
    : key.startsWith('Examples/Project Workspace/') ? 'New project'
    : key.startsWith('Examples/Team Management/') ? 'Invite member' : undefined;
  if (trigger && count) {
    const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(<button[^>]*)(>${escaped}<\\/button>)`);
    markup = markup.replace(pattern, `$1 data-soup-dialog-open="soup-dialog-0"$2`);
  }
  return markup;
}

function annotateTables(markup: string, key: string): string {
  if (key === 'Examples/Pagination/CompletePattern') {
    const rows = Array.from({ length: 123 }, (_, index) => {
      const name = `Project ${String(index + 1).padStart(3, '0')}`;
      const status = index % 3 === 0 ? 'Draft' : 'Active';
      return `<tr><td>${name}</td><td><span class="soup-badge soup-tone--${status === 'Active' ? 'success' : 'neutral'}">${status}</span></td></tr>`;
    }).join('');
    return injectIntoRoots(markup, 'soup-table-data', [{ attributes: 'data-page-size="5"', content: `<template data-soup-rows>${rows}</template>` }], key);
  }
  if (key !== 'Components/Table/SortAndPaginate' && key !== 'Components/Table/ServerControlled') return markup;
  const rows = Array.from({ length: 42 }, (_, index) => {
    const name = `Project ${String(index + 1).padStart(2, '0')}`;
    const score = (index * 17) % 100;
    return `<tr><td>${name}</td><td>${score}</td></tr>`;
  }).join('');
  return injectIntoRoots(markup, 'soup-table-data', [{ attributes: 'data-page-size="5"', content: `<template data-soup-rows>${rows}</template>` }], key);
}

function annotateToastDemo(markup: string, key: string): string {
  if (key !== 'Components/Toast/Basic') return markup;
  return markup.replace(/(<button[^>]*)(>Show toast<\/button>)/, '$1 data-soup-toast-title="Settings saved" data-soup-toast-tone="success"$2');
}

function decorate(markup: string, key: string): string {
  return annotateToastDemo(annotateTables(annotateDialogs(annotatePopovers(annotateMenus(annotateDropdowns(markup, key), key), key), key), key), key);
}

function readableMarkup(markup: string): string {
  const blocks = 'article|aside|details|dialog|div|footer|form|header|li|main|nav|ol|section|summary|table|tbody|template|thead|tr|ul';
  return markup
    .replace(new RegExp(`>(?=<(?:${blocks})\\b)`, 'g'), '>\n')
    .replace(new RegExp(`(</(?:${blocks})>)(?=<)`, 'g'), '$1\n');
}

function annotateDropdowns(markup: string, key: string): string {
  const fixtures = dropdownFixtures[key];
  if (!fixtures) return markup;
  const starts = [...markup.matchAll(/<div class="soup-dropdown(?: soup-dropdown--disabled)?"/g)].map(match => match.index);
  if (starts.length !== fixtures.length) throw new Error(`Dropdown fixture mismatch: ${key}`);
  for (let index = starts.length - 1; index >= 0; index--) {
    const start = starts[index];
    const fixture = fixtures[index];
    const openingEnd = markup.indexOf('>', start);
    const attributes = [
      fixture.value?.length ? `data-value="${escapeAttribute(fixture.value.join(','))}"` : '',
      fixture.multiple ? 'data-multiple' : '', fixture.searchable ? 'data-searchable' : '',
      fixture.clearable ? 'data-clearable' : '',
      fixture.placeholder ? `data-placeholder="${escapeAttribute(fixture.placeholder)}"` : '',
    ].filter(Boolean).join(' ');
    markup = `${markup.slice(0, openingEnd)} ${attributes}${markup.slice(openingEnd)}`;
    let depth = 0;
    let closingStart = -1;
    const tags = /<\/?div\b[^>]*>/g;
    tags.lastIndex = start;
    for (const tag of markup.matchAll(tags)) {
      if (tag.index < start) continue;
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (depth === 0) { closingStart = tag.index; break; }
    }
    if (closingStart < 0) throw new Error(`Unclosed dropdown: ${key}`);
    const options = fixture.options.map(option => `<div data-value="${escapeAttribute(option.value)}"${option.disabled ? ' data-disabled' : ''}><div><strong>${escapeAttribute(option.label)}</strong>${option.description ? `<small>${escapeAttribute(option.description)}</small>` : ''}</div></div>`).join('');
    markup = `${markup.slice(0, closingStart)}<template data-soup-options>${options}</template>${markup.slice(closingStart)}`;
  }
  return markup;
}

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  for (const sourceFile of sourceFiles) {
    const story = await server.ssrLoadModule(`/src/react/stories/${sourceFile}`);
    const title: string = story.default.title;
    const [group, ...parts] = title.split('/');
    const destination = group === 'Examples'
      ? join(vanillaExamplesRoot, sourceFile.replace(/^Example-/, '').replace(/\.stories\.tsx$/, ''))
      : join(vanillaRoot, group, ...parts);
    await mkdir(destination, { recursive: true });
    const css = relative(destination, join(root, 'src/shared/styles/index.css'));
    const examplesCss = relative(destination, join(root, 'src/shared/styles/examples.css'));
    const behavior = relative(destination, join(root, 'src/vanilla/behavior.ts'));
    const exampleScript = group === 'Examples' && existsSync(join(destination, 'example.ts')) ? '<script type="module" src="./example.ts"></script>' : '';
    const workspaceTemplate = title === 'Examples/Project Workspace' && typeof story.FullDirectory === 'function'
      ? decorate(renderToStaticMarkup(createElement(story.FullDirectory as () => ReturnType<typeof createElement>)), `${title}/FullDirectory`).match(/<article class="soup-card">[\s\S]*?<\/article>/)?.[0]
      : undefined;
    for (const [name, component] of Object.entries(story)) {
      if (name === 'default' || typeof component !== 'function') continue;
      const key = `${title}/${name}`;
      let markup = decorate(renderToStaticMarkup(createElement(component as () => ReturnType<typeof createElement>)), key);
      if (workspaceTemplate && (name === 'NoProjectsYet' || name === 'NoFilterMatches')) markup += `<template data-soup-workspace-card>${workspaceTemplate}</template>`;
      const contentClass = group === 'Components' ? ' class="soup-story-content"' : '';
      const needsBehavior = /\b(?:soup-dropdown|soup-menu|soup-popover|soup-pagination|soup-dialog|soup-table-data|soup-toast-viewport|soup-chart|soup-tabs|soup-file-tree)\b/.test(markup);
      const behaviorScript = needsBehavior ? `<script type="module" src="${behavior}"></script>` : '';
      const document = `<!doctype html>\n<html lang="en" data-theme="auto">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${title} — ${name}</title>\n<link rel="stylesheet" href="${css}">\n<link rel="stylesheet" href="${examplesCss}">\n${behaviorScript}\n${exampleScript}\n</head>\n<body>\n<div class="soup-story-surface">\n<div${contentClass}>\n${readableMarkup(markup)}\n</div>\n</div>\n</body>\n</html>\n`;
      await writeFile(join(destination, `${name}.html`), document);
    }
  }
} finally {
  await server.close();
}
