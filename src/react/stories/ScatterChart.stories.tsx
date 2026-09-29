import * as Soup from '../index';

export default { title: 'Components/ScatterChart', component: Soup.ScatterChart };

const projects = [
  { x: 2, y: 62, label: 'Atlas' }, { x: 3, y: 75, label: 'Orion' },
  { x: 5, y: 83, label: 'Meridian' }, { x: 7, y: 79, label: 'Nova' },
  { x: 8, y: 94, label: 'Helix' },
];

export const Scatter = () => <Soup.ScatterChart title="Time and completion" description="Each point represents one project" xLabel="Weeks" yLabel="Completion %" series={[{ name: 'Projects', points: projects }]} formatY={value => `${value}%`} />;
export const MultipleSeries = () => <Soup.ScatterChart title="Project outcomes" xLabel="Weeks" yLabel="Completion %" series={[{ name: 'Product', points: projects.slice(0, 3) }, { name: 'Platform', points: [{ x: 4, y: 68, label: 'Core' }, { x: 6, y: 88, label: 'API' }, { x: 9, y: 91, label: 'Tools' }] }]} />;
export const Empty = () => <Soup.ScatterChart title="No project outcomes yet" series={[]} />;
