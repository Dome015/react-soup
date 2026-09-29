import * as Soup from '../index';

export default { title: 'Components/PieChart', component: Soup.PieChart };

const allocation = [
  { label: 'Design', value: 42 },
  { label: 'Engineering', value: 30 },
  { label: 'Research', value: 18 },
  { label: 'Operations', value: 10 },
];

export const Pie = () => <Soup.PieChart title="Team allocation" description="Share of planned work by discipline" data={allocation} formatValue={value => `${value}%`} />;
export const Donut = () => <Soup.PieChart title="Project allocation" description="Current distribution across teams" data={allocation} variant="donut" centerLabel="Planned" formatValue={value => `${value}%`} />;
export const OneCategory = () => <Soup.PieChart title="Single category" data={[{ label: 'Design', value: 100 }]} variant="donut" />;
export const Empty = () => <Soup.PieChart title="No allocation yet" data={[]} />;
