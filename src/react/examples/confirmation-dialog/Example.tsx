import { useState } from 'react';
import * as Soup from '../../index';

export function ConfirmationDialogExample() {
  const [open, setOpen] = useState(false);
  const [published, setPublished] = useState(false);
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><h1>Release review</h1><p className="soup-example-lead">Confirm the details before your update goes live.</p></header>
    <Soup.Card><Soup.Stack><Soup.Inline justify="between"><div><h2>September release</h2><p>All changes are ready for review.</p></div><Soup.Badge tone={published ? 'success' : 'warning'}>{published ? 'Published' : 'Draft'}</Soup.Badge></Soup.Inline><Soup.Separator /><Soup.Inline justify="end"><Soup.Button disabled={published} onClick={() => setOpen(true)}>Publish release</Soup.Button></Soup.Inline></Soup.Stack></Soup.Card>
    <Soup.Dialog open={open} onOpenChange={setOpen} title="Publish this release?" description="Your team will see the update immediately." footer={<><Soup.Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Soup.Button><Soup.Button onClick={() => { setPublished(true); setOpen(false); }}>Publish</Soup.Button></>}><p>Review the release notes before confirming.</p></Soup.Dialog>
  </Soup.Stack></main></Soup.Container>;
}
