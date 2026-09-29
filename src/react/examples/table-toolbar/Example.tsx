import { useState } from 'react';
import * as Soup from '../../index';

const team = [{ name: 'Ada Lovelace', role: 'Owner', status: 'Active' }, { name: 'Grace Hopper', role: 'Editor', status: 'Active' }, { name: 'Lin Chen', role: 'Viewer', status: 'Invited' }];

export function TableToolbarExample() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const visible = team.filter(person => person.name.toLowerCase().includes(query.toLowerCase()) && (role === 'all' || person.role === role));
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <Soup.Inline justify="between" align="end"><header><h1>Team members</h1></header><Soup.Button>Invite member</Soup.Button></Soup.Inline>
    <Soup.Card><Soup.Stack><Soup.Inline justify="between"><div className="soup-example-toolbar-search"><Soup.Input aria-label="Search team members" type="search" placeholder="Search members" value={query} onChange={event => setQuery(event.target.value)} /></div><Soup.Inline><Soup.Select aria-label="Filter by role" value={role} onChange={event => setRole(event.target.value)}><option value="all">All roles</option><option>Owner</option><option>Editor</option><option>Viewer</option></Soup.Select><Soup.Button variant="secondary">Export</Soup.Button></Soup.Inline></Soup.Inline><Soup.Table><Soup.TableHead><Soup.TableRow><Soup.TableHeader>Member</Soup.TableHeader><Soup.TableHeader>Role</Soup.TableHeader><Soup.TableHeader>Status</Soup.TableHeader></Soup.TableRow></Soup.TableHead><Soup.TableBody>{visible.map(person => <Soup.TableRow key={person.name}><Soup.TableCell><Soup.Inline gap="sm"><Soup.Avatar name={person.name} />{person.name}</Soup.Inline></Soup.TableCell><Soup.TableCell>{person.role}</Soup.TableCell><Soup.TableCell><Soup.Badge tone={person.status === 'Active' ? 'success' : 'warning'}>{person.status}</Soup.Badge></Soup.TableCell></Soup.TableRow>)}</Soup.TableBody></Soup.Table><span className="soup-example-caption">Showing {visible.length} of {team.length} members</span></Soup.Stack></Soup.Card>
  </Soup.Stack></main></Soup.Container>;
}
