import * as Soup from '../../index';

const stats = [{ label: 'Active projects', value: '12', change: '+2 this month' }, { label: 'Open tasks', value: '38', change: 'Across 5 teams' }, { label: 'Completion', value: '84%', change: '+6% this month' }];
const activity = [{ name: 'Atlas', type: 'Design system', status: 'Active' }, { name: 'Orion', type: 'Product launch', status: 'Active' }, { name: 'Meridian', type: 'Research', status: 'Draft' }];

export function DashboardExample() {
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <Soup.Inline justify="between" align="end"><header><h1>Workspace at a glance.</h1><p className="soup-example-lead">A clear view of the work moving forward.</p></header><Soup.Button>New project</Soup.Button></Soup.Inline>
    <Soup.Grid>{stats.map(stat => <Soup.Card key={stat.label}><Soup.Stack gap="sm"><span className="soup-example-stat-label">{stat.label}</span><strong className="soup-example-stat">{stat.value}</strong><span className="soup-example-caption">{stat.change}</span></Soup.Stack></Soup.Card>)}</Soup.Grid>
    <Soup.Card><Soup.Stack><Soup.Inline justify="between"><h2>Recent projects</h2><Soup.Link href="#all-projects">View all</Soup.Link></Soup.Inline><Soup.Table><Soup.TableHead><Soup.TableRow><Soup.TableHeader>Project</Soup.TableHeader><Soup.TableHeader>Type</Soup.TableHeader><Soup.TableHeader>Status</Soup.TableHeader></Soup.TableRow></Soup.TableHead><Soup.TableBody>{activity.map(item => <Soup.TableRow key={item.name}><Soup.TableCell><strong>{item.name}</strong></Soup.TableCell><Soup.TableCell>{item.type}</Soup.TableCell><Soup.TableCell><Soup.Badge tone={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Soup.Badge></Soup.TableCell></Soup.TableRow>)}</Soup.TableBody></Soup.Table></Soup.Stack></Soup.Card>
  </Soup.Stack></main></Soup.Container>;
}
