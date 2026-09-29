import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { cx } from '../shared';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';

export type DropdownOption = { value: string; label: string; description?: string; disabled?: boolean };
export type DropdownProps = {
  options: DropdownOption[];
  label: string;
  id?: string;
  name?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
};

export function Dropdown({ options, label, id, name, value, defaultValue, onValueChange, multiple = false, searchable = false, clearable = false, placeholder = 'Select an option', searchPlaceholder = 'Search options', emptyMessage = 'No matching options', disabled = false, ...aria }: DropdownProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const listId = `${controlId}-listbox`;
  const [internal, setInternal] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''));
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = value ?? internal;
  const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];
  const selectedLabels = selectedValues.map(item => options.find(option => option.value === item)?.label ?? item);
  const filtered = searchable ? options.filter(option => `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : options;

  const focusOption = (index: number) => {
    const enabled = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ?? []);
    enabled[(index + enabled.length) % enabled.length]?.focus();
  };
  const close = () => { setOpen(false); setQuery(''); triggerRef.current?.focus(); };
  const choose = (option: DropdownOption) => {
    if (option.disabled) return;
    const next = multiple ? (selectedValues.includes(option.value) ? selectedValues.filter(item => item !== option.value) : [...selectedValues, option.value]) : option.value;
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
    if (!multiple) close();
    else if (searchable) searchRef.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) { setOpen(false); setQuery(''); } };
    const onEscape = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); close(); } };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onEscape);
    requestAnimationFrame(() => { if (searchable) searchRef.current?.focus(); else focusOption(Math.max(filtered.findIndex(option => selectedValues.includes(option.value) && !option.disabled), 0)); });
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onEscape); };
  }, [open]);
  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ?? []);
    const current = enabled.indexOf(document.activeElement as HTMLElement);
    if (event.key === 'ArrowDown') { event.preventDefault(); focusOption(current + 1); }
    if (event.key === 'ArrowUp') { event.preventDefault(); focusOption(current - 1); }
    if (event.key === 'Home') { event.preventDefault(); focusOption(0); }
    if (event.key === 'End') { event.preventDefault(); focusOption(enabled.length - 1); }
  };
  return <div className={cx('soup-dropdown', disabled && 'soup-dropdown--disabled')} ref={rootRef} onBlur={event => { if (!event.relatedTarget || !rootRef.current?.contains(event.relatedTarget as Node)) { setOpen(false); setQuery(''); } }}>
    {name && !disabled && selectedValues.map(item => <input key={item} type="hidden" name={name} value={item} />)}
    <div className="soup-dropdown__control">
      <button ref={triggerRef} id={controlId} type="button" className="soup-dropdown__trigger" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} disabled={disabled} onClick={() => { setOpen(current => !current); if (open) setQuery(''); }} onKeyDown={event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); requestAnimationFrame(() => focusOption(event.key === 'ArrowDown' ? 0 : -1)); } }} {...aria}>
        <span className={selectedValues.length ? 'soup-dropdown__value' : 'soup-dropdown__placeholder'}>{selectedLabels.length ? selectedLabels.join(', ') : placeholder}</span><Icon name="chevronDown" />
      </button>
      {clearable && selectedValues.length > 0 && !disabled && <IconButton icon="close" label={`Clear ${label}`} variant="secondary" onClick={() => { const next = multiple ? [] : ''; if (value === undefined) setInternal(next); onValueChange?.(next); }} />}
    </div>
    {open && <div className="soup-dropdown__panel">
      {searchable && <div className="soup-dropdown__search"><input ref={searchRef} type="search" aria-label={`Search ${label}`} placeholder={searchPlaceholder} value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); focusOption(0); } }} /></div>}
      <div id={listId} role="listbox" aria-label={label} aria-multiselectable={multiple || undefined} className="soup-dropdown__list" onKeyDown={onListKeyDown}><div className="soup-dropdown__options">{filtered.length ? filtered.map(option => <div key={option.value} role="option" tabIndex={option.disabled ? -1 : 0} aria-selected={selectedValues.includes(option.value)} aria-disabled={option.disabled || undefined} className="soup-dropdown__option" onClick={() => choose(option)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(option); } }}><div><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</div>{selectedValues.includes(option.value) && <Icon name="check" />}</div>) : <p className="soup-dropdown__empty">{emptyMessage}</p>}</div></div>
    </div>}
  </div>;
}
