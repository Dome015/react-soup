import * as Soup from '../../index';

export function ProfileScreenExample() {
  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <header><Soup.Inline gap="lg"><Soup.Avatar name="Ada Lovelace" /><div><h1>Ada Lovelace</h1><p className="soup-example-lead">Product designer · Northstar Studio</p></div></Soup.Inline></header>
    <Soup.Grid><Soup.Card><Soup.Stack><Soup.Inline justify="between"><h2>About</h2><Soup.Button variant="secondary" size="sm">Edit profile</Soup.Button></Soup.Inline><Soup.Separator /><p>Designing clear tools for complex work.</p><Soup.Inline><Soup.Badge tone="success">Active</Soup.Badge><Soup.Badge>Workspace owner</Soup.Badge></Soup.Inline></Soup.Stack></Soup.Card><Soup.Card><Soup.Stack><h2>Contact</h2><Soup.Separator /><div><span className="soup-example-caption">Email</span><p><Soup.Link href="mailto:ada@example.com">ada@example.com</Soup.Link></p></div><div><span className="soup-example-caption">Location</span><p>London, UK</p></div></Soup.Stack></Soup.Card></Soup.Grid>
    <Soup.Card><Soup.Stack><h2>Recent activity</h2><Soup.Separator /><Soup.Inline justify="between"><span>Updated project Atlas</span><span className="soup-example-caption">Today</span></Soup.Inline><Soup.Inline justify="between"><span>Invited a teammate</span><span className="soup-example-caption">Yesterday</span></Soup.Inline></Soup.Stack></Soup.Card>
  </Soup.Stack></main></Soup.Container>;
}
