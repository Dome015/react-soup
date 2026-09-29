import { useState } from 'react';
import * as Soup from '../../index';

export function DestructiveActionFlowExample() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [deleted, setDeleted] = useState(false);
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><h1>Delete workspace</h1><p className="soup-example-lead">This permanently removes projects, files, and invitations.</p></header>
    {deleted ? <Soup.Alert tone="success" title="Workspace deleted">The demo workspace has been removed.</Soup.Alert> : <Soup.Card><Soup.Stack><Soup.Alert tone="warning" title="Permanent action">Export anything you need before continuing.</Soup.Alert><Soup.Inline justify="between"><strong>Northstar Studio</strong><Soup.Button variant="danger" onClick={() => setOpen(true)}>Delete workspace</Soup.Button></Soup.Inline></Soup.Stack></Soup.Card>}
    <Soup.Dialog open={open} onOpenChange={value => { setOpen(value); if (!value) setConfirmation(''); }} title="Delete Northstar Studio?" description="This cannot be undone." footer={<><Soup.Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Soup.Button><Soup.Button variant="danger" disabled={confirmation !== 'Northstar Studio'} onClick={() => { setDeleted(true); setOpen(false); }}>Delete permanently</Soup.Button></>}><Soup.Stack><p>Type <strong>Northstar Studio</strong> to confirm.</p><Soup.Field label="Workspace name" htmlFor="delete-confirmation"><Soup.Input id="delete-confirmation" value={confirmation} onChange={event => setConfirmation(event.target.value)} autoComplete="off" /></Soup.Field></Soup.Stack></Soup.Dialog>
  </Soup.Stack></main></Soup.Container>;
}
