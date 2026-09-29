import { useState, type FormEvent } from 'react';
import * as Soup from '../../index';

type Project = {
  id: number;
  name: string;
  owner: string;
  type: 'Design' | 'Engineering' | 'Research';
  status: 'Active' | 'Draft';
};

type ProjectDraft = Omit<Project, 'id'>;
type DialogMode = 'create' | 'edit' | 'delete' | null;

const initialProjects: Project[] = [
  { id: 1, name: 'Atlas', owner: 'Ada Lovelace', type: 'Design', status: 'Active' },
  { id: 2, name: 'Orion', owner: 'Grace Hopper', type: 'Engineering', status: 'Active' },
  { id: 3, name: 'Meridian', owner: 'Lin Chen', type: 'Research', status: 'Draft' },
  { id: 4, name: 'Vector', owner: 'Ada Lovelace', type: 'Design', status: 'Draft' },
  { id: 5, name: 'Harbor', owner: 'Grace Hopper', type: 'Engineering', status: 'Active' },
  { id: 6, name: 'Signal', owner: 'Lin Chen', type: 'Research', status: 'Active' },
  { id: 7, name: 'Canvas', owner: 'Ada Lovelace', type: 'Design', status: 'Draft' },
  { id: 8, name: 'Relay', owner: 'Grace Hopper', type: 'Engineering', status: 'Draft' },
];
const blankDraft: ProjectDraft = { name: '', owner: 'Ada Lovelace', type: 'Design', status: 'Draft' };
const pageSize = 4;

export type ProjectWorkspaceExampleProps = { initialView?: 'populated' | 'empty' | 'no-results' };

