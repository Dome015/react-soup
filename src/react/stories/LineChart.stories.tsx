import * as Soup from '../index';

export default { title: 'Components/LineChart', component: Soup.LineChart };

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const teams = [
  { name: 'Design', values: [12, 18, 16, 25, 28, 34] },
  { name: 'Engineering', values: [9, 14, 20, 22, 31, 38] },
];

export const Line = () => <Soup.LineChart title="Work completed" description="Tasks completed each month" labels={months} series={teams} />;
export const Area = () => <Soup.LineChart title="Active users" description="Monthly active users, in thousands" labels={months} series={[{ name: 'Users', values: [14, 18, 24, 22, 29, 37] }]} variant="area" formatValue={value => `${value}k`} />;
export const Sparkline = () => <Soup.Card><Soup.Stack gap="sm"><span className="soup-example-stat-label">Weekly requests</span><strong className="soup-example-stat">1,280</strong><Soup.LineChart title="Weekly requests trend" labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} series={[{ name: 'Requests', values: [920, 1050, 980, 1110, 1030, 1190, 1280] }]} variant="sparkline" /></Soup.Stack></Soup.Card>;
export const MissingValues = () => <Soup.LineChart title="Incomplete measurements" labels={months} series={[{ name: 'Samples', values: [8, 12, Number.NaN, 16, 18, 22] }]} />;
export const Empty = () => <Soup.LineChart title="No measurements yet" labels={[]} series={[]} />;
