import { useState, type FormEvent } from 'react';
import * as Soup from '../../index';

type Role = 'Owner' | 'Editor' | 'Viewer';
type Member = { id: number; name: string; email: string; role: Role };
type Invitation = { id: number; email: string; role: Exclude<Role, 'Owner'> };

const initialMembers: Member[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Owner' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor' },
  { id: 3, name: 'Lin Chen', email: 'lin@example.com', role: 'Viewer' },
];
const initialInvitations: Invitation[] = [
  { id: 1, email: 'sam@example.com', role: 'Editor' },
  { id: 2, email: 'maya@example.com', role: 'Viewer' },
];

export type TeamManagementExampleProps = {
  initialTab?: 'members' | 'invitations';
  noInvitations?: boolean;
};

function TeamManagementContent({ initialTab = 'members', noInvitations = false }: TeamManagementExampleProps) {
  const [members, setMembers] = useState(initialMembers);
  const [invitations, setInvitations] = useState(noInvitations ? [] : initialInvitations);
  const [tab, setTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Invitation['role']>('Viewer');
  const [emailError, setEmailError] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<Invitation | null>(null);
  const { notify } = Soup.useToast();

  const openInvite = () => { setEmail(''); setRole('Viewer'); setEmailError(''); setInviteOpen(true); };
  const closeInvite = () => { setInviteOpen(false); setEmailError(''); };
  const invite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = email.trim().toLocaleLowerCase();
    if ([...members, ...invitations].some(person => person.email.toLocaleLowerCase() === normalized)) {
      setEmailError('This person is already a member or has a pending invitation.');
      return;
    }
    setInvitations(current => [...current, { id: Math.max(0, ...current.map(item => item.id)) + 1, email: normalized, role }]);
    setTab('invitations');
    closeInvite();
    notify({ title: 'Invitation sent', description: normalized, tone: 'success' });
  };
  const changeRole = (member: Member, nextRole: Invitation['role']) => {
    setMembers(current => current.map(item => item.id === member.id ? { ...item, role: nextRole } : item));
    notify({ title: 'Role updated', description: `${member.name} is now ${nextRole === 'Editor' ? 'an editor' : 'a viewer'}.`, tone: 'success' });
  };
  const revoke = () => {
    if (!revokeTarget) return;
    setInvitations(current => current.filter(item => item.id !== revokeTarget.id));
    notify({ title: 'Invitation revoked', description: revokeTarget.email });
    setRevokeTarget(null);
  };

  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <Soup.Inline justify="between" align="end"><header><h1>Team access</h1><p className="soup-example-lead">Manage who can work in this workspace and review pending invitations.</p></header><Soup.Button onClick={openInvite}>Invite member</Soup.Button></Soup.Inline>
    <Soup.Alert tone="info" title="Access is tied to a role">Editors can change workspace content. Viewers can read it. Only the owner can manage team access.</Soup.Alert>
    <Soup.Tabs label="Team access sections" value={tab} onValueChange={value => setTab(value as typeof tab)} tabs={[
      { id: 'members', label: `Members (${members.length})`, content: <Soup.Card><Soup.Stack>
        <h2>Members</h2>
        <Soup.Table columns={[
          { id: 'name', header: 'Member', cell: (member: Member) => <Soup.Inline gap="sm"><Soup.Avatar name={member.name} /><strong>{member.name}</strong></Soup.Inline>, sortValue: member => member.name },
          { id: 'email', header: 'Email', cell: (member: Member) => member.email, sortValue: member => member.email },
          { id: 'role', header: 'Role', cell: (member: Member) => <Soup.Badge tone={member.role === 'Owner' ? 'info' : 'neutral'}>{member.role}</Soup.Badge>, sortValue: member => member.role },
          { id: 'actions', header: 'Actions', cell: (member: Member) => member.role === 'Owner' ? <span className="soup-example-caption">Workspace owner</span> : <Soup.DropdownMenu label={`Change role for ${member.name}`} align="end" trigger={<Soup.Icon name="more" />} items={[
            { label: 'Make editor', onSelect: () => changeRole(member, 'Editor'), disabled: member.role === 'Editor' },
            { label: 'Make viewer', onSelect: () => changeRole(member, 'Viewer'), disabled: member.role === 'Viewer' },
          ]} /> },
        ]} rows={members} rowKey={member => member.id} aria-label="Workspace members" />
      </Soup.Stack></Soup.Card> },
      { id: 'invitations', label: `Invitations (${invitations.length})`, content: <Soup.Card><Soup.Stack>
        <h2>Pending invitations</h2>
        {invitations.length === 0 ? <Soup.Alert title="No pending invitations">There are no invitations waiting for a response. Invite someone new when you are ready.</Soup.Alert> : <Soup.Table columns={[
          { id: 'email', header: 'Email', cell: (item: Invitation) => <strong>{item.email}</strong>, sortValue: item => item.email },
          { id: 'role', header: 'Role', cell: (item: Invitation) => item.role, sortValue: item => item.role },
          { id: 'status', header: 'Status', cell: () => <Soup.Badge tone="warning">Pending</Soup.Badge> },
          { id: 'actions', header: 'Actions', cell: (item: Invitation) => <Soup.Button variant="ghost" size="sm" aria-label={`Revoke invitation for ${item.email}`} onClick={() => setRevokeTarget(item)}>Revoke</Soup.Button> },
        ]} rows={invitations} rowKey={item => item.id} aria-label="Pending invitations" />}
      </Soup.Stack></Soup.Card> },
    ]} />
    <Soup.Dialog open={inviteOpen} onOpenChange={open => { if (!open) closeInvite(); }} title="Invite a member" description="The person will receive access after accepting the invitation." footer={<><Soup.Button variant="secondary" onClick={closeInvite}>Cancel</Soup.Button><Soup.Button type="submit" form="team-invitation-form">Send invitation</Soup.Button></>}>
      <form id="team-invitation-form" onSubmit={invite}><Soup.Stack>
        <Soup.Field label="Email address" htmlFor="team-invite-email" error={emailError}><Soup.Input id="team-invite-email" type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); setEmailError(''); }} aria-invalid={!!emailError} aria-describedby={emailError ? 'team-invite-email-error' : undefined} required /></Soup.Field>
        <Soup.Field label="Role" htmlFor="team-invite-role" description="You can change this role after they join."><Soup.Select id="team-invite-role" value={role} onChange={event => setRole(event.target.value as Invitation['role'])} aria-describedby="team-invite-role-description"><option value="Viewer">Viewer</option><option value="Editor">Editor</option></Soup.Select></Soup.Field>
      </Soup.Stack></form>
    </Soup.Dialog>
    <Soup.Dialog open={!!revokeTarget} onOpenChange={open => { if (!open) setRevokeTarget(null); }} title="Revoke invitation?" description="The invitation link will stop working." footer={<><Soup.Button variant="secondary" onClick={() => setRevokeTarget(null)}>Cancel</Soup.Button><Soup.Button variant="danger" onClick={revoke}>Revoke invitation</Soup.Button></>}><p>Revoke the invitation for <strong>{revokeTarget?.email}</strong>?</p></Soup.Dialog>
  </Soup.Stack></main></Soup.Container>;
}

export function TeamManagementExample(props: TeamManagementExampleProps) {
  return <Soup.ToastProvider><TeamManagementContent {...props} /></Soup.ToastProvider>;
}
