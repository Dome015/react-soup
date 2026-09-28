import { useState } from 'react';
import * as Soup from '../../index';

const sections = ['Overview', 'Projects', 'Files', 'Team', 'Settings'];

export function SidebarNavigationExample() {
  const [active, setActive] = useState('Overview');
  return <div className="soup-example-shell"><aside className="soup-example-sidebar"><Soup.Stack gap="lg"><strong className="soup-example-brand">NORTHSTAR<span>.</span></strong><nav aria-label="Primary navigation" className="soup-example-nav">{sections.map(section => <button key={section} type="button" aria-current={active === section ? 'page' : undefined} onClick={() => setActive(section)}>{section}</button>)}</nav><Soup.Separator /><Soup.Inline><Soup.Avatar name="Ada Lovelace" /><div><strong>Ada Lovelace</strong><small>Workspace owner</small></div></Soup.Inline></Soup.Stack></aside><main className="soup-example-main"><Soup.Stack gap="lg"><header><h1>{active}</h1></header><Soup.Card><h2>{active} workspace</h2><p>Select another section from the sidebar to switch views.</p></Soup.Card></Soup.Stack></main></div>;
}
