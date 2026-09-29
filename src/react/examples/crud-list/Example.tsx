import { useState } from 'react';
import * as Soup from '../../index';

type Project = { id: number; name: string; owner: string; status: 'Active' | 'Draft' };
const initial: Project[] = [{ id: 1, name: 'Atlas', owner: 'Ada Lovelace', status: 'Active' }, { id: 2, name: 'Orion', owner: 'Grace Hopper', status: 'Draft' }, { id: 3, name: 'Meridian', owner: 'Lin Chen', status: 'Active' }];

export function CrudListExample({ initiallyEmpty = false }: { initiallyEmpty?: boolean }) {
  const [projects, setProjects] = useState(initiallyEmpty ? [] : initial);
  const [target, setTarget] = useState<Project | null>(null);
  const [nextId, setNextId] = useState(4);
  const add = () => { setProjects(current => [...current, { id: nextId, name: `New project ${nextId}`, owner: 'Ada Lovelace', status: 'Draft' }]); setNextId(id => id + 1); };
  const remove = () => { if (target) setProjects(current => current.filter(project => project.id !== target.id)); setTarget(null); };
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <Soup.Inline justify="between" align="end"><header><h1>Projects</h1><p className="soup-example-lead">Create and manage your team’s work.</p></header><Soup.Button onClick={add}>New project</Soup.Button></Soup.Inline>
    <Soup.Card>{projects.length > 0 ? <Soup.Table><Soup.TableHead><Soup.TableRow><Soup.TableHeader>Name</Soup.TableHeader><Soup.TableHeader>Owner</Soup.TableHeader><Soup.TableHeader>Status</Soup.TableHeader><Soup.TableHeader>Actions</Soup.TableHeader></Soup.TableRow></Soup.TableHead><Soup.TableBody>
      {projects.map(project => <Soup.TableRow key={project.id}><Soup.TableCell><strong>{project.name}</strong></Soup.TableCell><Soup.TableCell>{project.owner}</Soup.TableCell><Soup.TableCell><Soup.Badge tone={project.status === 'Active' ? 'success' : 'neutral'}>{project.status}</Soup.Badge></Soup.TableCell><Soup.TableCell><Soup.DropdownMenu label={`Actions for ${project.name}`} align="end" trigger={<Soup.Icon name="more" />} items={[{ label: 'Mark active', icon: 'check', onSelect: () => setProjects(current => current.map(item => item.id === project.id ? { ...item, status: 'Active' } : item)) }, { label: 'Delete', icon: 'trash', danger: true, onSelect: () => setTarget(project) }]} /></Soup.TableCell></Soup.TableRow>)}
    </Soup.TableBody></Soup.Table> : <Soup.Alert title="No projects">Create your first project to get started.</Soup.Alert>}</Soup.Card>
    <Soup.Dialog open={!!target} onOpenChange={open => { if (!open) setTarget(null); }} title="Delete project" description="This action cannot be undone." footer={<><Soup.Button variant="secondary" onClick={() => setTarget(null)}>Cancel</Soup.Button><Soup.Button variant="danger" onClick={remove}>Delete project</Soup.Button></>}><p>Delete <strong>{target?.name}</strong> and its associated content?</p></Soup.Dialog>
  </Soup.Stack></main></Soup.Container>;
}