function ProjectWorkspaceContent({ initialView = 'populated' }: ProjectWorkspaceExampleProps) {
  const [projects, setProjects] = useState<Project[]>(initialView === 'empty' ? [] : initialProjects);
  const [query, setQuery] = useState(initialView === 'no-results' ? 'unlisted project' : '');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<DialogMode>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [draft, setDraft] = useState<ProjectDraft>(blankDraft);
  const [nameError, setNameError] = useState('');
  const { notify } = Soup.useToast();

  const visible = projects.filter(project =>
    project.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) &&
    (status === 'all' || project.status === status),
  );
  const currentPage = Math.min(page, Math.max(1, Math.ceil(visible.length / pageSize)));

  const close = () => { setMode(null); setSelected(null); setNameError(''); };
  const startCreate = () => { setDraft(blankDraft); setSelected(null); setNameError(''); setMode('create'); };
  const startEdit = (project: Project) => {
    setDraft({ name: project.name, owner: project.owner, type: project.type, status: project.status });
    setSelected(project);
    setNameError('');
    setMode('edit');
  };
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = draft.name.trim();
    if (!name) {
      setNameError('Enter a project name.');
      return;
    }
    if (projects.some(project => project.id !== selected?.id && project.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
      setNameError('A project with this name already exists.');
      return;
    }
    if (mode === 'edit' && selected) {
      setProjects(current => current.map(project => project.id === selected.id ? { ...draft, name, id: project.id } : project));
      notify({ title: 'Project updated', description: name, tone: 'success' });
    } else if (mode === 'create') {
      setProjects(current => [...current, { ...draft, name, id: Math.max(0, ...current.map(project => project.id)) + 1 }]);
      setQuery(''); setStatus('all'); setPage(1);
      notify({ title: 'Project created', description: name, tone: 'success' });
    }
    close();
  };
  const remove = () => {
    if (!selected) return;
    setProjects(current => current.filter(project => project.id !== selected.id));
    notify({ title: 'Project deleted', description: selected.name });
    close();
  };

  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <Soup.Inline justify="between" align="end"><header><h1>Project workspace</h1><p className="soup-example-lead">Find, review, and manage the work across your team.</p></header><Soup.Button onClick={startCreate}>New project</Soup.Button></Soup.Inline>
    <Soup.Card><Soup.Stack>
      {projects.length === 0 ? <Soup.Alert title="No projects yet">Create a project to start organizing your team’s work.</Soup.Alert> : <>
      <Soup.Inline justify="between">
        <div className="soup-example-toolbar-search"><Soup.Field label="Search projects" htmlFor="workspace-query"><Soup.Input id="workspace-query" type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></Soup.Field></div>
        <Soup.Field label="Status" htmlFor="workspace-status"><Soup.Select id="workspace-status" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="all">All statuses</option><option value="Active">Active</option><option value="Draft">Draft</option></Soup.Select></Soup.Field>
      </Soup.Inline>
      <Soup.Inline justify="between"><strong role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</strong>{(query || status !== 'all') && <Soup.Button variant="ghost" onClick={() => { setQuery(''); setStatus('all'); setPage(1); }}>Clear filters</Soup.Button>}</Soup.Inline>
      {visible.length === 0 ? <Soup.Alert title="No matching projects">Try a different search or clear the filters.</Soup.Alert> : <Soup.Table
        columns={[
          { id: 'name', header: 'Project', cell: (project: Project) => <strong>{project.name}</strong>, sortValue: project => project.name },
          { id: 'owner', header: 'Owner', cell: (project: Project) => project.owner, sortValue: project => project.owner },
          { id: 'type', header: 'Type', cell: (project: Project) => project.type, sortValue: project => project.type },
          { id: 'status', header: 'Status', cell: (project: Project) => <Soup.Badge tone={project.status === 'Active' ? 'success' : 'neutral'}>{project.status}</Soup.Badge>, sortValue: project => project.status },
          { id: 'actions', header: 'Actions', cell: (project: Project) => <Soup.DropdownMenu label={`Actions for ${project.name}`} align="end" trigger={<Soup.Icon name="more" />} items={[
            { label: 'Edit project', icon: 'edit', onSelect: () => startEdit(project) },
            { label: 'Delete project', icon: 'trash', danger: true, onSelect: () => { setSelected(project); setMode('delete'); } },
          ]} /> },
        ]}
        rows={visible} rowKey={project => project.id} pagination={{ page: currentPage, pageSize, onPageChange: setPage }} aria-label="Projects" />}
      </>}
    </Soup.Stack></Soup.Card>
    <Soup.Dialog open={mode === 'create' || mode === 'edit'} onOpenChange={open => { if (!open) close(); }} title={mode === 'edit' ? 'Edit project' : 'New project'} description="Keep the project details clear for everyone on the team." footer={<><Soup.Button variant="secondary" onClick={close}>Cancel</Soup.Button><Soup.Button type="submit" form="project-workspace-form">{mode === 'edit' ? 'Save changes' : 'Create project'}</Soup.Button></>}>
      <form id="project-workspace-form" onSubmit={save}><Soup.Stack>
        <Soup.Field label="Project name" htmlFor="workspace-name" error={nameError}><Soup.Input id="workspace-name" value={draft.name} onChange={event => { setDraft(current => ({ ...current, name: event.target.value })); setNameError(''); }} aria-invalid={!!nameError} aria-describedby={nameError ? 'workspace-name-error' : undefined} required /></Soup.Field>
        <Soup.Field label="Owner" htmlFor="workspace-owner"><Soup.Select id="workspace-owner" value={draft.owner} onChange={event => setDraft(current => ({ ...current, owner: event.target.value }))}><option>Ada Lovelace</option><option>Grace Hopper</option><option>Lin Chen</option></Soup.Select></Soup.Field>
        <Soup.Field label="Type" htmlFor="workspace-type"><Soup.Select id="workspace-type" value={draft.type} onChange={event => setDraft(current => ({ ...current, type: event.target.value as Project['type'] }))}><option>Design</option><option>Engineering</option><option>Research</option></Soup.Select></Soup.Field>
        <Soup.Field label="Status" htmlFor="workspace-draft-status"><Soup.Select id="workspace-draft-status" value={draft.status} onChange={event => setDraft(current => ({ ...current, status: event.target.value as Project['status'] }))}><option>Draft</option><option>Active</option></Soup.Select></Soup.Field>
      </Soup.Stack></form>
    </Soup.Dialog>
    <Soup.Dialog open={mode === 'delete'} onOpenChange={open => { if (!open) close(); }} title="Delete project?" description="This action cannot be undone." footer={<><Soup.Button variant="secondary" onClick={close}>Cancel</Soup.Button><Soup.Button variant="danger" onClick={remove}>Delete project</Soup.Button></>}><p>Delete <strong>{selected?.name}</strong> from the workspace?</p></Soup.Dialog>
  </Soup.Stack></main></Soup.Container>;
}

export function ProjectWorkspaceExample(props: ProjectWorkspaceExampleProps) {
  return <Soup.ToastProvider><ProjectWorkspaceContent {...props} /></Soup.ToastProvider>;
}
