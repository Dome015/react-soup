import { useMemo, useState } from 'react';
import * as Soup from '../../index';

const items = [
  { name: 'Atlas', type: 'Design', status: 'Active' },
  { name: 'Orion', type: 'Engineering', status: 'Active' },
  { name: 'Meridian', type: 'Design', status: 'Draft' },
  { name: 'Vector', type: 'Research', status: 'Draft' },
];

export type SearchFiltersExampleProps = { initialQuery?: string; initialStatus?: string; initialTypes?: string[] };

export function SearchFiltersExample({ initialQuery = '', initialStatus = 'all', initialTypes = [] }: SearchFiltersExampleProps) {
  const [query, setQuery] = useState(initialQuery);
  const [types, setTypes] = useState<string[]>(initialTypes);
  const [status, setStatus] = useState(initialStatus);
  const results = useMemo(() => items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) && (types.length === 0 || types.includes(item.type)) && (status === 'all' || item.status === status)), [query, types, status]);
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><h1>Find a project.</h1><p className="soup-example-lead">Search by name and narrow the list with filters.</p></header>
    <Soup.Card><Soup.Grid><Soup.Field label="Search" htmlFor="filter-query"><Soup.Input id="filter-query" type="search" placeholder="Project name" value={query} onChange={event => setQuery(event.target.value)} /></Soup.Field><Soup.Field label="Type" htmlFor="filter-type"><Soup.Dropdown id="filter-type" label="Project types" multiple searchable clearable placeholder="All types" options={[{ value: 'Design', label: 'Design' }, { value: 'Engineering', label: 'Engineering' }, { value: 'Research', label: 'Research' }]} value={types} onValueChange={value => setTypes(value as string[])} /></Soup.Field><Soup.Field label="Status" htmlFor="filter-status"><Soup.Select id="filter-status" value={status} onChange={event => setStatus(event.target.value)}><option value="all">All statuses</option><option>Active</option><option>Draft</option></Soup.Select></Soup.Field></Soup.Grid></Soup.Card>
    <Soup.Inline justify="between"><strong role="status">{results.length} {results.length === 1 ? 'result' : 'results'}</strong><Soup.Button variant="ghost" onClick={() => { setQuery(''); setTypes([]); setStatus('all'); }}>Clear filters</Soup.Button></Soup.Inline>
    {results.length > 0 ? <Soup.Grid>{results.map(item => <Soup.Card key={item.name}><Soup.Stack gap="sm"><Soup.Inline justify="between"><strong>{item.name}</strong><Soup.Badge tone={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Soup.Badge></Soup.Inline><span>{item.type}</span></Soup.Stack></Soup.Card>)}</Soup.Grid> : <Soup.Alert title="No matches">Try a different search or clear the filters.</Soup.Alert>}
  </Soup.Stack></main></Soup.Container>;
}
