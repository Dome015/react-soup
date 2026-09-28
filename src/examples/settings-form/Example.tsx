import { useState, type FormEvent } from 'react';
import * as Soup from '../../index';

function SettingsFormContent() {
  const [name, setName] = useState('Northstar Studio');
  const [timezone, setTimezone] = useState('Europe/Rome');
  const [notifications, setNotifications] = useState(true);
  const { notify } = Soup.useToast();
  const save = (event: FormEvent) => { event.preventDefault(); notify({ title: 'Settings saved', tone: 'success' }); };
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><h1>Settings</h1><p className="soup-example-lead">Keep your workspace details and notifications up to date.</p></header>
    <Soup.Tabs label="Settings sections" tabs={[
      { id: 'general', label: 'General', content: <Soup.Card><form onSubmit={save}><Soup.Stack gap="lg">
        <Soup.Field label="Workspace name" htmlFor="settings-name" description="This name appears across your workspace"><Soup.Input id="settings-name" value={name} onChange={event => setName(event.target.value)} aria-describedby="settings-name-description" required /></Soup.Field>
        <Soup.Field label="Timezone" htmlFor="settings-timezone"><Soup.Dropdown id="settings-timezone" label="Timezone" searchable options={[{ value: 'Europe/Rome', label: 'Europe / Rome' }, { value: 'America/New_York', label: 'America / New York' }, { value: 'Asia/Tokyo', label: 'Asia / Tokyo' }]} value={timezone} onValueChange={value => setTimezone(value as string)} /></Soup.Field>
        <Soup.Separator /><Soup.Switch label="Email notifications" checked={notifications} onChange={event => setNotifications(event.target.checked)} />
        <Soup.Inline justify="end"><Soup.Button type="submit">Save changes</Soup.Button></Soup.Inline>
      </Soup.Stack></form></Soup.Card> },
      { id: 'team', label: 'Team', content: <Soup.Alert tone="info" title="Team settings">Invite members from your workspace dashboard.</Soup.Alert> },
    ]} />
  </Soup.Stack></main></Soup.Container>;
}

export function SettingsFormExample() { return <Soup.ToastProvider><SettingsFormContent /></Soup.ToastProvider>; }
