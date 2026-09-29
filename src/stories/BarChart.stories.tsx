import * as Soup from '../index';

export default { title: 'Components/BarChart', component: Soup.BarChart };

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const teams = [
  { name: 'Design', values: [18, 26, 22, 34] },
  { name: 'Engineering', values: [24, 21, 31, 29] },
  { name: 'Research', values: [10, 15, 17, 22] },
];

export const Bar = () => <Soup.BarChart title="Projects by quarter" description="New projects started" labels={quarters} series={[{ name: 'Projects', values: [8, 12, 10, 16] }]} />;
export const Horizontal = () => <Soup.BarChart title="Projects by team" labels={['Design', 'Engineering', 'Research', 'Operations']} series={[{ name: 'Projects', values: [18, 26, 12, 8] }]} orientation="horizontal" />;
export const HorizontalGrouped = () => <Soup.BarChart title="Team output" description="Compare completed and planned tasks" labels={['Design', 'Engineering', 'Research']} series={[{ name: 'Completed', values: [18, 24, 12] }, { name: 'Planned', values: [22, 28, 16] }]} orientation="horizontal" />;
export const Grouped = () => <Soup.BarChart title="Completed tasks" description="Compare teams within each quarter" labels={quarters} series={teams} />;
export const Stacked = () => <Soup.BarChart title="Total tasks completed" description="Team contribution to each quarter" labels={quarters} series={teams} stacked />;
export const HorizontalStacked = () => <Soup.BarChart title="Work by category" labels={['Current', 'Planned', 'Backlog']} series={[{ name: 'Design', values: [20, 12, 16] }, { name: 'Engineering', values: [15, 18, 12] }]} orientation="horizontal" stacked />;
export const PositiveAndNegative = () => <Soup.BarChart title="Net change" labels={quarters} series={[{ name: 'Change', values: [-8, 12, -4, 16] }]} />;
export const Empty = () => <Soup.BarChart title="No projects yet" labels={[]} series={[]} />;
