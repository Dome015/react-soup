import { useId, useState, type ReactNode } from 'react';

export type Tab = { id: string; label: string; content: ReactNode; disabled?: boolean };
export type TabsProps = { tabs: Tab[]; defaultValue?: string; value?: string; onValueChange?: (value: string) => void; label: string };

export function Tabs({ tabs, defaultValue, value, onValueChange, label }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs.find(tab => !tab.disabled)?.id);
  const active = value ?? internal;
  const baseId = useId();
  const select = (id: string) => { if (value === undefined) setInternal(id); onValueChange?.(id); };
  const move = (current: number, direction: number) => {
    const enabled = tabs.filter(tab => !tab.disabled);
    const currentIndex = enabled.findIndex(tab => tab.id === tabs[current]?.id);
    const target = enabled[(currentIndex + direction + enabled.length) % enabled.length];
    if (target) { select(target.id); document.getElementById(`${baseId}-tab-${target.id}`)?.focus(); }
  };
  const focusEdge = (edge: 'first' | 'last') => {
    const enabled = tabs.filter(tab => !tab.disabled);
    const target = edge === 'first' ? enabled[0] : enabled[enabled.length - 1];
    if (target) { select(target.id); document.getElementById(`${baseId}-tab-${target.id}`)?.focus(); }
  };
  return <div className="soup-tabs"><div role="tablist" aria-label={label} className="soup-tabs__list">
    {tabs.map((tab, index) => <button key={tab.id} id={`${baseId}-tab-${tab.id}`} role="tab" type="button" aria-selected={active === tab.id} aria-controls={`${baseId}-panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} disabled={tab.disabled} onClick={() => select(tab.id)} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(index, 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(index, -1); }
      if (event.key === 'Home') { event.preventDefault(); focusEdge('first'); }
      if (event.key === 'End') { event.preventDefault(); focusEdge('last'); }
    }}>{tab.label}</button>)}
  </div>{tabs.map(tab => <div key={tab.id} id={`${baseId}-panel-${tab.id}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab.id}`} hidden={active !== tab.id} tabIndex={0} className="soup-tabs__panel">{tab.content}</div>)}</div>;
}
