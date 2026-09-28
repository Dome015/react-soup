import { useState } from 'react';
import * as Soup from '../index';

export default { title: 'Components/Dropdown', component: Soup.Dropdown };

export const Single = () => <Soup.Field label="Timezone" htmlFor="story-zone"><Soup.Dropdown id="story-zone" label="Timezone" options={[{ value: 'rome', label: 'Europe / Rome' }, { value: 'new-york', label: 'America / New York' }, { value: 'tokyo', label: 'Asia / Tokyo' }]} defaultValue="rome" /></Soup.Field>;

export const Searchable = () => <Soup.Field label="Assignee" htmlFor="story-assignee"><Soup.Dropdown id="story-assignee" label="Assignee" searchable clearable placeholder="Choose a person" options={[{ value: 'ada', label: 'Ada Lovelace', description: 'Design' }, { value: 'grace', label: 'Grace Hopper', description: 'Engineering' }, { value: 'lin', label: 'Lin Chen', description: 'Research' }]} /></Soup.Field>;

export const Multiple = () => <Soup.Field label="Project types" htmlFor="story-types"><Soup.Dropdown id="story-types" label="Project types" multiple clearable options={[{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }, { value: 'research', label: 'Research' }]} defaultValue={['design', 'research']} /></Soup.Field>;

export const SearchableMultiple = () => {
  const [selected, setSelected] = useState<string[]>(['design']);
  return <Soup.Stack><Soup.Field label="Disciplines" htmlFor="story-disciplines"><Soup.Dropdown id="story-disciplines" label="Disciplines" multiple searchable clearable options={[{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }, { value: 'research', label: 'Research' }, { value: 'marketing', label: 'Marketing' }]} value={selected} onValueChange={value => setSelected(value as string[])} /></Soup.Field><p>Selected: {selected.join(', ') || 'none'}</p></Soup.Stack>;
};

export const DisabledAndEmpty = () => <Soup.Stack><Soup.Dropdown label="Unavailable" disabled options={[]} /><Soup.Dropdown label="No choices" searchable options={[]} /></Soup.Stack>;
