import * as Soup from '../../index';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export function ChartsExample() {
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><h1>Project analytics.</h1><p className="soup-example-lead">Choose the chart that makes each question easy to answer.</p></header>
    <Soup.LineChart title="Delivery trend" description="Completed tasks by month" labels={months} series={[
      { name: 'Product', values: [14, 18, 21, 19, 28, 34] },
      { name: 'Platform', values: [10, 13, 17, 23, 25, 31] },
    ]} />
    <Soup.BarChart title="Work by team" description="Tasks completed this quarter" labels={['Design', 'Engineering', 'Research', 'Operations']} series={[{ name: 'Tasks', values: [32, 48, 19, 25] }]} orientation="horizontal" />
    <Soup.PieChart title="Project allocation" description="Share of active projects" variant="donut" data={[{ label: 'Product', value: 42 }, { label: 'Platform', value: 30 }, { label: 'Research', value: 18 }, { label: 'Operations', value: 10 }]} centerLabel="Projects" formatValue={value => `${value}%`} />
    <Soup.ScatterChart title="Project outcomes" description="Compare delivery time with completion" xLabel="Weeks" yLabel="Completion %" formatY={value => `${value}%`} series={[
      { name: 'Product', points: [{ x: 3, y: 78, label: 'Atlas' }, { x: 5, y: 91, label: 'Orion' }, { x: 8, y: 94, label: 'Nova' }] },
      { name: 'Platform', points: [{ x: 4, y: 70, label: 'Core' }, { x: 6, y: 85, label: 'API' }, { x: 9, y: 88, label: 'Tools' }] },
    ]} />
  </Soup.Stack></main></Soup.Container>;
}
