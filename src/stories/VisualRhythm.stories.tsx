import * as Soup from '../index';

export default { title: 'Foundations/Visual Rhythm' };

export const Controls = () => <Soup.Container><Soup.Stack gap="lg">
  <Soup.Inline>
    <Soup.Button>Primary action</Soup.Button>
    <Soup.Button variant="secondary">Secondary action</Soup.Button>
    <Soup.DropdownMenu label="Project actions" trigger={<Soup.Icon name="more" />} items={[{ label: 'Edit project', icon: 'edit', onSelect: () => {} }, { label: 'Delete project', icon: 'trash', danger: true, onSelect: () => {} }]} />
    <Soup.Popover trigger="Project details" label="Project details"><Soup.Stack gap="sm"><strong>Atlas</strong><span>Updated today</span></Soup.Stack></Soup.Popover>
  </Soup.Inline>
  <Soup.Grid>
    <Soup.Field label="Project name" htmlFor="rhythm-name"><Soup.Input id="rhythm-name" defaultValue="Atlas" /></Soup.Field>
    <Soup.Field label="Status" htmlFor="rhythm-status"><Soup.Select id="rhythm-status" defaultValue="active"><option value="active">Active</option><option value="draft">Draft</option></Soup.Select></Soup.Field>
    <Soup.Field label="Team" htmlFor="rhythm-team"><Soup.Dropdown id="rhythm-team" label="Team" defaultValue="design" options={[{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }]} /></Soup.Field>
  </Soup.Grid>
  <Soup.Tabs label="Project sections" tabs={[{ id: 'overview', label: 'Overview', content: <Soup.Card><h2>Overview</h2><p>Project details stay readable beside the controls.</p></Soup.Card> }, { id: 'activity', label: 'Activity', content: <Soup.Card><h2>Activity</h2><p>Recent updates appear here.</p></Soup.Card> }]} />
</Soup.Stack></Soup.Container>;

export const ContentHierarchy = () => <Soup.Container><Soup.Stack gap="lg">
  <Soup.Grid>
    <Soup.Card><h2>Project summary</h2><p>12 active projects</p></Soup.Card>
    <Soup.Card><h2>Team activity</h2><p>8 contributors this month</p></Soup.Card>
  </Soup.Grid>
  <Soup.Alert tone="info" title="Review ready">The latest report is available to the team.</Soup.Alert>
  <Soup.Accordion><Soup.AccordionItem title="How is progress measured?" open>Completed tasks are counted at the end of each week.</Soup.AccordionItem></Soup.Accordion>
  <Soup.LineChart title="Completed work" description="Tasks completed by week" labels={['Week 1', 'Week 2', 'Week 3', 'Week 4']} series={[{ name: 'Design', values: [8, 12, 11, 17] }, { name: 'Engineering', values: [10, 13, 16, 20] }]} />
</Soup.Stack></Soup.Container>;
