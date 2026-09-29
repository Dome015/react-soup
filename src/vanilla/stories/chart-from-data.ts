import { renderBarChart } from '../components/BarChart/BarChart';
import { renderLineChart } from '../components/LineChart/LineChart';
import { renderPieChart } from '../components/PieChart/PieChart';
import { renderScatterChart } from '../components/ScatterChart/ScatterChart';

renderBarChart(document.querySelector<HTMLElement>('#bar-chart')!, {
  title: 'Projects by quarter', description: 'New projects started', labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [{ name: 'Projects', values: [8, 12, 10, 16] }],
});
renderLineChart(document.querySelector<HTMLElement>('#line-chart')!, {
  title: 'Work completed', description: 'Tasks completed each month',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [{ name: 'Design', values: [12, 18, 16, 25, 28, 34] }, { name: 'Engineering', values: [9, 14, 20, 22, 31, 38] }],
});
renderPieChart(document.querySelector<HTMLElement>('#pie-chart')!, {
  title: 'Team allocation', description: 'Share of planned work by discipline',
  data: [{ label: 'Design', value: 42 }, { label: 'Engineering', value: 30 }, { label: 'Research', value: 18 }, { label: 'Operations', value: 10 }],
  formatValue: value => `${value}%`,
});
renderScatterChart(document.querySelector<HTMLElement>('#scatter-chart')!, {
  title: 'Time and completion', description: 'Each point represents one project', xLabel: 'Weeks', yLabel: 'Completion %',
  series: [{ name: 'Projects', points: [{ x: 2, y: 62, label: 'Atlas' }, { x: 3, y: 75, label: 'Orion' }, { x: 5, y: 83, label: 'Meridian' }, { x: 7, y: 79, label: 'Nova' }, { x: 8, y: 94, label: 'Helix' }] }],
  formatY: value => `${value}%`,
});
